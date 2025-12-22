import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import axiosClient from '../../../api/axiosClient';
import { AuthContext } from '../../../context/AuthContext';
import {
  FaPaperPlane, FaSearch, FaRegComments, FaBriefcase, FaUserGraduate, FaHashtag, FaUserCircle
} from 'react-icons/fa';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const ENDPOINT = "http://localhost:5000";

const AdminChatPanel = () => {
  const { user } = useContext(AuthContext); // Lấy user
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  // --- 1. SOCKET ---
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  // --- 2. FETCH DATA ---
  const fetchConversations = async () => {
    try {
      const res = await axiosClient.get('/chat/conversations');
      setConversations(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchConversations(); }, []);

  // --- SCROLL HELPER ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // --- 3. LISTEN MESSAGE ---
  useEffect(() => {
    if (!socket || !user) return; // FIX: Thêm check !user

    const handleIncoming = (data) => {
      fetchConversations();
      if (data.sender === user._id) return;
      if (selectedChat && data.conversationId === selectedChat._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("admin_receive_message", handleIncoming);
    return () => socket.off("admin_receive_message", handleIncoming);
  }, [socket, selectedChat, user]); // FIX: dependency user thay vì user._id

  // --- 4. SELECT CHAT ---
  const handleSelectChat = async (conv) => {
    setSelectedChat(conv);
    try {
      const res = await axiosClient.get(`/chat/messages/${conv._id}`);
      setMessages(res.data);
      setTimeout(scrollToBottom, 100);
    } catch (error) { console.error(error); }
  };

  // --- 5. SEND MESSAGE ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !user) return; // FIX: Check user

    const receiver = selectedChat.members.find(m => m._id !== user._id);
    if (!receiver) return alert("Lỗi user đích");

    const msgPayload = {
      senderId: user._id,
      receiverId: receiver._id,
      text: newMessage,
      conversationId: selectedChat._id,
      sender: user._id,
      createdAt: new Date().toISOString()
    };

    socket.emit("send_message", msgPayload);
    setMessages((prev) => [...prev, msgPayload]);
    setNewMessage("");
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  // ==========================================
  // FIX START: Cập nhật hàm getPartnerInfo an toàn hơn
  // ==========================================
  const getPartnerInfo = (conv) => {
    // Nếu chưa load xong user hoặc conv lỗi -> trả về placeholder để không crash
    if (!user || !conv || !conv.members) {
      return { _id: "loading", fullName: "Đang tải...", avatar: null, role: 'unknown' };
    }

    // Tìm người không phải mình (dùng optional chaining ?.)
    const partner = conv.members.find(m => m._id !== user?._id);

    // Nếu data lỗi không tìm thấy partner, trả về Unknown
    return partner || { _id: "unknown", fullName: "Unknown User", avatar: null, role: 'unknown' };
  };
  // ==========================================
  // FIX END
  // ==========================================

  const filteredConversations = useMemo(() => {
    return conversations.filter(c =>
      getPartnerInfo(c).fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPartnerInfo(c)._id.includes(searchTerm)
    );
  }, [conversations, searchTerm, user]); // FIX: Thêm user vào dependency

  // --- VARIANTS ---
  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const itemVariants = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };
  const messageVariants = {
    hidden: (isMe) => ({ opacity: 0, x: isMe ? 20 : -20, scale: 0.8 }),
    show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // ==========================================
  // Loading State 
  // ==========================================
  if (!user) {
    return (
      <div className="flex h-[80vh] bg-white rounded-2xl shadow-xl border border-slate-200 items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-medium">Đang tải dữ liệu chat...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex h-[80vh] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden font-sans">

      {/* --- SIDEBAR --- */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 backdrop-blur-sm">
        {/* ... (Giữ nguyên phần Header Sidebar) ... */}
        <div className="p-4 border-b border-slate-200 bg-white z-10">
          <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <FaRegComments className="text-blue-600" /> Hỗ trợ
          </h2>
          <div className="relative group">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Tìm tên hoặc ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent focus:bg-white focus:border-blue-300 rounded-xl text-sm outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <motion.div
          className="flex-1 overflow-y-auto custom-scrollbar p-2"
          variants={listVariants}
          key={filteredConversations.length}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredConversations.map((conv) => {
              const partner = getPartnerInfo(conv);
              const isSelected = selectedChat?._id === conv._id;

              return (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={conv._id}
                  onClick={() => handleSelectChat(conv)}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 mb-2 rounded-xl cursor-pointer transition-colors flex gap-3 border relative overflow-hidden
                    ${isSelected
                      ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-100'
                      : 'bg-transparent border-transparent hover:border-slate-200'}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300 shadow-sm">
                      {partner.avatar ? (
                        <img src={partner.avatar} className="w-full h-full object-cover" alt="avt" />
                      ) : (
                        <span className="font-bold text-slate-500 text-lg">{partner.fullName?.charAt(0)}</span>
                      )}
                    </div>
                    {/* Chỉ hiện chấm xanh nếu không phải đang loading */}
                    {partner._id !== 'loading' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 overflow-hidden min-w-0 flex flex-col justify-center z-10">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`font-bold text-sm truncate ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                        {partner.fullName}
                      </span>
                      {partner._id !== 'loading' && (
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1 rounded ml-1 border border-slate-200">
                          #{partner._id?.slice(-4).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {partner.role !== 'unknown' && (
                        partner.role === 'tutor' ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700 uppercase border border-indigo-200 flex-shrink-0">Gia sư</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 uppercase border border-emerald-200 flex-shrink-0">Học viên</span>
                        )
                      )}
                      <span className={`text-xs truncate ${isSelected ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
                        {conv.lastMessage?.sender === user?._id ? 'Bạn: ' : ''}{conv.lastMessage?.text || '...'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- CHAT AREA --- */}
      {/* ... (Phần nội dung bên phải giữ nguyên như code trước, chỉ cần đảm bảo có check user khi render) ... */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">
        {selectedChat ? (
          // ... Nội dung chat chi tiết
          <>
            {/* Header Chat */}
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm flex-shrink-0 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shadow-inner">
                  {getPartnerInfo(selectedChat).avatar ? (
                    <img src={getPartnerInfo(selectedChat).avatar} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FaUserCircle size={22} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-lg">{getPartnerInfo(selectedChat).fullName}</h3>
                    <span className="text-xs text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Copy ID">
                      <FaHashtag size={8} />
                      {getPartnerInfo(selectedChat)._id?.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></span>
                    {getPartnerInfo(selectedChat).role === 'tutor' ? 'Tài khoản Gia sư' : 'Tài khoản Học viên'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Messages List */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar scroll-smooth space-y-4">
              {messages.map((msg, idx) => {
                const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
                // FIX: Check user tồn tại
                const isMe = user && (senderId === user._id || msg.senderId === user._id);

                return (
                  <motion.div
                    key={idx}
                    custom={isMe}
                    variants={messageVariants}
                    initial="hidden"
                    animate="show"
                    layout
                    className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-5 py-3 text-sm shadow-sm relative group
                          ${isMe
                            ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm'
                            : 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-sm'
                          }`}
                      >
                        {msg.text}
                        <span className={`absolute bottom-0 ${isMe ? 'right-full mr-2' : 'left-full ml-2'} mb-3 
                           text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                          {msg.createdAt ? format(new Date(msg.createdAt), 'HH:mm') : ''}
                        </span>
                      </div>

                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="text-[10px] text-slate-300 mt-1 px-1"
                      >
                        {msg.createdAt ? format(new Date(msg.createdAt), 'HH:mm') : '...'}
                      </motion.span>
                    </div>
                  </motion.div>
                )
              })}
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex-shrink-0 z-20">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="flex gap-2 items-end bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all shadow-sm"
              >
                <input
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700 text-sm placeholder-slate-400"
                  placeholder="Nhập nội dung hỗ trợ..."
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-xl transition-all flex-shrink-0 mb-0.5
                    ${newMessage.trim()
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <FaPaperPlane size={14} />
                </motion.button>
              </motion.div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-slate-400 select-none bg-slate-50/50"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-blue-200 shadow-xl"
            >
              <FaRegComments size={48} />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-600">Admin Support Center</h3>
            <p className="text-sm mt-2 text-slate-400">Chọn một hội thoại để bắt đầu hỗ trợ.</p>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default AdminChatPanel;
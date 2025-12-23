import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { FaComments, FaPaperPlane, FaTimes, FaHeadset, FaCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ENDPOINT = "http://localhost:5000";

const ChatWidget = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

  // 1. Load lịch sử chat
  useEffect(() => {
    if (user && isOpen) {
      axiosClient.get('/chat/my-history')
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }
  }, [user, isOpen]);

  // 2. Kết nối Socket
  useEffect(() => {
    if (!user) return;
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    newSocket.emit("join_room", user._id);
    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => newSocket.close();
  }, [user]);

  // 3. Gửi tin nhắn
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const msgPayload = {
      senderId: user._id,
      text: newMessage,
      createdAt: new Date(),
      sender: user._id
    };

    socket.emit("send_message", msgPayload);
    setMessages((prev) => [...prev, msgPayload]);
    setNewMessage("");
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end">

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#193366]/10 mb-4 origin-bottom-right"
          >
            {/* --- HEADER: Navy Solid --- */}
            <div className="bg-[#193366] p-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                {/* Avatar Support */}
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
                    <FaHeadset size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4ADE80] border-2 border-[#193366]"></span>
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Hỗ trợ khách hàng</h3>
                  <p className="text-blue-200/80 text-xs flex items-center gap-1 font-medium">
                    Thường trả lời ngay
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* --- BODY (MESSAGE LIST): Cream Background --- */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#f9f9f6] space-y-3 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                  <div className="w-16 h-16 bg-[#193366]/10 rounded-full flex items-center justify-center mb-2 text-[#193366]/40">
                    <FaComments className="text-3xl" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Xin chào {user.hoTen},<br />Chúng tôi có thể giúp gì cho bạn?</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
                  const isMe = senderId === user._id || msg.senderId === user._id;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] px-4 py-2.5 text-sm shadow-sm break-words relative group font-medium ${isMe
                        ? 'bg-[#193366] text-white rounded-2xl rounded-tr-sm' // User: Navy Bubble
                        : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-tl-sm' // Admin: White Bubble
                        }`}>
                        {msg.text}
                        <span className={`text-[10px] absolute -bottom-5 ${isMe ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 whitespace-nowrap font-medium`}>
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Vừa xong'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* --- FOOTER (INPUT) --- */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                className="flex-1 px-4 py-2.5 bg-[#f9f9f6] rounded-full border border-transparent text-sm outline-none focus:bg-white focus:border-[#193366] focus:ring-2 focus:ring-[#193366]/10 transition-all placeholder:text-gray-400 text-[#193366] font-medium"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${newMessage.trim()
                  ? 'bg-[#193366] text-white shadow-lg hover:bg-[#193366]/90 hover:scale-110 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <FaPaperPlane size={14} className={newMessage.trim() ? "ml-0.5" : ""} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LAUNCHER BUTTON: Navy Solid --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(25,51,102,0.3)] flex items-center justify-center text-2xl transition-all duration-300 border-2 border-white ${isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-[#193366] text-white'
          }`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments />}
      </motion.button>

    </div>
  );
};

export default ChatWidget;
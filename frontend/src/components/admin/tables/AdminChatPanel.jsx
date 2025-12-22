import { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import axiosClient from '../../../api/axiosClient';
import { AuthContext } from '../../../context/AuthContext';
import { FaPaperPlane, FaUserCircle, FaSearch } from 'react-icons/fa';

const ENDPOINT = "http://localhost:5000";

const AdminChatPanel = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // 1. Kết nối Socket
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    // Admin không cần join room user._id để nhận tin, vì server emit 'admin_receive_message'
    return () => newSocket.close();
  }, []);

  // 2. Tải hội thoại
  const fetchConversations = async () => {
    try {
      const res = await axiosClient.get('/chat/conversations');
      setConversations(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchConversations(); }, []);

  // 3. Lắng nghe tin nhắn từ User
  useEffect(() => {
    if (!socket) return;

    const handleIncoming = (data) => {
      console.log("Admin received:", data);

      // Update list bên trái
      fetchConversations();

      // LOGIC CHỐNG TRÙNG LẶP:
      // Nếu tin nhắn này do chính Admin gửi (data.sender === user._id) -> Bỏ qua
      // Vì hàm handleSendMessage đã thêm vào UI rồi.
      if (data.sender === user._id) return;

      // Nếu đang mở đúng cửa sổ chat -> Thêm vào list messages
      if (selectedChat && data.conversationId === selectedChat._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("admin_receive_message", handleIncoming);
    return () => socket.off("admin_receive_message", handleIncoming);
  }, [socket, selectedChat, user._id]);

  // 4. Chọn Chat
  const handleSelectChat = async (conv) => {
    setSelectedChat(conv);
    try {
      const res = await axiosClient.get(`/chat/messages/${conv._id}`);
      setMessages(res.data);
      setTimeout(() => messagesEndRef.current?.scrollIntoView(), 100);
    } catch (error) { console.error(error); }
  };

  // 5. Gửi tin nhắn
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Tìm User nhận tin
    const receiver = selectedChat.members.find(m => m._id !== user._id);
    if (!receiver) return alert("Lỗi user đích");

    const msgPayload = {
      senderId: user._id,
      receiverId: receiver._id, // QUAN TRỌNG: Để server biết gửi về room nào
      text: newMessage,
      conversationId: selectedChat._id,
      sender: user._id // Để khớp logic hiển thị
    };

    // Emit
    socket.emit("send_message", msgPayload);

    // Optimistic Update
    setMessages((prev) => [...prev, msgPayload]);
    setNewMessage("");

    // Scroll xuống
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // Scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getPartnerInfo = (conv) => {
    if (!conv || !conv.members) return { hoTen: "...", avatar: null };
    return conv.members.find(m => m._id !== user._id) || { hoTen: "Unknown", avatar: null };
  };

  return (
    <div className="flex h-[80vh] bg-white rounded-xl shadow border border-gray-200">
      {/* SIDEBAR */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">Tin nhắn</div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => {
            const partner = getPartnerInfo(conv);
            return (
              <div key={conv._id} onClick={() => handleSelectChat(conv)}
                className={`p-3 flex gap-3 cursor-pointer hover:bg-blue-50 border-b ${selectedChat?._id === conv._id ? 'bg-blue-100' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {partner.avatar ? <img src={partner.avatar} className="w-full h-full rounded-full" /> : <FaUserCircle className="text-white text-2xl" />}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-sm truncate">{partner.hoTen}</div>
                  <div className="text-xs text-gray-500 truncate">{conv.lastMessage?.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="w-2/3 flex flex-col bg-gray-50">
        {selectedChat ? (
          <>
            <div className="p-3 bg-white border-b font-bold shadow-sm">{getPartnerInfo(selectedChat).hoTen}</div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => {
                // Check isMe
                const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
                const isMe = senderId === user._id || msg.senderId === user._id;

                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${isMe ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'}`}>
                      {msg.text}
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none" placeholder="Nhập tin nhắn..." />
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center"><FaPaperPlane /></button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">Chọn hội thoại để chat</div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPanel;
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

// Helper: Tìm Admin ID
const getAdminId = async () => {
  const admin = await User.findOne({ role: 'admin' }); // Check kỹ DB của bạn là role hay vaiTro
  return admin ? admin._id : null;
};

export const saveMessage = async (senderId, text, conversationId = null) => {
  try {
    let conversation;

    // 1. Tìm hoặc Tạo hội thoại
    if (!conversationId) {
      const adminId = await getAdminId();
      if (!adminId) throw new Error("Không tìm thấy Admin");

      conversation = await Conversation.findOne({
        members: { $all: [senderId, adminId] }
      });

      if (!conversation) {
        conversation = await Conversation.create({
          members: [senderId, adminId],
          lastMessage: { text, sender: senderId }
        });
      }
    } else {
      conversation = await Conversation.findById(conversationId);
    }

    // 2. Tạo tin nhắn
    const newMessage = await Message.create({
      conversationId: conversation._id,
      sender: senderId,
      text: text
    });

    // 3. Update Conversation
    conversation.lastMessage = {
      text: text,
      sender: senderId,
      createdAt: new Date()
    };
    await conversation.save();

    // 4. CHUẨN HÓA DỮ LIỆU TRẢ VỀ (Quan trọng!)
    // Trả về object phẳng để Frontend dễ dùng
    return {
      _id: newMessage._id,
      conversationId: conversation._id,
      sender: senderId, // Trả về ID người gửi
      text: text,
      createdAt: newMessage.createdAt
    };

  } catch (error) {
    console.error("Save Message Error:", error);
    return null;
  }
};

export const getUserChatHistory = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ members: { $in: [req.user._id] } });
    if (!conversation) return res.json([]);
    const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getAdminConversations = async (req, res) => {
  try {
    const convos = await Conversation.find({ members: req.user._id })
      .populate('members', 'fullName avatar email role')
      .sort({ updatedAt: -1 });
    res.json(convos);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.json(messages);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
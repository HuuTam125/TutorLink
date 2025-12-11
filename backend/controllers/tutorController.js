import TutorProfile from '../models/TutorProfile.js';

// @desc    Lấy danh sách tất cả gia sư (có lọc)
// @route   GET /api/tutors
// @access  Public
export const getAllTutors = async (req, res) => {
  try {
    const tutors = await TutorProfile.find({ isApproved: true }).populate('user', 'fullName avatar');
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy hồ sơ của gia sư đang đăng nhập
// @route   GET /api/tutors/me
// @access  Private (Tutor only)
export const getCurrentTutorProfile = async (req, res) => {
  try {

    const profile = await TutorProfile.findOne({ user: req.user._id }).populate('user', 'fullName email phone avatar');

    if (!profile) {
      return res.status(404).json({ message: 'Chưa có hồ sơ gia sư' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Tạo hoặc cập nhật hồ sơ gia sư
// @route   POST /api/tutors
// @access  Private (Tutor only)
export const createOrUpdateTutorProfile = async (req, res) => {
  const { bio, subjects, grades, area, teachingMethod, hourlyRate, experience } = req.body;

  // Chuẩn bị object dữ liệu
  const profileFields = {
    user: req.user._id,
    bio,
    subjects: Array.isArray(subjects) ? subjects : subjects.split(',').map(s => s.trim()),
    grades: Array.isArray(grades) ? grades : grades.split(',').map(g => g.trim()),
    area,
    teachingMethod,
    hourlyRate,
    experience
  };

  try {
    // Tìm xem đã có profile chưa
    let profile = await TutorProfile.findOne({ user: req.user._id });
    if (profile) {
      // Update
      profile = await TutorProfile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new TutorProfile(profileFields);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

export const getTutorById = async (req, res) => {
  try {
    const profile = await TutorProfile.findById(req.params.id).populate('user', 'fullName email phone avatar');

    if (!profile) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ gia sư' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ gia sư' });
    }
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

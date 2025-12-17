import TutorProfile from '../models/TutorProfile.js';

// @desc    Lấy danh sách tất cả gia sư (có lọc)
// @route   GET /api/tutors
// @access  Public
export const getAllTutors = async (req, res) => {
  try {
    const {
      subjects,
      grades,
      area,
      teachingMethod,
      priceMin,
      priceMax,
      sort = 'rating_desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = { isApproved: true };

    // Bộ lọc
    if (subjects) query.subjects = { $in: subjects.split(',') };
    if (grades) query.grades = { $in: grades.split(',') };
    if (area) query.area = new RegExp(area, 'i');
    if (teachingMethod) query.teachingMethod = teachingMethod;
    if (priceMin || priceMax) {
      query.hourlyRate = {};
      if (priceMin) query.hourlyRate.$gte = Number(priceMin);
      if (priceMax) query.hourlyRate.$lte = Number(priceMax);
    }

    // Sắp xếp
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption.hourlyRate = 1;
        break;
      case 'price_desc':
        sortOption.hourlyRate = -1;
        break;
      case 'newest':
        sortOption.createdAt = -1;
        break;
      case 'rating_desc':
      default:
        sortOption.rating = -1;
        break;
    }

    // Phân trang
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Truy vấn song song (hiệu suất cao hơn)
    const [tutors, total] = await Promise.all([
      TutorProfile.find(query)
        .populate('user', 'fullName avatar')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum),
      TutorProfile.countDocuments(query),
    ]);

    // Trả về dữ liệu rõ ràng
    res.json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      tutors,
    });
  } catch (error) {
    console.error('Lỗi getAllTutors:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
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

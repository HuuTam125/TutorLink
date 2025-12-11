export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Là admin thì cho qua
  } else {
    res.status(403).json({ message: 'Không có quyền Admin' });
  }
};
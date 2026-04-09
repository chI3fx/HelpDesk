module.exports = function requireStaff(req, res, next) {
  if (req.user?.role !== 'staff') {
    return res.status(403).json({ error: 'Staff access required' });
  }
  next();
};

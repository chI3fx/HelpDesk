module.exports = function requireMember(req, res, next) {
  if (req.user?.role !== 'member') {
    return res.status(403).json({ error: 'Member access required' });
  }
  next();
};

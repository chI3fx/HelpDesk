const User = require('../models/User');
const { verifyToken } = require('../utils/auth');

const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-only-change-me';

module.exports = async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = header.slice('Bearer '.length).trim();
    const payload = verifyToken(token, AUTH_SECRET);
    if (!payload?.sub) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findById(payload.sub).select('_id name email');
    if (!user) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

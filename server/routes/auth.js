const express = require('express');
const User = require('../models/User');
const requireAuth = require('../middleware/requireAuth');
const { hashPassword, verifyPassword, signToken } = require('../utils/auth');

const router = express.Router();

const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-only-change-me';
const AUTH_TOKEN_TTL_SECONDS = Number(process.env.AUTH_TOKEN_TTL_SECONDS || 60 * 60 * 24 * 7);

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

router.post('/signup', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const existing = await User.findOne({ email }).select('_id');
    if (existing) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const { salt, hash } = hashPassword(password);
    const user = await User.create({
      name,
      email,
      role: 'member',
      passwordSalt: salt,
      passwordHash: hash,
    });

    const token = signToken({ sub: String(user._id), email: user.email }, AUTH_SECRET, AUTH_TOKEN_TTL_SECONDS);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    res.status(500).json({ error: 'Unable to create account' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.role) {
      user.role = 'member';
      await user.save();
    }

    const valid = verifyPassword(password, user.passwordSalt, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken({ sub: String(user._id), email: user.email }, AUTH_SECRET, AUTH_TOKEN_TTL_SECONDS);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Unable to login' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

module.exports = router;

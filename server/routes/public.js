const express = require('express');
const Entry = require('../models/Entry');
const requireAuth = require('../middleware/requireAuth');
const requireMember = require('../middleware/requireMember');

const router = express.Router();

router.post('/lookup', async (req, res) => {
  try {
    const key = String(req.body.key || '').trim().toUpperCase();
    if (!key) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const entry = await Entry.findOne({
      key,
      source: { $in: ['seed', 'staff'] },
    }).select('key value category');
    if (!entry) {
      return res.status(404).json({ error: 'No standard response found for this code' });
    }

    res.json({
      key: entry.key,
      value: entry.value,
      category: entry.category,
    });
  } catch (err) {
    res.status(500).json({ error: 'Lookup failed' });
  }
});

router.post('/complaints', requireAuth, requireMember, async (req, res) => {
  try {
    const issueCode = String(req.body.issueCode || '').trim().toUpperCase();
    const complaintText = String(req.body.complaintText || '').trim();

    if (!complaintText) {
      return res.status(400).json({ error: 'Complaint details are required' });
    }

    let matched = null;
    if (issueCode) {
      matched = await Entry.findOne({
        key: issueCode,
        source: { $in: ['seed', 'staff'] },
      }).select('_id key value category');
    }

    const category = String(req.body.category || matched?.category || 'General').trim();

    const created = await Entry.create({
      key: issueCode || `USER_${Date.now()}`,
      value: complaintText,
      category,
      source: 'member',
      status: 'open',
      submittedBy: req.user._id,
    });

    res.status(201).json({
      id: created._id,
      status: created.status,
      createdAt: created.createdAt,
      matchedResponse: matched
        ? {
            key: matched.key,
            value: matched.value,
            category: matched.category,
          }
        : null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to submit complaint' });
  }
});

module.exports = router;

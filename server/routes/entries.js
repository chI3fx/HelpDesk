const express = require('express');
const Entry = require('../models/Entry');

const router = express.Router();

function isStaff(req) {
  return req.user?.role === 'staff';
}

router.get('/', async (req, res) => {
  try {
    const query = Entry.find().sort({ createdAt: -1 });
    if (isStaff(req)) {
      query.populate('submittedBy', 'name email role');
    }
    const entries = await query;
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const query = Entry.findById(req.params.id);
    if (isStaff(req)) {
      query.populate('submittedBy', 'name email role');
    }
    const entry = await query;
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    let entryData;

    if (isStaff(req)) {
      entryData = {
        ...req.body,
        source: req.body.source || 'staff',
        submittedBy: req.user._id,
      };
    } else {
      const issueCode = String(req.body.issueCode || '').trim().toUpperCase();
      const complaintText = String(req.body.complaintText || '').trim();
      const category = String(req.body.category || 'General').trim();

      if (!complaintText) {
        return res.status(400).json({ error: 'Complaint details are required' });
      }

      entryData = {
        key: issueCode || `USER_${Date.now()}`,
        value: complaintText,
        category,
        source: 'member',
        status: 'open',
        submittedBy: req.user._id,
      };
    }

    const entry = new Entry(entryData);
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!isStaff(req)) {
    return res.status(403).json({ error: 'Staff access required' });
  }
  try {
    const updated = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Entry not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  if (!isStaff(req)) {
    return res.status(403).json({ error: 'Staff access required' });
  }
  try {
    const status = String(req.body.status || '').trim();
    if (!['open', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await Entry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Entry not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  if (!isStaff(req)) {
    return res.status(403).json({ error: 'Staff access required' });
  }
  try {
    const deleted = await Entry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

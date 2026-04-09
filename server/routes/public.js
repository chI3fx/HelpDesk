const express = require('express');
const Entry = require('../models/Entry');

const router = express.Router();

router.post('/lookup', async (req, res) => {
  try {
    const key = String(req.body.key || '').trim().toUpperCase();
    if (!key) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const entry = await Entry.findOne({ key }).select('key value category');
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

module.exports = router;

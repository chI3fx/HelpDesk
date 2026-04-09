const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const requireAuth = require('./middleware/requireAuth');
const authRouter = require('./routes/auth');
const entriesRouter = require('./routes/entries');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/HelpDesk';

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅  MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRouter);
app.use('/api/entries', requireAuth, entriesRouter);

app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});

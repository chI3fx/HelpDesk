const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/HelpDesk';

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅  MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const entriesRouter = require('./routes/entries');
app.use('/api/entries', entriesRouter);

app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});

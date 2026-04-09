const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: ['seed', 'staff', 'member'],
      default: 'staff',
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['open', 'resolved'],
      default: 'open',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Entry', entrySchema);

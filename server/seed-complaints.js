const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Entry = require('./models/Entry');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/HelpDesk';

const SAMPLE_COMPLAINTS = [
  { issueCode: 'PAYMENT_FAIL', complaintText: 'My card was charged twice after retrying payment.' },
  { issueCode: 'CLASS_FULL', complaintText: 'The app says class is full every time I try to book.' },
  { issueCode: 'LOCKER_ISSUE', complaintText: 'My assigned locker does not open with the code.' },
  { issueCode: 'ACCESS_DENIED', complaintText: 'My membership is active but the gate denies entry.' },
  { issueCode: 'MEM_FREEZE', complaintText: 'I submitted a freeze request but it has not reflected.' },
  { issueCode: 'PT_BOOK', complaintText: 'Personal trainer slots are not showing on my account.' },
  { issueCode: 'EQUIP_FAULT', complaintText: 'The treadmill screen is not working in the cardio area.' },
  { issueCode: 'INJURY_RPT', complaintText: 'I slipped near the showers and need to report an incident.' },
  { issueCode: '', complaintText: 'Front desk response was delayed and I need help urgently.' },
  { issueCode: 'PROMO_CODE', complaintText: 'My valid promo code is being rejected during checkout.' },
];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function seedComplaints() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const members = await User.find({ role: 'member' }).select('_id name email');
  if (!members.length) {
    throw new Error('No member users found. Run `npm run seed:users` first.');
  }

  const templates = await Entry.find({ source: { $in: ['seed', 'staff'] } }).select('_id key category');
  const templateByKey = new Map(templates.map((entry) => [entry.key, entry]));

  await Entry.deleteMany({ source: 'member' });
  console.log('Cleared existing member-submitted entries');

  const docs = SAMPLE_COMPLAINTS.map((item, index) => {
    const member = pickRandom(members);
    const template = item.issueCode ? templateByKey.get(item.issueCode) : null;

    return {
      key: item.issueCode || `USER_${Date.now()}_${index + 1}`,
      value: item.complaintText,
      category: template?.category || 'General',
      source: 'member',
      status: index % 4 === 0 ? 'resolved' : 'open',
      submittedBy: member._id,
    };
  });

  await Entry.insertMany(docs);
  console.log(`Seeded ${docs.length} member submissions into entries`);

  await mongoose.disconnect();
  console.log('Done');
}

seedComplaints().catch((err) => {
  console.error(err);
  process.exit(1);
});

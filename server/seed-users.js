const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const { hashPassword } = require('./utils/auth');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/HelpDesk';

const DEFAULT_USERS = [
  {
    name: 'Staff User One',
    email: 'staff1@tojilifts.com',
    password: 'Staff123!',
    role: 'staff',
  },
  {
    name: 'Staff User Two',
    email: 'staff2@tojilifts.com',
    password: 'Staff123!',
    role: 'staff',
  },
  {
    name: 'Ava Kim',
    email: 'avakim@tojilifts.com',
    password: 'Member123!',
    role: 'member',
  },
  {
    name: 'Noah Patel',
    email: 'noahpatel@tojilifts.com',
    password: 'Member123!',
    role: 'member',
  },
  {
    name: 'Liam Otieno',
    email: 'liamotieno@tojilifts.com',
    password: 'Member123!',
    role: 'member',
  },
  {
    name: 'Mia Njeri',
    email: 'mianjeri@tojilifts.com',
    password: 'Member123!',
    role: 'member',
  },
  {
    name: 'Ethan Brown',
    email: 'ethanbrown@tojilifts.com',
    password: 'Member123!',
    role: 'member',
  },
  {
    name: 'Sophia Wanjiru',
    email: 'sophiawanjiru@tojilifts.com',
    password: 'Member123!',
    role: 'member',
  },
];

async function upsertUser({ name, email, password, role }) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const { salt, hash } = hashPassword(password);

  const updated = await User.findOneAndUpdate(
    { email: normalizedEmail },
    {
      name,
      email: normalizedEmail,
      role,
      passwordSalt: salt,
      passwordHash: hash,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  return updated;
}

async function seedUsers() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  for (const user of DEFAULT_USERS) {
    const saved = await upsertUser(user);
    console.log(`Seeded user: ${saved.email} (${saved.role})`);
  }

  console.log('\nDemo credentials:');
  console.log('Staff password: Staff123!');
  console.log('Member password: Member123!');

  await mongoose.disconnect();
  console.log('Done');
}

seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});

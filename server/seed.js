const mongoose = require('mongoose');
const Entry = require('./models/Entry');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/HelpDesk';

const seedData = [
  // Membership
  {
    key: 'MEM_FREEZE',
    value: 'Advise the member to submit a freeze request via the member portal with a minimum of 48 hours notice.',
    category: 'Membership',
  },
  {
    key: 'MEM_CANCEL',
    value: 'Direct the member to the cancellation form on the website and remind them of the 30-day notice period.',
    category: 'Membership',
  },

  // Billing
  {
    key: 'PAYMENT_FAIL',
    value: 'Ask the member to update their payment details in the app and confirm their next billing date.',
    category: 'Billing',
  },
  {
    key: 'REFUND_REQ',
    value: 'Check the purchase date and process a refund via the billing portal if within 14 days.',
    category: 'Billing',
  },
  {
    key: 'PROMO_CODE',
    value: 'Verify the promo code expiry date and apply manually via the admin dashboard if still valid.',
    category: 'Billing',
  },

  // Bookings
  {
    key: 'CLASS_FULL',
    value: 'Advise the member to join the waitlist via the app and inform them they will be notified if a spot opens.',
    category: 'Bookings',
  },
  {
    key: 'CLASS_CANCEL',
    value: 'Confirm the class has been cancelled and offer the member a free rebook or account credit.',
    category: 'Bookings',
  },
  {
    key: 'PT_BOOK',
    value: 'Direct the member to the personal trainer booking page and confirm availability with the PT directly.',
    category: 'Bookings',
  },

  // Facilities
  {
    key: 'LOCKER_ISSUE',
    value: 'Ask the member to see the front desk for a temporary locker code and log the fault with maintenance.',
    category: 'Facilities',
  },
  {
    key: 'ACCESS_DENIED',
    value: "Verify the member's account is active and their fob has been linked correctly in the system.",
    category: 'Facilities',
  },
  {
    key: 'EQUIP_FAULT',
    value: 'Log the equipment fault via the maintenance form and place an out-of-order notice on the equipment.',
    category: 'Facilities',
  },

  // Health & Safety
  {
    key: 'INJURY_RPT',
    value: 'Complete an incident report form immediately and notify the duty manager on shift.',
    category: 'Health & Safety',
  },
  {
    key: 'GUEST_PASS',
    value: 'Confirm the member is eligible for a guest pass and issue one via the front desk system.',
    category: 'Health & Safety',
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Entry.deleteMany({});
  console.log('Cleared existing entries');

  await Entry.insertMany(seedData);
  console.log(`✅  Seeded ${seedData.length} entries`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
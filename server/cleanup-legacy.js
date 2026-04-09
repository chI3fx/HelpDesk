const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/HelpDesk';

async function cleanupLegacyCollections() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const hasComplaints = await mongoose.connection.db
    .listCollections({ name: 'complaints' }, { nameOnly: true })
    .hasNext();

  if (hasComplaints) {
    await mongoose.connection.db.dropCollection('complaints');
    console.log('Dropped legacy collection: complaints');
  } else {
    console.log('Legacy collection not found: complaints');
  }

  await mongoose.disconnect();
  console.log('Done');
}

cleanupLegacyCollections().catch((err) => {
  console.error(err);
  process.exit(1);
});

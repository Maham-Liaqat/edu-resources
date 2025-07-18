// server/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const mongoURI = 'mongodb+srv://eduresources-admin:2d4sMZ6XuI3dINHJ@clustor1.todhj5m.mongodb.net/ilmzone?retryWrites=true&w=majority&appName=Clustor1'; // Use your Atlas URI

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedAdmin = async () => {
  try {
    const admin = new Admin({
      _id: new mongoose.Types.ObjectId(), // MongoDB auto-generates _id
      // If your schema requires an 'id' field, uncomment and set it
      // id: new mongoose.Types.ObjectId(), // Optional, if schema requires 'id'
      password: bcrypt.hashSync('03216514935Maham', 10),
      role: 'admin',
    });
    await admin.save();
    console.log('Admin seeded successfully');
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

seedAdmin();
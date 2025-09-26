// initAdmin.js
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './src/models/adminModel.js';

const MONGO_URI = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/mydb';

const adminCredentials = {
  email: process.env.ADMIN_EMAIL || 'admin123@gmail.com',
  password: process.env.ADMIN_PASSWORD || '12345678',
};

const initAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB');

    // Check if admin already exists by email
    const existingAdmin = await Admin.findOne({ email: adminCredentials.email });

    if (existingAdmin) {
      console.log('Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash(adminCredentials.password, 10);
      await Admin.create({ email: adminCredentials.email, password: hashedPassword, role: 'admin' });
      console.log('Admin created successfully!');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error initializing admin:', err);
    process.exit(1);
  }
};

initAdmin();

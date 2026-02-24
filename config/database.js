import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // If no Mongo URI is provided, skip connecting (frontend-only deployments)
  if (!process.env.MONGODB_URI) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('MONGODB_URI not set — skipping MongoDB connection (frontend-only mode)');
    }
    return;
  }

  // If the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.log('MongoDB connection error:', error.message || error);
  }
};

export default connectDB;

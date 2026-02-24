import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // If no Mongo URI is provided or value is clearly a placeholder/invalid,
  // skip connecting (frontend-only deployments).
  const uri = process.env.MONGODB_URI && process.env.MONGODB_URI.trim();
  const validScheme = uri && /^mongodb(\+srv)?:\/\//i.test(uri);
  if (!uri || !validScheme) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('MONGODB_URI not set or invalid — skipping MongoDB connection (frontend-only mode)');
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
    await mongoose.connect(uri);
    connected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.log('MongoDB connection error:', error.message || error);
  }
};

export default connectDB;

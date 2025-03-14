import mongoose from 'mongoose';

// Connection state tracking
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/walkthroughs';
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with connection pooling
 * Reuses existing connection if available
 */
export async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if not already pending
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Define model function to prevent model recompilation errors
export function defineModel(modelName, schema) {
  return mongoose.models[modelName] 
    ? mongoose.model(modelName)
    : mongoose.model(modelName, schema);
}
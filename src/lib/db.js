import mongoose from 'mongoose';

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using cached connection if available
 * @returns {Promise<mongoose.Connection>}
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

// Graceful shutdown
['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, async () => {
    if (cached.conn) {
      await mongoose.disconnect();
      console.log('MongoDB connection closed');
      process.exit(0);
    }
  });
});
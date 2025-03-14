import mongoose from 'mongoose';

// Define the Guide schema
const GuideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this guide'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug for this guide'],
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content for this guide'],
    },
    videoUrl: {
      type: String,
    },
    coverImage: {
      type: String,
      default: '/images/default-cover.jpg',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent model overwrite error in development with hot reloading
export default mongoose.models.Guide || mongoose.model('Guide', GuideSchema);
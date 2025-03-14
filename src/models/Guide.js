import mongoose from 'mongoose';
import { defineModel } from '@/lib/db';

// Define Guide schema
const GuideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update the updatedAt field
GuideSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Use the defineModel helper to prevent model recompilation errors
const Guide = defineModel('Guide', GuideSchema);

export default Guide;
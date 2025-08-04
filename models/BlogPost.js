// models/BlogPost.js
import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  coverImage: String,
  category: String,
  tags: [String],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

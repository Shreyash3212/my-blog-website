// pages/api/posts/index.js
import dbConnect from '../../../lib/dbConnect';
import BlogPost from '../../../models/BlogPost';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    // Filtering with query params
    const { tag, category, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    if (category) filter.category = category;
    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await BlogPost.countDocuments(filter);
    return res.json({ posts, total });
  }
  if (req.method === 'POST') {
    // For admin (auth check omitted for brevity)
    const { title, content, coverImage, category, tags } = req.body;
    const post = await BlogPost.create({ title, content, coverImage, category, tags });
    return res.status(201).json(post);
  }
  res.status(405).end();
}

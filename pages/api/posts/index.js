// pages/api/posts/index.js
import dbConnect from '../../../lib/dbConnect';
import BlogPost from '../../../models/BlogPost';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
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
    try {
      const { title, content, coverImage, category, tags, published } = req.body;
      const post = await BlogPost.create({
        title,
        content,
        coverImage,
        category,
        tags,
        published,
      });
      return res.status(201).json(post); // ✅ Return created post
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}

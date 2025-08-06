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
    return res.status(200).json({ posts, total });
  }

  if (req.method === 'POST') {
    try {
      // For admin (auth check omitted for brevity)
      const { title, content, coverImage, category, tags, published } = req.body;

      const post = await BlogPost.create({
        title,
        content,
        coverImage,
        category,
        tags,
        published,
      });

      return res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Failed to create post' });
    }
  }

  // If not GET or POST
  return res.status(405).json({ message: 'Method Not Allowed' });
}

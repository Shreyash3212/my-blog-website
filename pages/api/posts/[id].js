// pages/api/posts/[id].js
import dbConnect from '../../../lib/dbConnect';
import BlogPost from '../../../models/BlogPost';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === 'GET') {
    const post = await BlogPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.json(post);
  }
  if (req.method === 'PATCH') {
    const post = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(post);
  }
  if (req.method === 'DELETE') {
    await BlogPost.findByIdAndDelete(id);
    return res.status(204).end();
  }
  res.status(405).end();
}

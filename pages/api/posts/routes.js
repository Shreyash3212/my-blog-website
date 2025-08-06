// app/api/posts/route.js
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';

export async function GET(req) {
  await dbConnect();
  const posts = await BlogPost.find({ published: true }).limit(5).lean();
  return Response.json(posts);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { title, content, coverImage, category, tags, published } = body;
  const post = await BlogPost.create({ title, content, coverImage, category, tags, published });
  return Response.json(post, { status: 201 });
}

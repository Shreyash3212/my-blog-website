import dbConnect from '../../../lib/dbConnect';
import BlogPost from '../../../models/BlogPost';

export async function GET() {
  await dbConnect();
  const posts = await BlogPost.find({ published: true }).limit(5).lean();
  return new Response(JSON.stringify(posts), { status: 200 });
}

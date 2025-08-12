import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';

export async function GET(request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 5;
  
  const filter = { published: true };
  if (tag) filter.tags = tag;
  if (category) filter.category = category;

  try {
    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await BlogPost.countDocuments(filter);
    return Response.json({ posts, total });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const { title, content, coverImage, category, tags, published } = body;
    
    const post = await BlogPost.create({
      title,
      content,
      coverImage,
      category,
      tags,
      published
    });
    
    return Response.json({ message: 'Post created successfully', post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return Response.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
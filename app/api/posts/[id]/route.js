import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;
  
  try {
    const post = await BlogPost.findById(id);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();
  const { id } = await params;
  
  try {
    const body = await request.json();
    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return Response.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return Response.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;
  
  try {
    const post = await BlogPost.findByIdAndDelete(id);
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return Response.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return Response.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
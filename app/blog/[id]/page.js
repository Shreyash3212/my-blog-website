import dbConnect from '@/lib/dbConnect';
import BlogPostModel from '@/models/BlogPost';
import { notFound } from 'next/navigation';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    await dbConnect();
    const post = await BlogPostModel.findById(id).lean();
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      };
    }
    
    return {
      title: post.title,
      description: post.content.substring(0, 150),
      openGraph: {
        title: post.title,
        description: post.content.substring(0, 150),
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error Loading Post',
      description: 'There was an error loading the blog post.'
    };
  }
}

export default async function BlogPost({ params }) {
  const { id } = await params;
  
  try {
    await dbConnect();
    const post = await BlogPostModel.findById(id).lean();
    
    if (!post) {
      notFound();
    }
    
    return (
      <article>
        <h1>{post.title}</h1>
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <div className="post-meta">
          <p>Category: {post.category || 'Uncategorized'}</p>
          <p>Tags: {post.tags?.join(', ') || 'None'}</p>
          <p>Published: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return (
      <div>
        <h1>Error Loading Post</h1>
        <p>There was an error loading this blog post. Please try again later.</p>
      </div>
    );
  }
}
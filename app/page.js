import Link from "next/link";
import dbConnect from '@/lib/dbConnect';
import BlogPostModel from '@/models/BlogPost';

export const metadata = {
  title: "My Blog - Recent Posts",
  description: "A modern SEO-optimized blog with the latest posts",
};

export default async function Home() {
  // Direct database query instead of API call
  let posts = [];
  
  try {
    await dbConnect();
    posts = await BlogPostModel.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(); // .lean() for better performance
    
    // Convert MongoDB objects to plain objects for Next.js
    posts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString()
    }));
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="container">
      <h1>Recent Posts.</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post._id}`}>
                {post.title}
              </Link>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found. Create some posts first!</p>
      )}
    </div>
  );
}
import dbConnect from '@/lib/dbConnect';
import BlogPostModel from '@/models/BlogPost';

export async function POST() {
  try {
    await dbConnect();
    
    // Check if posts already exist
    const existingPosts = await BlogPostModel.countDocuments();
    if (existingPosts > 0) {
      return Response.json({ 
        message: `Database already has ${existingPosts} posts. Skipping seed.` 
      });
    }
    
    // Sample blog posts
    const samplePosts = [
      {
        title: "Getting Started with Next.js 14",
        content: `<p>Next.js 14 brings exciting new features and improvements. In this post, we'll explore the App Router, Server Components, and more.</p>
                 <p>The App Router is a new paradigm that makes building React applications even more intuitive and powerful.</p>`,
        category: "Technology",
        tags: ["Next.js", "React", "JavaScript", "Web Development"],
        published: true
      },
      {
        title: "The Future of Web Development",
        content: `<p>Web development is constantly evolving. From static sites to dynamic applications, we've come a long way.</p>
                 <p>In this post, we'll discuss emerging trends and technologies that are shaping the future of the web.</p>`,
        category: "Technology",
        tags: ["Web Development", "Future", "Technology"],
        published: true
      },
      {
        title: "Building Scalable Applications",
        content: `<p>Scalability is crucial for modern web applications. Learn about best practices and architectural patterns.</p>
                 <p>We'll cover database optimization, caching strategies, and more.</p>`,
        category: "Programming",
        tags: ["Scalability", "Architecture", "Performance"],
        published: true
      }
    ];
    
    // Insert sample posts
    const createdPosts = await BlogPostModel.insertMany(samplePosts);
    
    return Response.json({ 
      message: `Successfully created ${createdPosts.length} sample posts!`,
      posts: createdPosts
    });
    
  } catch (error) {
    console.error('Error seeding data:', error);
    return Response.json(
      { error: 'Failed to seed data', details: error.message }, 
      { status: 500 }
    );
  }
}
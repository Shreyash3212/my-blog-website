import Head from 'next/head';

export default async function BlogPost({ params }) {
  const { id } = await params;
  
  try {
    // Use relative URL for server-side requests
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const post = await res.json();
    
    return (
      <>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={post.content.substring(0,150)} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.content.substring(0,150)} />
        </Head>
        <article>
          <h1>{post.title}</h1>
          {post.coverImage && <img src={post.coverImage} alt={post.title} />}
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <p>Category: {post.category} | Tags: {post.tags?.join(', ') || 'None'}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </article>
      </>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return <div>Error loading post</div>;
  }
}
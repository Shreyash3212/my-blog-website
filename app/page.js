import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';
import "./styles/home.css"
import NavigationLink from "./components/NavigationLink";
export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : "http://localhost:3000";
  
  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
  
  if (!res.ok) {
    return <div className="blog-error">Failed to load posts.</div>;
  }

  let posts = [];
  try {
    const data = await res.json();
    posts = Array.isArray(data) ? data : data.posts ?? [];
  } catch (e) {
    console.error("JSON parse error:", e);
  }

  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A modern SEO-optimized blog" />
        <link rel="canonical" href={`${baseUrl}/`} />
      </Head>
      <div className="blog-container">
        <h1 className="blog-title">Popular Now</h1>
        <ul className="posts-grid">
          {posts.map((post) => (
            <li key={post._id} className="post-card">
              <NavigationLink href={`/blog/${post._id}`} className="post-link">
                {post.coverImage && (
                  // <img 
                  //   src={post.coverImage} 
                  //   alt={post.title} 
                  //   className="post-image"
                  // />
                  <Image 
  src={post.coverImage} 
  alt={post.title}  
  className="post-image"
    width={400}
  height={200}
/>
                )}
                <div className="post-content">
                  <div className="post-categories">
                    {post.categories?.map((category, index) => (
                      <span key={index} className="category-tag">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  {post.excerpt && (
                    <p className="post-excerpt">{post.excerpt}</p>
                  )}
                </div>
              </NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}



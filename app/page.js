// app/page.js
import Head from 'next/head';
import Link from 'next/link';

export default async function Home() {
const res = await fetch(`http://localhost:3000/api/posts?limit=5`, { cache: 'no-store' });

if (!res.ok) {
  console.error('Failed to fetch posts:', res.status);
  return <div>Failed to load posts</div>;
}

const data = await res.json();

  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A modern SEO-optimized blog" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/`} />
        {/* Open Graph */}
        <meta property="og:title" content="My Blog" />
        <meta property="og:description" content="A modern SEO-optimized blog" />
      </Head>
      <div className="container">
        <h1>Recent Posts</h1>
        <ul>
          {data.posts.map(post => (
            <li key={post._id}>
              <Link href={`/blog/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// app/blog/[id]/page.js
import Head from 'next/head';

export default async function BlogPost({ params }) {
  // const post = await res.json();
  const { id } = await params; // <-- Await `params` to get the id
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`);
  const post = await res.json();
  // const res = await fetch(`/api/posts/${id}`);
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
        <img src={post.coverImage} alt={post.title} />
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <p>Category: {post.category} | Tags: {post.tags.join(', ')}</p>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </article>
    </>
  );
}

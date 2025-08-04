import dbConnect from '../lib/dbConnect';
import BlogPost from '../models/BlogPost';
import Link from 'next/link';
import Head from 'next/head';

export default async function Home() {
  await dbConnect();
  const posts = await BlogPost.find({ published: true }).limit(5).lean();

  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A modern SEO-optimized blog" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/`} />
      </Head>
      <div className="container">
        <h1>Recent Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

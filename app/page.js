import Link from "next/link";
import Head from "next/head";

export default async function Home() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });

  if (!res.ok) {
    // console.error("Failed to fetch posts:", res.status);
    return <div>Failed to load posts.</div>;
  }

  let posts = [];
  try {
    const data = await res.json();
    posts = Array.isArray(data) ? data : data.posts ?? [];
    console.log("Fetched posts:", posts);
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

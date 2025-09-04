import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import NavigationLink from "./components/NavigationLink";
import Hero from "./components/Hero";
import FeaturedSection from "./components/FeaturedSection";
import TopPosts from "./components/TopPosts";
import "./styles/home.css";
import "./styles/responsive.css"
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

  // Extract unique categories from all posts
  const allCategories = posts
    .map((post) => post.category)
    .filter((category) => category && category.trim())
    .filter((category, index, self) => self.indexOf(category) === index);

  // Category images mapping
  const categoryImages = {
    "Web Development":
      "https://images.unsplash.com/photo-1756469644995-52f734e71879?q=80&w=1253&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Mobile Development":
      "https://plus.unsplash.com/premium_photo-1756224672428-905c9d7c10e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Artificial Intelligence":
      "https://images.unsplash.com/photo-1756470843828-617611d35cf6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D",
    "Cloud Computing":
      "https://images.unsplash.com/photo-1756049060197-37b4b52c3183?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Cybersecurity:
      "https://images.unsplash.com/photo-1755289446025-d04dfe8f0fe3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A modern SEO-optimized blog" />
        <link rel="canonical" href={`${baseUrl}/`} />
      </Head>

      {/* Hero Section */}
      <Hero backgroundImage="https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <div className="outer-container">
        {/* Featured Section */}
        <FeaturedSection posts={posts} />

        <div className="inner-cont">
          {/* Categories Section */}
          <div className="category-container">
            <h2 className="blog-title">Categories</h2>
            <div className="categories-grid">
              {allCategories.map((category, index) => (
                <NavigationLink
                  key={index}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="category-card"
                >
                  <div
                    className="category-image-container"
                    style={{
                      backgroundImage: `url(${
                        categoryImages[category] ||
                        categoryImages["Web Development"]
                      })`,
                    }}
                  >
                    <div className="category-overlay">
                      <h4 className="category-title">{category}</h4>
                      <span className="post-count btn-blur">
                        {
                          posts.filter((post) => post.category === category)
                            .length
                        }{" "}
                        posts
                      </span>
                    </div>
                  </div>
                </NavigationLink>
              ))}
            </div>
          </div>
          {/* Top Posts Section */}
          <TopPosts posts={posts} />
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="blog-container">
        <h2 className="blog-title">Popular Now</h2>
        <ul className="posts-grid">
          {posts.map((post) => (
            <li key={post._id} className="post-card">
              <NavigationLink href={`/blog/${post._id}`} className="post-link">
                {post.coverImage && (
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
                    {post.category && (
                      <span className="category-tag btn-blur">
                        {post.category}
                      </span>
                    )}
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

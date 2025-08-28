import { Metadata } from "next";
import "../../styles/singleBlogPage.css";
import Image from "next/image";
// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const post = await res.json();
    const description = post.content.replace(/<[^>]*>/g, "").substring(0, 160);

    return {
      title: post.title,
      description: description,
      keywords: post.tags?.join(", ") || "",
      openGraph: {
        title: post.title,
        description: description,
        type: "article",
        publishedTime: post.createdAt,
        authors: [post.author || "Anonymous"],
        section: post.category,
        tags: post.tags || [],
        images: post.coverImage
          ? [
              {
                url: post.coverImage,
                alt: post.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: description,
        images: post.coverImage ? [post.coverImage] : [],
      },
      alternates: {
        canonical: `${baseUrl}/blog/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Read our latest blog post.",
    };
  }
}

export default async function BlogPost({ params }) {
  const { id } = await params;

  try {
    // Use relative URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}`
      : "http://localhost:3000";
    console.log(baseUrl);

    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      cache: "no-store", // Ensure fresh data
    });
    console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    const post = await res.json();

    // Generate JSON-LD structured data for SEO
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
      image: post.coverImage || "",
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      author: {
        "@type": "Person",
        name: post.author || "Anonymous",
      },
      publisher: {
        "@type": "Organization",
        name: "Your Blog Name", // Replace with your actual blog/site name
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${id}`,
      },
      articleSection: post.category,
      keywords: post.tags?.join(", ") || "",
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="blog-page-outer-container">
          <aside className="blog-l" aria-label="Sidebar navigation">
            
          </aside>

          <main className="blog-m">
            <article itemScope itemType="https://schema.org/BlogPosting">
              <header>
                <h1 itemProp="headline">{post.title}</h1>
                {post.coverImage && (
                  <figure>
                    {/* <img 
                      src={post.coverImage} 
                      alt={post.title}
                      itemProp="image"
                      loading="lazy"
                      width="800"
                      height="400"
                    /> */}
                    <Image
                      src={post.coverImage}
                      alt="Cover preview"
                      width={400} // fixed numeric width in pixels
                      height={200} // fixed numeric height in pixels
                    />
                  </figure>
                )}
              </header>

              <div
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* <footer>
                <div
                  itemProp="about"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <span>Category: </span>
                  <span itemProp="name">{post.category}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div>
                    <span>Tags: </span>
                    {post.tags.map((tag, index) => (
                      <span key={tag} itemProp="keywords">
                        {tag}
                        {index < post.tags.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                )}

                <time itemProp="datePublished" dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>

                <meta itemProp="author" content={post.author || "Anonymous"} />
                <meta itemProp="publisher" content="Your Blog Name" />
              </footer> */}
            </article>
          </main>

          <aside className="blog-r" aria-label="Additional content">
            
          </aside>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="blog-page-outer-container">
        <aside className="blog-l" aria-label="Sidebar navigation">
          a
        </aside>
        <main className="blog-m">
          <h1>Error Loading Post</h1>
          <p>
            Sorry, we couldn&apos;t load the requested blog post. Please try
            again later.
          </p>
        </main>
        <aside className="blog-r" aria-label="Additional content">
          c
        </aside>
      </div>
    );
  }
}

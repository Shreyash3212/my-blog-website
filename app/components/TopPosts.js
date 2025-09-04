import NavigationLink from "./NavigationLink";
import "../styles/topPosts.css";

export default function TopPosts({ posts }) {
  // Get top 5 posts (you can modify this logic based on your criteria)
  const topPosts = posts.slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).toUpperCase();
  };

  const formatCategories = (post) => {
    let categories = [];
    if (post.category) categories.push(post.category);
    if (post.categories && Array.isArray(post.categories)) {
      categories = [...categories, ...post.categories];
    }
    // Remove duplicates and return formatted string
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories.join(', ').toUpperCase();
  };

  return (
    <div className="top-posts-container">
      <h2 className="top-posts-title">Top Posts</h2>
      <div className="top-posts-list">
        {topPosts.map((post, index) => (
          <NavigationLink 
            key={post._id} 
            href={`/blog/${post._id}`} 
            className="top-post-link"
          >
            <div className="top-post-item">
              <div className="post-number">{index + 1}</div>
              <div className="post-details">
                <h3 className="post-title-top">{post.title}</h3>
                <div className="post-meta">
                  <span className="post-categories-meta">
                    {formatCategories(post)}
                  </span>
                  {post.createdAt && (
                    <>
                      <span className="meta-separator">-</span>
                      <span className="post-date">
                        {formatDate(post.createdAt)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </NavigationLink>
        ))}
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import NavigationLink from "./NavigationLink";
import "../styles/featuredSection.css"
import { useState } from "react";

export default function FeaturedSection({ posts }) {
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Show only first 4 posts initially, or all if showAll is true
  const featuredPosts = showAll ? posts : posts.slice(0, visibleCount);
  
  const handleShowMore = () => {
    setShowAll(true);
  };
  
  const handleShowLess = () => {
    setShowAll(false);
  };
  
  return (
    <div className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">Featured Articles</h2>
        <p className="featured-subtitle">Handpicked content from our latest posts</p>
      </div>
      
      <div className="featured-grid">
        {featuredPosts.map((post) => (
          <NavigationLink key={post._id} href={`/blog/${post._id}`} className="featured-card">
            <div className="featured-image-container">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="featured-image"
                />
              )}
              <div className="featured-overlay btn-blur">
                <div className="featured-stats">Featured</div>
              </div>
            </div>
            
            <div className="featured-content">
              {post.category && (
                <div className="featured-badge">{post.category}</div>
              )}
              <h3 className="featured-card-title">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="featured-description">{post.excerpt}</p>
              )}
              
              <div className="featured-action">
                <span className="featured-link">Read More</span>
                <div className="featured-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </NavigationLink>
        ))}
      </div>
      
      {/* Show More/Show Less Button */}
      {posts.length > visibleCount && (
        <div className="show-more-container">
          {!showAll ? (
            <button className="show-more-btn" onClick={handleShowMore}>
              <span>Show More</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v14m-7-7l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button className="show-more-btn" onClick={handleShowLess}>
              <span>Show Less</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 15V1m7 7l-7-7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

import React from 'react';

export default function Hero({ backgroundImage }) {
  return (
    <section 
      className="hero" 
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="hero-content">
        <h1 className="hero-heading">Welcome to My Blog</h1>
        <p className="hero-description">
          Discover amazing stories, insights, and ideas that inspire and inform. 
          Join our community of readers exploring the world through words.
        </p>
        <div className="hero-cta">
          <button className="cta-primary">Start Reading</button>
          <button className="cta-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
}
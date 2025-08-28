"use client"; // If you’re on Next.js 13+ (App Router), mark as client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/CreativeLoader.css"; // adjust path as needed

const CreativeLoader = ({ 
  isVisible = false, 
  messages = ["Loading..."], 
  duration = 2000,
  backgroundColor = "dark", // 'dark' or 'light'
  logo = "/assets/Blue leadbug SVG.svg" // default logo from public folder
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Preload logo (to avoid flicker)
  useEffect(() => {
    if (logo) {
      const img = new window.Image();
      img.onload = () => setLogoLoaded(true);
      img.onerror = () => setLogoLoaded(true);
      img.src = logo;
    } else {
      setLogoLoaded(true);
    }
  }, [logo]);

  // Cycle messages
  useEffect(() => {
    if (!isVisible || messages.length <= 1) return;
    if (currentTextIndex < messages.length - 1) {
      const timeout = setTimeout(
        () => setCurrentTextIndex((prev) => prev + 1),
        duration
      );
      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentTextIndex, messages.length, duration]);

  // Reset index when visible
  useEffect(() => {
    if (isVisible) setCurrentTextIndex(0);
  }, [isVisible]);

  if (!isVisible) return null;

  const currentMessage = messages[currentTextIndex];

  return (
    <div className={`loader-container ${backgroundColor}`}>
      <div className="loader-content">
        {/* Logo / Spinner */}
        <div className="logo-wrapper">
          <div className="logo-ping"></div>
          <div className="logo-pulse"></div>
          <div className="logo-inner">
            {logo && logoLoaded ? (
              <Image
                src={logo}
                alt="Loading..."
                width={96}
                height={96}
                className="logo-img"
                priority
              />
            ) : (
              <div className="spinner"></div>
            )}
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <div key={currentTextIndex} className="breathe-text">
            {currentMessage}
          </div>
        </div>

        {/* Three Dots */}
        <div className="dots">
          <div className="dot" style={{ animationDelay: "0s" }}></div>
          <div className="dot" style={{ animationDelay: "0.2s" }}></div>
          <div className="dot" style={{ animationDelay: "0.4s" }}></div>
        </div>

        {/* Floating Particles */}
        {/* <div className="particles-contianer">
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        </div> */}
      </div>
    </div>
  );
};

export default CreativeLoader;

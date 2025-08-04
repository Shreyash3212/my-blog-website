// pages/sitemap.xml.js
import dbConnect from '../lib/dbConnect';
import BlogPost from '../models/BlogPost';

export async function getServerSideProps({ res }) {
  // Connect to MongoDB
  await dbConnect();

  // Fetch published blog posts
  const posts = await BlogPost.find({ published: true });

  // Build XML Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.NEXT_PUBLIC_BASE_URL}/</loc>
    <priority>1.0</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post._id}</loc>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  // Send XML to browser
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} }; // Page does not render anything
}

// This page does not render a component
export default function Sitemap() {
  return null;
}

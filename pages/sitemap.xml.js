// pages/sitemap.xml.js
import dbConnect from '../lib/dbConnect';
import BlogPost from '../models/BlogPost';

export default async (req, res) => {
  await dbConnect();
  const posts = await BlogPost.find({published: true});
  const sitemap = `<?xml version="1.0"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.NEXT_PUBLIC_BASE_URL}/</loc>
    <priority>1.0</priority>
  </url>
  ${posts.map(post=>`
  <url>
    <loc>${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post._id}</loc>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

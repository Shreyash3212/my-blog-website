'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/app/components/userRequireAuth";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch all posts (published and unpublished) for admin
        const res = await fetch("/api/posts?limit=100");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/admin/login");
  }

  const loading = useRequireAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Manage Posts</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Link href="/admin/new">Add New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/admin/edit/${post._id}`}>{post.title}</Link> - {post.published ? "Published" : "Draft"}
          </li>
        ))}
      </ul>
    </div>
  );
}
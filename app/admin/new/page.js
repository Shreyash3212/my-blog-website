// /app/admin/new/page.js
'use client';
import { useState } from "react";
import { useRequireAuth } from "@/app/components/userRequireAuth";

export default function AdminNewPost() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

    const loading = useRequireAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner, or nothing
  }

  async function handleSubmit(e) {
    e.preventDefault();

const res = await fetch('/api/posts', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    coverImage,
    category,
    tags: tags.split(",").map(tag => tag.trim()),
    content,
    published: true   // <-- ADD THIS!
  })
});


    if (res.ok) {
      setMessage("New post created!");
      setTitle("");
      setCoverImage("");
      setCategory("");
      setTags("");
      setContent("");
    } else {
      setMessage("There was an error creating the post.");
    }
  }

  return (
    <div className="container">
      <h2>Add New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br />

        <input
          type="text"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={e => setCoverImage(e.target.value)}
        /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        /><br />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        /><br />

        <label>Content:</label><br />
        <textarea
          rows={10}
          placeholder="Write your blog content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
        <br />

        <button type="submit">Add Post</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

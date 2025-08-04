'use client';
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/app/components/userRequireAuth";

export default function EditBlog({ params }) {
  const { id } = use(params); // ✅ unwrap params
  const router = useRouter();

  // Blog state
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState('');

  const loading = useRequireAuth(); // ✅ always run hooks in the same order

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const post = await res.json();
        setTitle(post.title || '');
        setCoverImage(post.coverImage || '');
        setCategory(post.category || '');
        setTags((post.tags || []).join(', '));
        setContent(post.content || '');
        setPublished(post.published || false);
      }
    }
    if (id) fetchPost();
  }, [id]);

  // Update post
  async function handleUpdate(e) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        coverImage,
        category,
        tags: tags.split(',').map(t => t.trim()),
        content,
        published,
      })
    });
    setMessage(res.ok ? "Post updated!" : "Error updating post.");
    if (res.ok) router.push('/admin/dashboard');
  }

  // Delete post
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setMessage(res.ok ? "Post deleted!" : "Error deleting post.");
    if (res.ok) router.push('/admin/dashboard');
  }

  // Archive post
  async function handleArchive() {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: false })
    });
    setMessage(res.ok ? "Post archived (set to draft)." : "Error archiving post.");
    if (res.ok) router.push('/admin/dashboard');
  }

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Edit Blog Post</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Title"
            /><br />
            <input
              type="text"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="Cover Image URL"
            /><br />
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Category"
            /><br />
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
            /><br />
            <label>
              Published:
              <input
                type="checkbox"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
                style={{ marginLeft: '8px' }}
              />
            </label>
            <br />
            <label>Content:</label><br />
            <textarea
              rows={10}
              placeholder="Write your blog content here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
            <br />
            <button type="submit">Update</button>
            <button type="button" onClick={handleDelete} style={{ backgroundColor: "red", color: "white", marginLeft: 8 }}>Delete</button>
            <button type="button" onClick={handleArchive} style={{ backgroundColor: "orange", color: "white", marginLeft: 8 }}>Archive</button>
          </form>
        </>
      )}
    </div>
  );
}

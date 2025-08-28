'use client';
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/app/components/userRequireAuth";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Underline } from '@tiptap/extension-underline';
import { Image as TipTapImage } from '@tiptap/extension-image';
import '../../../styles/editBlog.css';

// Rich Text Editor Toolbar Component
const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="toolbar">
      {/* Text Formatting */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'active' : ''}
          type="button"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'active' : ''}
          type="button"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'active' : ''}
          type="button"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'active' : ''}
          type="button"
          title="Strikethrough"
        >
          <s>S</s>
        </button>
      </div>

      {/* Headings */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
          type="button"
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
          type="button"
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
          type="button"
          title="Heading 3"
        >
          H3
        </button>
      </div>

      {/* Alignment */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}
          type="button"
          title="Align Left"
        >
          ⬅️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}
          type="button"
          title="Align Center"
        >
          ↔️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}
          type="button"
          title="Align Right"
        >
          ➡️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}
          type="button"
          title="Justify"
        >
          ⬌
        </button>
      </div>

      {/* Lists */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'active' : ''}
          type="button"
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'active' : ''}
          type="button"
          title="Numbered List"
        >
          1. List
        </button>
      </div>

      {/* Other */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'active' : ''}
          type="button"
          title="Blockquote"
        >
          &quot; Quote
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'active' : ''}
          type="button"
          title="Code Block"
        >
          &lt;/&gt; Code
        </button>
        <button 
          onClick={addImage} 
          type="button"
          title="Insert Image"
        >
          🖼️ Image
        </button>
      </div>

      {/* Text Color */}
      <div className="toolbar-group">
        <input
          type="color"
          onInput={(event) => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          data-testid="setColor"
          title="Text Color"
        />
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'active' : ''}
          type="button"
          title="Highlight"
        >
          🖍️ Highlight
        </button>
      </div>

      {/* Undo/Redo */}
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          type="button"
          title="Undo"
        >
          ↶ Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          type="button"
          title="Redo"
        >
          ↷ Redo
        </button>
      </div>
    </div>
  );
};

export default function EditBlog({ params }) {
  const { id } = use(params);
  const router = useRouter();
  
  // Blog state
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState('');
  const [postLoaded, setPostLoaded] = useState(false);
  const loading = useRequireAuth();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight,
      Underline,
      TipTapImage,
    ],
    content: '<p>Loading...</p>',
    immediatelyRender: false,
  });

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const post = await res.json();
          setTitle(post.title || '');
          setCoverImage(post.coverImage || '');
          setCategory(post.category || '');
          setTags((post.tags || []).join(', '));
          setPublished(post.published || false);
          
          // Set editor content
          if (editor && post.content) {
            editor.commands.setContent(post.content);
          }
          
          setPostLoaded(true);
        } else {
          setMessage('Error loading post');
        }
      } catch (error) {
        setMessage('Error loading post');
      }
    }
    if (id && editor) fetchPost();
  }, [id, editor]);

  // Update post
  async function handleUpdate(e) {
    e.preventDefault();
    setMessage('');
    
    try {
      const content = editor.getHTML();
      
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
      
      if (res.ok) {
        setMessage("Post updated successfully! 🎉");
        setTimeout(() => router.push('/admin/dashboard'), 1500);
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error || 'Failed to update post'}`);
      }
    } catch (error) {
      setMessage("Network error occurred");
    }
  }

  // Delete post
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        setMessage("Post deleted! 🗑️");
        setTimeout(() => router.push('/admin/dashboard'), 1500);
      } else {
        setMessage("Error deleting post.");
      }
    } catch (error) {
      setMessage("Network error occurred");
    }
  }

  // Archive post
  async function handleArchive() {
    if (!confirm("Are you sure you want to archive this post?")) return;
    
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: false })
      });
      
      if (res.ok) {
        setMessage("Post archived (set to draft). 📁");
        setTimeout(() => router.push('/admin/dashboard'), 1500);
      } else {
        setMessage("Error archiving post.");
      }
    } catch (error) {
      setMessage("Network error occurred");
    }
  }

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!postLoaded) {
    return <div className="loading-spinner">Loading post...</div>;
  }

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h1>Edit Blog Post</h1>
        <p>Update your story with our advanced editor</p>
      </div>
      
      <form onSubmit={handleUpdate} className="blog-form">
        <div className="form-section">
          <h3>Post Details</h3>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter an engaging title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="title-input"
            />
          </div>
          
          <div className="input-group">
            <label>Cover Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              className="cover-image-input"
            />
            {coverImage && (
              <div className="cover-preview">
                <img 
                  src={coverImage} 
                  alt="Cover preview"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="Technology, Lifestyle, etc."
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="category-input"
              />
            </div>
            <div className="input-group">
              <label>Tags</label>
              <input
                type="text"
                placeholder="react, javascript, web development"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="tags-input"
              />
            </div>
          </div>
          
          <div className="input-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={published}
                onChange={e => setPublished(e.target.checked)}
                className="publish-checkbox"
              />
              <span className="checkbox-text">Published</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Content</h3>
          <div className="editor-container">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="editor-content" />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="update-btn">
            💾 Update Post
          </button>
          <button 
            type="button" 
            onClick={handleArchive} 
            className="archive-btn"
          >
            📁 Archive
          </button>
          <button 
            type="button" 
            onClick={handleDelete} 
            className="delete-btn"
          >
            🗑️ Delete
          </button>
        </div>
      </form>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

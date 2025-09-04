// AdminNewPost Component with Link extension and Link button in Toolbar
'use client';
import { useState } from "react";
import { useRequireAuth } from "@/app/components/userRequireAuth";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import '../../styles/createBlog.css';

// Category options
const CATEGORY_OPTIONS = [
  { value: '', label: 'Select a category...' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
  { value: 'Cybersecurity', label: 'Cybersecurity' }
];

// Rich Text Editor Toolbar Component
const Toolbar = ({ editor }) => {
  if (!editor) return null;
  
  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  
  const addLink = () => {
    const url = window.prompt('Enter the URL');
    if (url !== null) {
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }
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
        <button
          onClick={addLink}
          className={editor.isActive('link') ? 'active' : ''}
          type="button"
          title="Insert Link"
        >
          🔗 Link
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

export default function AdminNewPost() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  
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
      Image,
      Link,
    ],
    content: '<p>Start writing your blog content here...</p>',
    immediatelyRender: false,
  });
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const content = editor.getHTML();
      const res = await fetch('/api/posts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          coverImage,
          category,
          tags: tags.split(",").map(tag => tag.trim()),
          content,
          published: true
        }),
      });
      
      if (res.ok) {
        setMessage("New post created successfully! 🎉");
        setTitle("");
        setCoverImage("");
        setCategory("");
        setTags("");
        editor?.commands.clearContent();
        editor?.commands.setContent('<p>Start writing your blog content here...</p>');
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error || 'Failed to create post'}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage("Network error occurred");
    }
  }
  
  return (
    <div className="blog-creator">
      <div className="creator-header">
        <h1>Create New Blog Post</h1>
        <p>Build your story with our advanced editor</p>
      </div>
      
      <form onSubmit={handleSubmit} className="blog-form">
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
                <img src={coverImage} alt="Cover preview" />
              </div>
            )}
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="category-select"
                required
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    disabled={option.value === ''}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
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
        </div>
        
        <div className="form-section">
          <h3>Content</h3>
          <div className="editor-container">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="editor-content" />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="publish-btn">
            🚀 Publish Post
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

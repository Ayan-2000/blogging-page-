import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../../utils.js';


const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }
      handleSuccess('Post deleted successfully!');

      setPosts((current) => current.filter((post) => post.id !== id));
    } catch (err) {
      handleError(err.message);
    }
  };

  const startEdit = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditContent('');
  };

  const saveEdit = async (id) => {
    if (!editTitle || !editContent) {
      handleError('Title and content are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      const updatedPost = await response.json();
      setPosts((current) =>
        current.map((post) => (post.id === id ? { ...post, title: editTitle, content: editContent } : post))
      );
      cancelEdit();
      handleSuccess('Post updated successfully!');
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Profile</h1>
      <p>Your own posts are listed below.</p>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)', padding: '16px', borderRadius: '8px' }}>
          {posts.length === 0 ? (
            <p>No posts available yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                {editingPostId === post.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      style={{ width: '100%', height: '120px', padding: '10px', fontSize: '16px' }}
                    />
                    <div style={{ marginTop: '10px' }}>
                      <button
                        onClick={() => saveEdit(post.id)}
                        style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{ marginLeft: '10px', backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <div>
                      <button
                        onClick={() => startEdit(post)}
                        style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', borderRadius: '4px', padding: '10px', border: 'none', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

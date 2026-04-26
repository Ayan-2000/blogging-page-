import React from 'react'
import{useState} from 'react'
import { handleSuccess, handleError } from '../../utils.js'

const AddPost = () => {
  console.log('AddPost component is rendering!')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlePost = async () => {
    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        setTitle('');
        setContent('');
        handleSuccess('Post created successfully!');
      } else {
        console.error('Failed to post:', response.statusText);
        handleError('Failed to create post.');
      }
    } catch (error) {
      console.error('Error posting:', error);
      handleError(error.message || 'An error occurred while creating the post.');
    }
  };

  return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '2px solid black' }}>
        <h1 style={{ color: 'red' }}>Create a New Post</h1>
        <div style={{ marginBottom: '20px' }}>
            <h2>Title of the Post</h2>
            <input
              type="text"
              placeholder="Enter the title of your post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '16px', border: '5px'}}
            />
        </div>
        <div style={{ marginBottom: '20px' }}>
            <h2>Content of the Post</h2>
            <textarea
              placeholder="Enter the content of your post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', height: '200px', padding: '10px', fontSize: '16px' }}
            ></textarea>
        </div>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={handlePost}
        >
          Post
        </button>
      </div>
  )
}

export default AddPost
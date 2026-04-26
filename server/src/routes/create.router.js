import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

router.post('/create', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, results) => {
    if (err) {
      console.error('Error inserting post:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    res.status(201).json({
      message: 'Post created successfully',
      data: { id: results.insertId, title, content }
    });
  });
});

router.get('/posts', (req, res) => {
  const sql = 'SELECT id, title, content FROM posts ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    res.json(results);
  });
});

router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  db.query(sql, [title, content, id], (err, results) => {
    if (err) {
      console.error('Error updating post:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully', data: { id, title, content } });
  });
});

router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM posts WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  });
});

export default router;
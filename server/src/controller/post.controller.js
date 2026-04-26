import User from '../models/user.model.js';


export const createPost = (req, res) => {
    const { title, content } = req.body;
    User.create({ title, content })
        .then(post => res.status(201).json(post))
        .catch(err => res.status(500).json({ error: 'Failed to create post', details: err }));
};

export const getPosts = (req, res) => {
    User.findAll()
        .then(posts => res.json(posts))
        .catch(err => res.status(500).json({ error: 'Failed to fetch posts', details: err }));
};          

export const getPostById = (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch(err => res.status(500).json({ error: 'Failed to fetch post', details: err }));
};
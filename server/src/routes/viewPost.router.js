import {Router} from 'express';

const router = Router();

router.get('/view-post', (req, res) =>{
    // Here you would typically fetch the data from a database
    const post = {
        title: 'Sample Post',
        content: 'This is a sample post content.'
    };
    res.json(post);
});

export default router;
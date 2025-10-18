import express from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { createBlog, getBlogs, toggleLike, addComment } from '../controllers/blog.controllers.js'

const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.put('/:id/like', protect.toggleLike);
router.post('/:id/comment', protect, addComment);

export default router;

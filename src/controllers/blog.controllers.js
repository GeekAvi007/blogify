import Blog from '../models/blogs.models.js'

export const createBlog = async (req,res)=>{
    try {
        const blog = await Blog.create({...req.body, author: req.user.id});
        res.status(201).json(blog)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

export const getBlogs = async (req,res) => {
    const {page = 1, limit = 5, search } = req.query;
    const filter = search ? {title: { $regex: search, $options: 'i'}} : {};

    const blogs = await Blog.find(filter)
    .populate('author','username')
    .skip((page - 1) * limit)
    .limit(Number(limit));
    res.json(blogs);
};

export const toggleLike = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
    const userId = req.user.id;
    const liked = blog.likes.includes(userId);
    liked ? blog.likes.pull(userId) : blog.likes.push(userId);
  
    await blog.save();
    res.json({ liked: !liked, totalLikes: blog.likes.length });
  };
  
  export const addComment = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
    blog.comments.push({ user: req.user.id, text: req.body.text });
    await blog.save();
    res.json(blog.comments.at(-1));
  };
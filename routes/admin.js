const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

// Admin dashboard
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ published: true });
    
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      posts,
      stats: {
        total: totalPosts,
        published: publishedPosts,
        drafts: totalPosts - publishedPosts
      }
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading dashboard');
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      posts: [],
      stats: { total: 0, published: 0, drafts: 0 }
    });
  }
});

// Create post form
router.get('/create', (req, res) => {
  res.render('admin/create', {
    title: 'Create New Post',
    post: {}
  });
});

// Handle create post
router.post('/create', [
  body('title').notEmpty().withMessage('Title is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('admin/create', {
      title: 'Create New Post',
      post: req.body,
      errors: errors.array()
    });
  }

  try {
    const { title, excerpt, content, category, tags, imageUrl } = req.body;
    
    const post = new Post({
      title,
      excerpt,
      content,
      category,
      imageUrl: imageUrl || 'https://placehold.co/800x600.png',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await post.save();
    req.flash('success_msg', 'Post created successfully!');
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error creating post');
    res.render('admin/create', {
      title: 'Create New Post',
      post: req.body
    });
  }
});

// Edit post form
router.get('/edit/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      req.flash('error_msg', 'Post not found');
      return res.redirect('/admin');
    }

    res.render('admin/edit', {
      title: 'Edit Post',
      post
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading post');
    res.redirect('/admin');
  }
});

// Handle edit post
router.put('/edit/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const post = await Post.findById(req.params.id);
    return res.render('admin/edit', {
      title: 'Edit Post',
      post: { ...post.toObject(), ...req.body },
      errors: errors.array()
    });
  }

  try {
    const { title, excerpt, content, category, tags, imageUrl, published } = req.body;
    
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      excerpt,
      content,
      category,
      imageUrl,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      published: published === 'on'
    });

    req.flash('success_msg', 'Post updated successfully!');
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error updating post');
    res.redirect('/admin');
  }
});

// Delete post
router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Post deleted successfully!');
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error deleting post');
    res.redirect('/admin');
  }
});

module.exports = router;
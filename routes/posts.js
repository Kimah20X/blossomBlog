const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Show single post
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    
    if (!post) {
      return res.status(404).render('404', { title: 'Post Not Found' });
    }

    // Get recommended posts from same category
    const recommendedPosts = await Post.find({
      category: post.category,
      _id: { $ne: post._id },
      published: true
    }).limit(3).sort({ createdAt: -1 });

    res.render('post', {
      title: post.title,
      post,
      recommendedPosts
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Like a post
router.post('/:slug/like', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
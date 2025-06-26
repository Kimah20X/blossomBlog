const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Home page
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { published: true };
    
    if (category && category !== 'All') {
      filter.category = category;
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .limit(12);

    const categories = await Post.distinct('category');
    
    res.render('index', {
      title: 'Blossom Blog - Welcome',
      posts,
      categories,
      activeCategory: category || 'All'
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error loading posts');
    res.render('index', {
      title: 'Blossom Blog - Welcome',
      posts: [],
      categories: [],
      activeCategory: 'All'
    });
  }
});

// Search posts
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    let posts = [];
    
    if (q) {
      posts = await Post.find({
        published: true,
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { content: { $regex: q, $options: 'i' } },
          { tags: { $in: [new RegExp(q, 'i')] } }
        ]
      }).sort({ createdAt: -1 });
    }

    res.render('search', {
      title: 'Search Results',
      posts,
      query: q || ''
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error searching posts');
    res.redirect('/');
  }
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

// Handle contact form
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Here you would typically send an email or save to database
  console.log('Contact form submission:', { name, email, message });
  
  req.flash('success_msg', 'Thank you for your message! We\'ll get back to you soon.');
  res.redirect('/contact');
});

module.exports = router;
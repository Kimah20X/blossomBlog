const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/800x600.png'
  },
  category: {
    type: String,
    required: true,
    enum: ['Lifestyle', 'Beauty', 'Fashion', 'Wellness']
  },
  author: {
    name: {
      type: String,
      required: true,
      default: 'Elena Bloom'
    },
    avatarUrl: {
      type: String,
      default: 'https://placehold.co/100x100.png'
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Virtual for formatted date
postSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose');
const Post = require('../models/Post');
require('dotenv').config();

const samplePosts = [
  {
    title: 'Morning Rituals to Start Your Day Right',
    excerpt: 'Discover simple morning rituals that can transform your day, boost your mood, and increase productivity.',
    content: `A well-structured morning routine can set the tone for your entire day. Instead of hitting snooze and rushing out the door, consider incorporating a few mindful practices.

Start with a glass of water to rehydrate your body after hours of sleep. This simple act kickstarts your metabolism and helps flush out toxins.

Gentle stretching or a short yoga session can awaken your body and improve circulation. Even just 5-10 minutes can make a significant difference in how you feel throughout the day.

Follow this with a few minutes of meditation or journaling to clear your mind. This practice helps you set intentions for the day and approach challenges with a calm, focused mindset.

A nutritious breakfast is non-negotiable! Fuel your body with whole foods that provide sustained energy. Think oatmeal with berries, avocado toast, or a protein-rich smoothie.

These small changes can lead to a more positive and productive life. Remember, consistency is key – start with just one or two practices and gradually build your ideal morning routine.`,
    imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
    category: 'Lifestyle',
    tags: ['morning routine', 'self-care', 'productivity', 'mindfulness'],
    likes: 42
  },
  {
    title: 'The Ultimate Guide to a Glowing Skincare Routine',
    excerpt: 'Unlock the secrets to radiant skin with our step-by-step guide to building the perfect skincare routine.',
    content: `Achieving a healthy glow starts with understanding your skin type. Is it oily, dry, combination, or sensitive? Once you know, you can choose the right products for your unique needs.

A basic routine includes these essential steps:

**Cleansing**: Use a gentle cleanser twice daily to remove dirt, oil, and makeup. Avoid harsh scrubs that can irritate your skin.

**Toning**: A hydrating toner helps balance your skin's pH and prepares it for the next steps.

**Serums**: Target specific concerns with serums. Vitamin C is excellent for brightness, while hyaluronic acid provides deep hydration.

**Moisturizing**: Even oily skin needs moisture! Choose a lightweight formula for oily skin or a richer cream for dry skin.

**Sun Protection**: This is the most important step! Use SPF 30 or higher every single day, even when it's cloudy.

For an extra boost, incorporate exfoliation 2-3 times a week and a weekly face mask. Remember, consistency is key to seeing results. Give your routine at least 6-8 weeks to show its full effects.`,
    imageUrl: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
    category: 'Beauty',
    tags: ['skincare', 'beauty tips', 'glowing skin', 'routine'],
    likes: 67
  },
  {
    title: 'Sustainable Fashion: How to Build a Conscious Closet',
    excerpt: 'Embrace style that\'s kind to the planet. Learn how to curate a beautiful and sustainable wardrobe.',
    content: `Sustainable fashion is more than a trend; it's a movement towards mindful consumption and environmental responsibility.

**Start with an audit**: Go through your current wardrobe and identify what you truly love and wear regularly. This helps you understand your personal style and avoid future impulse purchases.

**Quality over quantity**: When you do shop, invest in well-made pieces that will last for years. Look for natural fibers like organic cotton, linen, and Tencel, which are better for both your skin and the environment.

**Embrace secondhand**: Thrifting and vintage shopping are fantastic ways to find unique pieces while giving clothes a second life. You'll often discover high-quality items at a fraction of their original price.

**Learn basic mending**: Simple skills like sewing on buttons, hemming pants, or patching small holes can significantly extend the life of your favorite pieces.

**Choose versatile pieces**: Build a capsule wardrobe with items that mix and match easily. A white button-down, well-fitted jeans, and a classic blazer can create countless outfits.

**Support ethical brands**: Research brands that prioritize fair labor practices and environmental sustainability. Your purchasing power can drive positive change in the fashion industry.

A conscious closet is both chic and responsible – proving that style and sustainability can go hand in hand.`,
    imageUrl: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    category: 'Fashion',
    tags: ['sustainable fashion', 'eco-friendly', 'slow fashion', 'style'],
    likes: 38
  },
  {
    title: 'Five-Minute Meditations for a Calm Mind',
    excerpt: 'Feeling stressed? These quick and easy five-minute meditations can bring a sense of peace to your busiest days.',
    content: `You don't need hours to reap the benefits of meditation. Even five minutes can make a huge difference in your mental clarity and emotional well-being.

**Basic Breathing Meditation**:
Find a quiet spot and sit comfortably with your back straight. Close your eyes and focus on your natural breath. Notice the sensation of air entering and leaving your body. When your mind wanders (and it will!), gently guide your attention back to your breath.

**Body Scan Meditation**:
Starting from your toes, bring awareness to each part of your body. Notice any tension or sensations without trying to change them. Work your way up to the top of your head, spending about 30 seconds on each area.

**Loving-Kindness Meditation**:
Begin by sending kind thoughts to yourself: "May I be happy, may I be healthy, may I be at peace." Then extend these wishes to loved ones, acquaintances, and even difficult people in your life.

**Mindful Observation**:
Choose an object in your environment – a flower, a candle flame, or even your hands. Observe it closely for five minutes, noticing colors, textures, and details you might normally overlook.

**Walking Meditation**:
If sitting still feels challenging, try walking slowly and mindfully. Focus on the sensation of your feet touching the ground and the rhythm of your movement.

These simple practices can reduce anxiety, improve focus, and help you approach challenges with greater calm and clarity.`,
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
    category: 'Wellness',
    tags: ['meditation', 'wellness', 'mental health', 'stress relief'],
    likes: 55
  },
  {
    title: 'Decorating Your Space on a Budget',
    excerpt: 'Create a beautiful and personal space without breaking the bank. Here are our top tips for affordable home decor.',
    content: `A stylish home doesn't have to be expensive. With creativity and smart shopping, you can transform your space into a beautiful sanctuary.

**Start with decluttering**: Before buying anything new, remove items that don't serve a purpose or bring you joy. A clean, organized space instantly feels more luxurious.

**Paint is your best friend**: A fresh coat of paint can dramatically change a room's atmosphere. Choose colors that reflect your personality – soft pastels for a calming vibe or bold hues for energy and drama.

**DIY art projects**: Create personalized artwork by framing beautiful fabric, pressed flowers, or your own photography. A gallery wall of meaningful images costs very little but adds huge visual impact.

**Bring in nature**: Houseplants are affordable decorators that add life, color, and improved air quality to your space. Start with low-maintenance options like pothos, snake plants, or succulents.

**Shop secondhand**: Thrift stores, flea markets, and online marketplaces are treasure troves for unique furniture and decor. Look for solid wood pieces that can be refreshed with paint or new hardware.

**Rearrange and repurpose**: Sometimes the best "new" look comes from simply moving furniture around or using items in unexpected ways. That vintage ladder could become a bookshelf, or those mason jars could hold fresh flowers.

**Invest in good lighting**: Swap harsh overhead bulbs for warm, soft lighting. String lights, candles, and table lamps create ambiance that makes any space feel cozy and inviting.

Remember, the most beautiful homes reflect the personalities of the people who live in them. Focus on surrounding yourself with things you truly love.`,
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'Lifestyle',
    tags: ['home decor', 'DIY', 'budget decorating', 'interior design'],
    likes: 73
  },
  {
    title: 'Summer Fashion Essentials You Need',
    excerpt: 'Stay cool and chic this summer with these must-have fashion pieces for your wardrobe.',
    content: `Summer fashion is all about effortless style that keeps you comfortable in the heat while looking absolutely fabulous.

**The Perfect Sundress**: A flowy sundress is the ultimate summer staple. Look for breathable fabrics like cotton or linen in prints or solid colors that make you feel confident. It's perfect for everything from beach days to dinner dates.

**Comfortable Sandals**: Invest in quality sandals that you can walk in all day. Whether you prefer flat slides, wedges, or strappy styles, choose pairs that complement multiple outfits.

**Wide-Brimmed Hat**: Not only does it look effortlessly chic, but it also protects your face and hair from harmful UV rays. Straw hats are classic, while felt options work for dressier occasions.

**Versatile Tote Bag**: A spacious tote in a neutral color can carry all your summer essentials – sunscreen, water bottle, sunglasses, and more. Look for one with interior pockets to stay organized.

**Light Layers**: Summer evenings can get cool, so pack a lightweight cardigan, denim jacket, or linen blazer. These pieces add polish to casual outfits and provide comfort in air-conditioned spaces.

**Breathable Fabrics**: Prioritize natural fibers like cotton, linen, and bamboo that allow your skin to breathe. These materials keep you cool and comfortable even on the hottest days.

**Fun Accessories**: Summer is the perfect time to experiment with colorful jewelry, silk scarves, and statement sunglasses. These small touches can transform a simple outfit into something special.

Embrace bright colors, playful prints, and relaxed silhouettes that celebrate the carefree spirit of summer!`,
    imageUrl: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    category: 'Fashion',
    tags: ['summer fashion', 'style guide', 'wardrobe essentials', 'outfits'],
    likes: 89
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blossom-blog');
    console.log('Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Insert sample posts
    await Post.insertMany(samplePosts);
    console.log('Sample posts inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
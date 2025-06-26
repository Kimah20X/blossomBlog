'use client';
import { useState } from 'react';
import { PostCard } from '@/components/post-card';
import { posts, categories } from '@/lib/data';
import type { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SparkleIcon } from '@/components/icons';

export default function Home() {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category));
    }
  };

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground/90">
          Welcome to the Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of thoughts on lifestyle, beauty, and wellness, sprinkled with a little magic.
        </p>
      </section>

      <section id="categories" className="space-y-6 scroll-mt-20">
        <div className="flex items-center justify-center gap-2">
            <SparkleIcon className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-center">Categories</h2>
            <SparkleIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={activeCategory === 'All' ? 'default' : 'outline'}
            onClick={() => filterByCategory('All')}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => filterByCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

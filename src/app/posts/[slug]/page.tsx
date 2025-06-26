'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { posts } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, Share2, CalendarDays } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PostCard } from '@/components/post-card';
import { Separator } from '@/components/ui/separator';

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find((p) => p.slug === slug);
  
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Random likes for demonstration
    setLikes(Math.floor(Math.random() * 100));
  }, []);

  if (!post) {
    notFound();
  }
  
  const recommendedPosts = posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
  const dataAiHint = `${post.category.toLowerCase()} ${post.tags?.[0]?.split(' ')[0] ?? ''}`.trim();

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <article className="space-y-8">
        <div className="space-y-4 text-center">
            <Badge variant="secondary" className="font-semibold uppercase tracking-wider">{post.category}</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="portrait person" />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                </div>
                <span className="text-sm flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {post.date}</span>
            </div>
        </div>
        
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" data-ai-hint={dataAiHint} />
        </div>

        <div className="text-lg text-foreground/90 leading-relaxed space-y-6">
            <p>{post.content}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="rounded-full px-3 py-1 capitalize">{tag}</Badge>
            ))}
        </div>

        <Separator />

        <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleLike} className="flex items-center gap-2 rounded-full">
                <Heart className={isLiked ? 'text-red-500 fill-current' : ''} /> 
                {isClient ? <span>{likes} Likes</span> : <span>...</span>}
            </Button>
            <Button variant="ghost" onClick={handleShare} className="flex items-center gap-2 rounded-full">
                <Share2 />
                <span>Share</span>
            </Button>
        </div>
      </article>

      {recommendedPosts.length > 0 && (
        <section className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-center">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPosts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

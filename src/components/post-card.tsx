import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const dataAiHint = `${post.category.toLowerCase()} ${post.tags?.[0]?.split(' ')[0] ?? ''}`.trim();
  
  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300 ease-in-out">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={dataAiHint}
          />
        </div>
        <div className="p-6 pb-2">
          <Badge variant="secondary" className="mb-2 font-semibold uppercase tracking-wider">{post.category}</Badge>
          <CardTitle className="text-xl leading-snug">
            <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/posts/${post.slug}`} className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

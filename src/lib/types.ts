export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: 'Lifestyle' | 'Beauty' | 'Fashion' | 'Wellness';
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  tags: string[];
};

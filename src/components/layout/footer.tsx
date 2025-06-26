import { Heart } from 'lucide-react';
import { FlowerIcon } from '@/components/icons';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/">
            <FlowerIcon className="h-6 w-6 text-primary" />
          </Link>
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            Built with <Heart className="inline-block h-4 w-4 text-red-400" /> by a fellow dreamer. &copy; {new Date().getFullYear()} Blossom Blog.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-primary transition-colors">Pinterest</Link>
        </div>
      </div>
    </footer>
  );
}

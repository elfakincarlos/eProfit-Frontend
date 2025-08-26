import Link from 'next/link';
import { PiggyBank } from 'lucide-react';

export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <PiggyBank className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">eProfit</span>
        </Link>
        <h1 className="text-2xl font-semibold text-muted-foreground">{title}</h1>
      </div>
    </header>
  );
}

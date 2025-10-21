'use client';

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative"
    >
      <Sun className="h-4 w-4 dark:scale-0" />
      <MoonStar className="absolute h-4 w-4 scale-0 dark:scale-100" />
    </Button>
  );
}

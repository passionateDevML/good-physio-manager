
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className={cn('flex-1 p-6 overflow-auto', className)}>
          <div className="animate-fade-in animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

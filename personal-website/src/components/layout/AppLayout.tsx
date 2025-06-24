'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  
  // 根据路径确定当前页面
  const getCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/daily-report')) return 'daily-report';
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/articles')) return 'articles';
    if (pathname.startsWith('/projects')) return 'projects';
    if (pathname.startsWith('/about')) return 'about';
    return 'home';
  };

  return (
    <>
      <Navigation currentPage={getCurrentPage()} />
      <main>{children}</main>
    </>
  );
}
import { ArticleStore, StatsStore } from '@/lib/data-store';
import HomePage from '@/components/pages/HomePage';

export default async function Home() {
  // Get featured articles and stats with fallbacks
  const featuredArticles = await ArticleStore.getFeaturedArticles(6).catch(() => []);
  const recentArticles = await ArticleStore.getRecentArticles(3, 8).catch(() => []);
  const stats = await StatsStore.getStats().catch(() => ({
    totalFeeds: 380,
    totalArticles: 0,
    analyzedArticles: 0,
    featuredArticles: 0,
    todayArticles: 0,
    totalReports: 0,
    activeFeeds: 380,
    lastUpdated: new Date().toISOString(),
  }));

  return (
    <HomePage 
      stats={stats}
      featuredArticles={featuredArticles}
      recentArticles={recentArticles}
    />
  );
}
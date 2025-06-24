import { NextResponse } from 'next/server';
import { loadAllRSSFeeds } from '@/lib/rss-parser';
import { StatsStore } from '@/lib/data-store';

export async function GET() {
  try {
    // 1. 检查RSS源
    const feeds = await loadAllRSSFeeds();
    
    // 2. 获取统计信息
    const stats = await StatsStore.getStats();
    
    // 3. 系统状态
    const status = {
      system: {
        status: 'running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
      rss: {
        totalFeeds: feeds.length,
        categories: {
          articles: feeds.filter(f => f.category === 'articles').length,
          podcasts: feeds.filter(f => f.category === 'podcasts').length,
          twitter: feeds.filter(f => f.category === 'twitter').length,
        },
        sampleFeeds: feeds.slice(0, 5).map(f => ({
          title: f.title,
          category: f.category,
          url: f.xmlUrl.substring(0, 50) + '...',
        })),
      },
      database: stats,
      features: {
        rssParser: 'active',
        aiAnalysis: process.env.OPENROUTER_API_KEY ? 'configured' : 'not-configured',
        dailyReport: 'active',
        dataStorage: 'json-files',
      },
    };
    
    return NextResponse.json(status);
    
  } catch (error) {
    console.error('Status check failed:', error);
    return NextResponse.json(
      { 
        system: { status: 'error', timestamp: new Date().toISOString() },
        error: error instanceof Error ? error.message : String(error),
        database: { totalArticles: 0, totalFeeds: 0 },
      },
      { status: 500 }
    );
  }
}
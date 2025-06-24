import { NextRequest, NextResponse } from 'next/server';
import { ArticleStore } from '@/lib/data-store';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const days = parseInt(searchParams.get('days') || '7');
    
    let articles;
    
    if (featured === 'true') {
      articles = await ArticleStore.getFeaturedArticles(limit);
    } else if (category) {
      articles = await ArticleStore.getArticlesByCategory(category, limit);
    } else {
      articles = await ArticleStore.getRecentArticles(days, limit);
    }
    
    return NextResponse.json({
      success: true,
      data: articles,
      count: articles.length,
    });
    
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: '获取文章失败' },
      { status: 500 }
    );
  }
}
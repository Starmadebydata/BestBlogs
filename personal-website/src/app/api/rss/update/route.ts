import { NextResponse } from 'next/server';
import { loadAllRSSFeeds, fetchAllArticles } from '@/lib/rss-parser';
import { analyzeArticlesBatch } from '@/lib/ai-analyzer';
import { ArticleStore, FeedStore } from '@/lib/data-store';
import { Article } from '@/types';

export async function GET() {
  try {
    console.log('开始RSS更新任务...');
    
    // 1. Load RSS feeds from OPML files
    const feeds = await loadAllRSSFeeds();
    console.log(`加载了 ${feeds.length} 个RSS源`);
    
    // 2. Save feeds to database
    await FeedStore.save(feeds);
    
    // 3. Fetch all articles (with translation enabled)
    const newArticles = await fetchAllArticles(true);
    console.log(`抓取到 ${newArticles.length} 篇新文章`);
    
    if (newArticles.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: '没有新文章需要处理',
        stats: { feeds: feeds.length, articles: 0, analyzed: 0 }
      });
    }
    
    // 4. Load existing articles to avoid duplicates
    const existingArticles = await ArticleStore.load();
    const existingUrls = new Set(existingArticles.map(a => a.url));
    const uniqueArticles = newArticles.filter(a => !existingUrls.has(a.url));
    
    console.log(`去重后剩余 ${uniqueArticles.length} 篇新文章`);
    
    if (uniqueArticles.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: '没有新的唯一文章需要处理',
        stats: { feeds: feeds.length, articles: 0, analyzed: 0 }
      });
    }
    
    // 5. AI Analysis (limit to 20 articles to avoid API costs)
    const articlesToAnalyze = uniqueArticles.slice(0, 20);
    const analysisRequests = articlesToAnalyze.map(article => ({
      title: article.title,
      content: article.description,
      url: article.url,
    }));
    
    const analysisResults = await analyzeArticlesBatch(analysisRequests);
    
    // 6. Update articles with analysis results
    const processedArticles: Article[] = [];
    
    for (let i = 0; i < articlesToAnalyze.length; i++) {
      const article = articlesToAnalyze[i];
      const analysis = analysisResults[i];
      
      if (analysis) {
        article.summary = analysis.summary;
        article.keyPoints = analysis.keyPoints;
        article.score = analysis.score;
        article.tags = analysis.tags;
        article.category = analysis.category;
        article.isAnalyzed = true;
        article.isFeatured = analysis.score >= 85;
      }
      
      processedArticles.push(article);
    }
    
    // Add remaining articles without analysis
    const remainingArticles = uniqueArticles.slice(20);
    processedArticles.push(...remainingArticles);
    
    // 7. Save all articles
    const allArticles = [...existingArticles, ...processedArticles];
    await ArticleStore.save(allArticles);
    
    // 8. Update feed timestamps
    for (const feed of feeds) {
      await FeedStore.updateLastUpdated(feed.id);
    }
    
    const stats = {
      feeds: feeds.length,
      articles: processedArticles.length,
      analyzed: processedArticles.filter(a => a.isAnalyzed).length,
      featured: processedArticles.filter(a => a.isFeatured).length,
      translated: processedArticles.filter(a => a.isTranslated).length,
    };
    
    console.log('RSS更新完成！', stats);
    
    // 9. Auto-generate daily report if we have enough analyzed articles
    let reportGenerated = false;
    if (stats.analyzed >= 3) {
      try {
        console.log('尝试自动生成今日报告...');
        const reportResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/daily-report`, {
          method: 'POST',
        });
        
        if (reportResponse.ok) {
          const reportData = await reportResponse.json();
          if (reportData.success) {
            reportGenerated = true;
            console.log('今日报告自动生成成功！');
          }
        }
      } catch (error) {
        console.error('自动生成日报失败:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `RSS更新完成${reportGenerated ? '，今日报告已自动生成' : ''}`,
      stats: {
        ...stats,
        reportGenerated,
      },
    });
    
  } catch (error) {
    console.error('RSS更新失败:', error);
    return NextResponse.json(
      { success: false, error: 'RSS更新失败', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(); // Allow both GET and POST
}
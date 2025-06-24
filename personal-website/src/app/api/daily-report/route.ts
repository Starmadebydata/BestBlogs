import { NextRequest, NextResponse } from 'next/server';
import { ReportStore, ArticleStore } from '@/lib/data-store';
import { generateDailyReportSummary } from '@/lib/ai-analyzer';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    
    if (date) {
      // Get specific date report
      const report = await ReportStore.getByDate(date);
      if (!report) {
        return NextResponse.json(
          { success: false, error: '未找到指定日期的报告' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: report });
    } else {
      // Get recent reports
      const reports = await ReportStore.getRecent(10);
      return NextResponse.json({ success: true, data: reports });
    }
    
  } catch (error) {
    console.error('Error fetching daily report:', error);
    return NextResponse.json(
      { success: false, error: '获取日报失败' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    console.log('开始生成今日报告...');
    
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Check if report already exists
    const existingReport = await ReportStore.getByDate(today);
    if (existingReport) {
      return NextResponse.json({
        success: true,
        message: '今日报告已存在',
        data: existingReport,
      });
    }
    
    // Get today's articles
    const recentArticles = await ArticleStore.getRecentArticles(1, 200);
    const todayArticles = recentArticles.filter(article => {
      const articleDate = new Date(article.publishedAt).toISOString().split('T')[0];
      return articleDate === today;
    });
    
    // Get top articles with priority for analyzed ones
    const analyzedArticles = todayArticles.filter(article => article.isAnalyzed && article.score && article.score >= 70);
    const otherArticles = todayArticles.filter(article => !article.isAnalyzed || !article.score || article.score < 70);
    
    const topArticles = [
      ...analyzedArticles.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 8),
      ...otherArticles.slice(0, 2)
    ].slice(0, 10);
    
    if (topArticles.length === 0) {
      return NextResponse.json({
        success: false,
        message: '今日没有足够的文章生成报告',
      });
    }
    
    // Generate AI summary
    const aiSummary = await generateDailyReportSummary(topArticles);
    
    // Create report
    const report = {
      id: `report-${today}`,
      date: today,
      title: `WindFlash 技术日报 - ${new Date(today).toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`,
      summary: aiSummary,
      topArticles,
      articleCount: todayArticles.length,
      analyzedCount: analyzedArticles.length,
      translatedCount: todayArticles.filter(a => a.isTranslated).length,
      createdAt: new Date(),
    };
    
    await ReportStore.add(report);
    
    console.log('今日报告生成完成！');
    
    return NextResponse.json({
      success: true,
      message: '今日报告生成成功',
      data: report,
    });
    
  } catch (error) {
    console.error('Error generating daily report:', error);
    return NextResponse.json(
      { success: false, error: '生成日报失败', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
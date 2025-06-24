import { NextRequest, NextResponse } from 'next/server';
import { ReportStore, ArticleStore } from '@/lib/data-store';
import { DailyReportGenerator } from '@/lib/daily-report-generator';

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
    console.log('开始生成今日智能报告...');
    
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
    
    // Get recent articles (last 2 days to ensure sufficient content)
    const recentArticles = await ArticleStore.getRecentArticles(2, 500);
    const todayArticles = recentArticles.filter(article => {
      const articleDate = new Date(article.publishedAt).toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      // Include today's and yesterday's articles for better content
      return articleDate === today || articleDate === yesterdayStr;
    });
    
    if (todayArticles.length === 0) {
      return NextResponse.json({
        success: false,
        message: '今日没有足够的文章生成报告',
      });
    }
    
    // Generate enhanced daily report using new generator
    const generator = new DailyReportGenerator();
    const report = await generator.generateDailyReport(todayArticles, today);
    
    await ReportStore.add(report);
    
    console.log(`今日智能报告生成完成！包含 ${report.sections.length} 个分类，${report.totalArticles} 篇文章`);
    
    return NextResponse.json({
      success: true,
      message: '今日智能报告生成成功',
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
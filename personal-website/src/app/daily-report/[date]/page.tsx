import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ReportStore } from '@/lib/data-store';
import EnhancedDailyReport from '@/components/ui/EnhancedDailyReport';

interface DailyReportPageProps {
  params: Promise<{
    date: string;
  }>;
}

export default async function DailyReportDetailPage({ params }: DailyReportPageProps) {
  const { date } = await params;
  
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    notFound();
  }
  
  try {
    const report = await ReportStore.getByDate(date);
    
    if (!report) {
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/daily-report"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← 返回日报列表
            </Link>
          </div>
          
          {/* Report Content */}
          <EnhancedDailyReport report={report} />
          
          {/* Related Navigation */}
          <div className="mt-12 flex justify-center space-x-4">
            <Link
              href="/articles"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              浏览所有文章
            </Link>
            <Link
              href="/daily-report"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              查看其他日报
            </Link>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

// Use dynamic rendering instead of static generation to avoid build-time errors
export const dynamic = 'force-dynamic';

// Dynamic metadata generation
export async function generateMetadata({ params }: DailyReportPageProps) {
  const { date } = await params;
  
  try {
    const report = await ReportStore.getByDate(date);
    
    if (!report) {
      return {
        title: '日报未找到 - WindFlash AI Daily',
        description: '抱歉，未找到指定日期的技术日报。',
      };
    }
    
    return {
      title: `${report.title} - WindFlash AI Daily`,
      description: report.summary,
      openGraph: {
        title: report.title,
        description: report.summary,
        type: 'article',
        publishedTime: report.createdAt.toISOString(),
      },
    };
  } catch {
    return {
      title: '技术日报 - WindFlash AI Daily',
      description: '每日精选最有价值的技术资讯，AI智能分析和评分',
    };
  }
}
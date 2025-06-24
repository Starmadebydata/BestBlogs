import Link from 'next/link';
import { ReportStore } from '@/lib/data-store';
import DateDisplay from '@/components/ui/DateDisplay';
import EnhancedDailyReport from '@/components/ui/EnhancedDailyReport';
import { DailyReport } from '@/types';

export default async function DailyReportPage() {
  const recentReports = await ReportStore.getRecent(10).catch(() => []);
  const today = new Date().toISOString().split('T')[0];
  const todayReport = await ReportStore.getByDate(today).catch(() => null);
  
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">技术日报</h1>
          <p className="text-xl text-gray-600">
            每日精选最有价值的技术资讯，AI智能分析和评分
          </p>
        </div>

        {/* Today's Report */}
        {todayReport ? (
          <div className="mb-12">
            <EnhancedDailyReport report={todayReport} isToday={true} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">今日智能报告尚未生成</h3>
            <p className="text-gray-600 mb-4">
              系统会在有足够优质文章时自动生成智能分类日报，包含AI最新动态、Vibe Coding、AI自媒体等精彩内容。
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              浏览所有文章
            </Link>
          </div>
        )}

        {/* Historical Reports */}
        {recentReports.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">历史日报</h2>
            <div className="space-y-6">
              {recentReports.map((report) => (
                <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {report.title}
                    </h3>
                    <DateDisplay date={report.date} format="long" className="text-sm text-gray-500" />
                  </div>
                  
                  <p className="text-gray-600 mb-4">{report.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>
                        {report.sections?.length || 0} 个分类
                      </span>
                      <span>
                        {report.totalArticles || (report as DailyReport & { articleCount?: number }).articleCount || 0} 篇总计
                      </span>
                    </div>
                    <Link
                      href={`/daily-report/${report.date}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      查看详情 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-4">获取最新技术资讯</h3>
          <p className="text-blue-100 mb-6">
            每日智能分析380个优质RSS源，为您筛选最有价值的技术内容
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              浏览所有文章
            </Link>
            <Link
              href="/api/rss/update"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
            >
              更新RSS源
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
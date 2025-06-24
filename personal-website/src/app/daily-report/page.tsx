import Link from 'next/link';
import { ReportStore } from '@/lib/data-store';
import DateDisplay from '@/components/ui/DateDisplay';

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
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {todayReport.title}
              </h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                今日最新
              </span>
            </div>
            
            <div className="text-gray-600 mb-6">
              <p className="text-lg leading-relaxed">{todayReport.summary}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{todayReport.topArticles.length}</div>
                <div className="text-sm text-gray-600">精选文章</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{todayReport.articleCount}</div>
                <div className="text-sm text-gray-600">总文章数</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{todayReport.analyzedCount || 0}</div>
                <div className="text-sm text-gray-600">AI分析</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{todayReport.translatedCount || 0}</div>
                <div className="text-sm text-gray-600">中文翻译</div>
              </div>
            </div>

            {/* Top Articles */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">今日精选文章</h3>
              <div className="space-y-4">
                {todayReport.topArticles.map((article, index) => (
                  <div key={article.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {article.category}
                          </span>
                          {article.score && (
                            <span className="text-sm text-gray-500">{article.score}分</span>
                          )}
                          {article.isTranslated && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              中译
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                            {article.title}
                          </a>
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {article.summary}
                        </p>
                        <div className="text-xs text-gray-500">
                          来源：{article.feedTitle} • <DateDisplay date={article.publishedAt} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">今日报告尚未生成</h3>
            <p className="text-gray-600 mb-4">
              系统会在有足够优质文章时自动生成日报，请稍后再来查看。
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
                      <span>{report.topArticles.length} 篇精选</span>
                      <span>{report.articleCount} 篇总计</span>
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
'use client';

import DateDisplay from './DateDisplay';
import { DailyReport, DailyReportSection } from '@/types';

interface EnhancedDailyReportProps {
  report: DailyReport;
  isToday?: boolean;
}

export default function EnhancedDailyReport({ report, isToday = false }: EnhancedDailyReportProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{report.title}</h2>
          {isToday && (
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
              今日最新
            </span>
          )}
        </div>
        
        <p className="text-white/90 text-lg leading-relaxed mb-4">
          {report.summary}
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{report.sections.length}</div>
            <div className="text-sm text-white/80">分类领域</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{report.totalArticles}</div>
            <div className="text-sm text-white/80">总文章数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{report.analyzedCount || 0}</div>
            <div className="text-sm text-white/80">AI分析</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{report.translatedCount || 0}</div>
            <div className="text-sm text-white/80">中文翻译</div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="p-6 space-y-8">
        {report.sections.map((section, index) => (
          <ReportSection key={section.category} section={section} index={index} />
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 border-t">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>生成时间: <DateDisplay date={report.createdAt} /></span>
            {report.generationTime && (
              <span>耗时: {Math.round(report.generationTime / 1000)}秒</span>
            )}
          </div>
          <div className="text-xs">
            WindFlash AI Daily - 智能技术资讯
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReportSectionProps {
  section: DailyReportSection;
  index: number;
}

function ReportSection({ section, index }: ReportSectionProps) {
  const sectionColors = [
    'border-blue-500 bg-blue-50',
    'border-green-500 bg-green-50', 
    'border-purple-500 bg-purple-50',
    'border-orange-500 bg-orange-50',
    'border-red-500 bg-red-50',
    'border-indigo-500 bg-indigo-50',
    'border-pink-500 bg-pink-50',
    'border-yellow-500 bg-yellow-50',
    'border-teal-500 bg-teal-50',
    'border-gray-500 bg-gray-50',
  ];
  
  const colorClass = sectionColors[index % sectionColors.length];

  return (
    <div className={`border-l-4 ${colorClass} p-6 rounded-r-lg`}>
      {/* Section Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {section.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {section.description}
        </p>
        
        {/* Trend Analysis */}
        {section.trendAnalysis && (
          <div className="bg-white p-3 rounded-lg border-l-2 border-blue-300 mb-4">
            <h4 className="font-semibold text-gray-900 text-sm mb-1">📊 趋势分析</h4>
            <p className="text-gray-700 text-sm">{section.trendAnalysis}</p>
          </div>
        )}
        
        {/* Highlights */}
        {section.highlights.length > 0 && (
          <div className="bg-white p-3 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">✨ 重点关注</h4>
            <ul className="space-y-1">
              {section.highlights.map((highlight, idx) => (
                <li key={idx} className="text-gray-700 text-sm flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Articles */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">📚 精选文章 ({section.articles.length}篇)</h4>
        {section.articles.map((article, articleIndex) => (
          <div key={article.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    #{articleIndex + 1}
                  </span>
                  {article.score && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {article.score}分
                    </span>
                  )}
                  {article.isTranslated && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      中译
                    </span>
                  )}
                  {article.language && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {article.language === 'zh' ? '中文' : 'English'}
                    </span>
                  )}
                </div>
                
                <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </a>
                </h5>
                
                {article.summary && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {article.summary}
                  </p>
                )}
                
                {/* Key Points */}
                {article.keyPoints && article.keyPoints.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {article.keyPoints.slice(0, 3).map((point, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 4).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>来源：{article.feedTitle}</span>
                  <DateDisplay date={article.publishedAt} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
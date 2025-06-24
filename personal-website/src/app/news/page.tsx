import Link from 'next/link';
import { ArticleStore } from '@/lib/data-store';
import DateDisplay from '@/components/ui/DateDisplay';
import { Article } from '@/types';

interface SearchParams {
  category?: string;
  featured?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function NewsPage({
  searchParams
}: PageProps) {
  const params = await searchParams;
  const category = params.category;
  const featured = params.featured === 'true';
  const page = parseInt(params.page || '1');
  const limit = 20;

  let articles: Article[] = [];
  let title = '所有文章';
  
  try {
    if (featured) {
      articles = await ArticleStore.getFeaturedArticles(limit);
      title = '精选文章';
    } else if (category) {
      articles = await ArticleStore.getArticlesByCategory(category, limit);
      title = `${category} 类文章`;
    } else {
      articles = await ArticleStore.getRecentArticles(7, limit);
      title = '最新文章';
    }
  } catch {
    articles = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600">
            基于AI智能分析的技术文章精选
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/news"
              className={`px-4 py-2 rounded-lg transition-colors ${
                !category && !featured 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全部
            </Link>
            <Link
              href="/news?featured=true"
              className={`px-4 py-2 rounded-lg transition-colors ${
                featured 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              精选文章
            </Link>
            <Link
              href="/news?category=AI"
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === 'AI' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              人工智能
            </Link>
            <Link
              href="/news?category=编程"
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === '编程' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              编程开发
            </Link>
            <Link
              href="/news?category=产品"
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === '产品' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              产品设计
            </Link>
            <Link
              href="/news?category=商业"
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === '商业' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              商业科技
            </Link>
          </div>
        </div>

        {/* Articles List */}
        {articles && articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Article Meta */}
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {article.category || 'Tech'}
                      </span>
                      {article.score && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                          {article.score}分
                        </span>
                      )}
                      {article.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
                          精选
                        </span>
                      )}
                      <DateDisplay date={article.publishedAt} className="text-sm text-gray-500" />
                    </div>

                    {/* Article Title */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 transition-colors"
                      >
                        {article.title}
                      </a>
                    </h2>

                    {/* Article Summary */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.summary || article.description.slice(0, 300)}...
                    </p>

                    {/* Key Points */}
                    {article.keyPoints && article.keyPoints.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">关键要点：</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {article.keyPoints.slice(0, 3).map((point: string, index: number) => (
                            <li key={`${article.id}-keypoint-${index}`}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span 
                              key={`${article.id}-tag-${index}`} 
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Article Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <span>来源：{article.feedTitle}</span>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        阅读原文 →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无文章</h3>
            <p className="text-gray-600 mb-4">
              系统尚未抓取文章，请先更新RSS源。
            </p>
            <Link
              href="/api/rss/update"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              更新RSS源
            </Link>
          </div>
        )}

        {/* Load More */}
        {articles && articles.length >= limit && (
          <div className="text-center mt-12">
            <Link
              href={`/news?${new URLSearchParams({ 
                ...(category && { category }), 
                ...(featured && { featured: 'true' }), 
                page: (page + 1).toString() 
              })}`}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              加载更多
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">关于 WindFlash AI Daily</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            基于AI技术，为创业者和技术从业者精选最有价值的技术资讯
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">我们的使命</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              在信息爆炸的时代，获取高质量的技术资讯变得越来越困难。作为AI创业者和技术从业者，
              我们每天都需要跟上快速发展的技术趋势，但时间和精力却越来越有限。
            </p>
            <p className="mb-4">
              WindFlash AI Daily旨在解决这个问题。我们利用先进的AI技术，从380个优质RSS源中智能筛选、
              分析和推荐最有价值的技术文章，帮助您在最短的时间内掌握最重要的技术动态。
            </p>
            <p>
              无论您是AI创业者、技术架构师、产品经理还是技术爱好者，
              我们都希望通过这个平台为您提供最精准、最有价值的技术资讯。
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">AI智能分析</h3>
            </div>
            <p className="text-gray-600">
              利用GPT-4等先进的大语言模型，对每篇文章进行深度分析，生成摘要、提取关键点、
              评估质量并进行智能分类，确保您获得的都是高价值内容。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">优质RSS源</h3>
            </div>
            <p className="text-gray-600">
              精心挑选的380个RSS源，涵盖顶级科技公司博客、知名技术专家、
              开源项目动态和前沿研究机构，确保信息来源的权威性和前瞻性。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">每日更新</h3>
            </div>
            <p className="text-gray-600">
              系统每日自动抓取和分析最新的技术文章，生成精选日报，
              让您无需手动筛选即可获得最新、最重要的技术动态。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">智能分类</h3>
            </div>
            <p className="text-gray-600">
              自动将文章分类到AI、编程、产品、商业等不同领域，
              并提供标签和评分，帮助您快速找到感兴趣的内容。
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">技术实现</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">数据来源</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 207个技术文章RSS源</li>
                <li>• 37个技术播客RSS源</li>
                <li>• 157个技术专家Twitter源</li>
                <li>• 涵盖Google、Meta、AWS等顶级公司</li>
                <li>• 包含阮一峰、Martin Fowler等知名专家</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">技术栈</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 14 + TypeScript (前端)</li>
                <li>• OpenAI GPT-4 (AI分析)</li>
                <li>• RSS Parser + Cheerio (内容抓取)</li>
                <li>• Tailwind CSS (界面设计)</li>
                <li>• JSON文件存储 (轻量级数据库)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Open Source */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">开源项目</h2>
            <p className="text-gray-600 mb-6">
              本项目基于开源的 BestBlogs 项目构建，并在此基础上开发了个人化的日报系统。
              我们相信开源的力量，也希望这个项目能够帮助到更多的技术从业者。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/ginobefun/BestBlogs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                查看原始项目
              </a>
              <Link
                href="/daily-report"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                体验日报功能
              </Link>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">联系我们</h2>
          <p className="text-gray-600 mb-6">
            如果您有任何建议、反馈或者想要推荐优质的RSS源，欢迎与我们联系。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始阅读
            </Link>
            <Link
              href="/api/rss/update"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              更新RSS源
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
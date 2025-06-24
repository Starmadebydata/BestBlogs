import { Article, DailyReport, DailyReportSection, ArticleCategory } from '@/types';

/**
 * Enhanced Daily Report Generator based on BestBlogs.dev approach
 */
export class DailyReportGenerator {
  private apiKey: string;
  private modelId: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    this.modelId = process.env.OPENROUTER_MODEL_ID || 'google/gemini-2.5-flash-lite-preview-06-17';
  }

  /**
   * Generate comprehensive daily report with category-based sections
   */
  async generateDailyReport(articles: Article[], date: string): Promise<DailyReport> {
    const startTime = Date.now();
    
    // Filter and sort articles
    const qualityArticles = articles
      .filter(a => a.score && a.score >= 70)
      .sort((a, b) => (b.score || 0) - (a.score || 0));

    // Group articles by category
    const categoryGroups = this.groupArticlesByCategory(qualityArticles);
    
    // Generate sections for each category
    const sections: DailyReportSection[] = [];
    
    for (const [category, categoryArticles] of Object.entries(categoryGroups)) {
      if (categoryArticles.length > 0) {
        const section = await this.generateCategorySection(
          category as ArticleCategory, 
          categoryArticles
        );
        if (section) {
          sections.push(section);
        }
      }
    }

    // Generate overall summary
    const overallSummary = await this.generateOverallSummary(sections, qualityArticles);
    
    const report: DailyReport = {
      id: `daily-${date}`,
      date,
      title: `WindFlash AI Daily - ${this.formatDate(date)}`,
      summary: overallSummary,
      sections,
      totalArticles: articles.length,
      analyzedCount: articles.filter(a => a.isAnalyzed).length,
      translatedCount: articles.filter(a => a.isTranslated).length,
      createdAt: new Date(),
      generationTime: Date.now() - startTime,
    };

    return report;
  }

  /**
   * Group articles by category
   */
  private groupArticlesByCategory(articles: Article[]): Record<string, Article[]> {
    const groups: Record<string, Article[]> = {};
    
    const categories: ArticleCategory[] = [
      'AI最新动态',
      'Vibe Coding', 
      'AI自媒体',
      '编程技术',
      '产品设计',
      '商业科技',
      '创业投资',
      '开发工具',
      '行业洞察',
      '技术教程'
    ];

    // Initialize groups
    categories.forEach(cat => {
      groups[cat] = [];
    });

    // Group articles
    articles.forEach(article => {
      const category = article.category as ArticleCategory;
      if (groups[category]) {
        groups[category].push(article);
      } else {
        // Default category for unmatched articles
        groups['行业洞察'].push(article);
      }
    });

    return groups;
  }

  /**
   * Generate section for specific category
   */
  private async generateCategorySection(
    category: ArticleCategory, 
    articles: Article[]
  ): Promise<DailyReportSection | null> {
    if (articles.length === 0) return null;

    // Take top articles (max 5 per section)
    const topArticles = articles.slice(0, 5);
    
    // Generate section analysis
    const analysis = await this.analyzeCategorySection(category, topArticles);
    
    return {
      category,
      title: this.getCategoryTitle(category),
      description: this.getCategoryDescription(category),
      articles: topArticles,
      highlights: analysis.highlights,
      trendAnalysis: analysis.trendAnalysis,
    };
  }

  /**
   * Analyze category section using AI
   */
  private async analyzeCategorySection(category: ArticleCategory, articles: Article[]): Promise<{
    highlights: string[];
    trendAnalysis: string;
  }> {
    if (!this.apiKey) {
      return {
        highlights: articles.slice(0, 3).map(a => a.title),
        trendAnalysis: `今日${category}领域有${articles.length}篇优质文章值得关注。`,
      };
    }

    const articleSummaries = articles.map(a => 
      `《${a.title}》(${a.score}分) - ${a.summary}`
    ).join('\n');

    const prompt = `Analyze the following articles in the "${category}" category and provide insights:

Articles:
${articleSummaries}

Please provide analysis in JSON format:
{
  "highlights": ["3-5 key highlights or trends from these articles"],
  "trendAnalysis": "Brief analysis of trends and patterns in this category (50-80 words in Chinese)"
}

Focus on:
1. Common themes and trends
2. Breakthrough developments
3. Practical implications
4. Future directions

Return only valid JSON format.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelId,
          messages: [
            {
              role: 'system',
              content: 'You are a tech industry analyst specializing in daily trend analysis.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 300,
          temperature: 0.4,
        }),
      });

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      const result = JSON.parse(content);

      return {
        highlights: result.highlights || [],
        trendAnalysis: result.trendAnalysis || `今日${category}领域有${articles.length}篇优质文章值得关注。`,
      };
    } catch (error) {
      console.error(`Error analyzing category ${category}:`, error);
      return {
        highlights: articles.slice(0, 3).map(a => a.title),
        trendAnalysis: `今日${category}领域有${articles.length}篇优质文章值得关注。`,
      };
    }
  }

  /**
   * Generate overall daily summary
   */
  private async generateOverallSummary(sections: DailyReportSection[], articles: Article[]): Promise<string> {
    if (!this.apiKey) {
      return `今日技术资讯精选，涵盖${sections.length}个重要领域，共收录${articles.length}篇优质文章。`;
    }

    const sectionSummaries = sections.map(s => 
      `${s.category}(${s.articles.length}篇): ${s.trendAnalysis}`
    ).join('\n');

    const prompt = `Generate a compelling daily summary based on today's tech articles across different categories:

Category Analysis:
${sectionSummaries}

Total Articles: ${articles.length}
Quality Articles: ${articles.filter(a => a.score && a.score >= 80).length}

Requirements:
1. 100-120 words in Chinese
2. Highlight the most significant trends and developments
3. Engaging tone suitable for tech professionals and entrepreneurs
4. Focus on actionable insights and future implications

Return only the summary text without additional formatting.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelId,
          messages: [
            {
              role: 'system',
              content: 'You are a professional tech journalist writing daily industry summaries.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 200,
          temperature: 0.6,
        }),
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || `今日技术资讯精选，涵盖${sections.length}个重要领域，共收录${articles.length}篇优质文章。`;
    } catch (error) {
      console.error('Error generating overall summary:', error);
      return `今日技术资讯精选，涵盖${sections.length}个重要领域，共收录${articles.length}篇优质文章。`;
    }
  }

  /**
   * Get category display title
   */
  private getCategoryTitle(category: ArticleCategory): string {
    const titles: Record<ArticleCategory, string> = {
      'AI最新动态': '🤖 AI最新动态',
      'Vibe Coding': '💻 Vibe Coding',
      'AI自媒体': '📱 AI自媒体',
      '编程技术': '🛠️ 编程技术',
      '产品设计': '🎨 产品设计',
      '商业科技': '💼 商业科技',
      '创业投资': '🚀 创业投资',
      '开发工具': '🔧 开发工具',
      '行业洞察': '📊 行业洞察',
      '技术教程': '📚 技术教程',
    };
    return titles[category];
  }

  /**
   * Get category description
   */
  private getCategoryDescription(category: ArticleCategory): string {
    const descriptions: Record<ArticleCategory, string> = {
      'AI最新动态': '最新的AI模型发布、研究突破和行业动向',
      'Vibe Coding': '有趣的编程文化、开发者生活方式和酷炫技术内容',
      'AI自媒体': 'AI在内容创作、社交媒体和数字营销领域的应用',
      '编程技术': '编程技巧、框架应用和语言特性深度解析',
      '产品设计': '产品设计理念、用户体验和设计系统最佳实践',
      '商业科技': '企业技术解决方案和商业创新模式',
      '创业投资': '创业公司动态、投资趋势和商业机会分析',
      '开发工具': '提升开发效率的工具、IDE和生产力解决方案',
      '行业洞察': '科技行业趋势分析、市场动态和前沿观点',
      '技术教程': '实用的技术教程、操作指南和学习资源',
    };
    return descriptions[category];
  }

  /**
   * Format date for display
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }
}
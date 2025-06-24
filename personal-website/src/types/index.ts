// RSS Feed Types
export interface RSSFeed {
  id: string;
  title: string;
  xmlUrl: string;
  category: 'articles' | 'podcasts' | 'twitter';
  isActive: boolean;
  lastUpdated?: Date;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  url: string;
  description: string;
  content?: string;
  publishedAt: Date;
  author?: string;
  feedId: string;
  feedTitle: string;
  
  // Translation
  isTranslated?: boolean;
  originalTitle?: string;
  originalDescription?: string;
  
  // AI Analysis Results
  summary?: string;
  keyPoints?: string[];
  score?: number;
  tags?: string[];
  category?: string;
  language: 'zh' | 'en';
  
  // Status
  isAnalyzed: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Enhanced Categories for Daily Report
export type ArticleCategory = 
  | 'AI最新动态'      // AI latest developments
  | 'Vibe Coding'     // Cool programming & tech culture
  | 'AI自媒体'        // AI media & content creation  
  | '编程技术'        // Programming techniques
  | '产品设计'        // Product design
  | '商业科技'        // Business technology
  | '创业投资'        // Startup & investment
  | '开发工具'        // Development tools
  | '行业洞察'        // Industry insights
  | '技术教程';       // Technical tutorials

// Daily Report Types
export interface DailyReport {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  summary: string;
  
  // Category-based sections
  sections: DailyReportSection[];
  
  // Statistics
  totalArticles: number;
  analyzedCount?: number;
  translatedCount?: number;
  
  // Metadata
  createdAt: Date;
  generationTime?: number; // milliseconds
}

export interface DailyReportSection {
  category: ArticleCategory;
  title: string;
  description: string;
  articles: Article[];
  highlights: string[];
  trendAnalysis?: string;
}

// User Subscription Types
export interface Subscription {
  id: string;
  email: string;
  isActive: boolean;
  categories: string[];
  createdAt: Date;
}

// AI Analysis Types
export interface AIAnalysisRequest {
  title: string;
  content: string;
  url: string;
}

export interface AIAnalysisResponse {
  summary: string;
  keyPoints: string[];
  score: number;
  tags: string[];
  category: ArticleCategory;
  language: 'zh' | 'en';
  highlights?: string[];
}
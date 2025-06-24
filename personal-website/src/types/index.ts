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

// Daily Report Types
export interface DailyReport {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  summary: string;
  topArticles: Article[];
  articleCount: number;
  analyzedCount?: number;
  translatedCount?: number;
  createdAt: Date;
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
  category: string;
  language: 'zh' | 'en';
}
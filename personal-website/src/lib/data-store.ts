import fs from 'fs';
import path from 'path';
import { Article, DailyReport, RSSFeed } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Generic JSON file storage operations
 */
class JSONStore<T> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(DATA_DIR, fileName);
  }

  async load(): Promise<T[]> {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading ${this.filePath}:`, error);
      return [];
    }
  }

  async save(data: T[]): Promise<void> {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error saving ${this.filePath}:`, error);
    }
  }

  async append(item: T): Promise<void> {
    const data = await this.load();
    data.push(item);
    await this.save(data);
  }

  async update(predicate: (item: T) => boolean, updater: (item: T) => T): Promise<void> {
    const data = await this.load();
    const updatedData = data.map(item => predicate(item) ? updater(item) : item);
    await this.save(updatedData);
  }
}

// Store instances
const articlesStore = new JSONStore<Article>('articles.json');
const reportsStore = new JSONStore<DailyReport>('daily-reports.json');
const feedsStore = new JSONStore<RSSFeed>('feeds.json');

/**
 * Article operations
 */
export class ArticleStore {
  static async save(articles: Article[]): Promise<void> {
    await articlesStore.save(articles);
  }

  static async load(): Promise<Article[]> {
    return await articlesStore.load();
  }

  static async add(article: Article): Promise<void> {
    await articlesStore.append(article);
  }

  static async update(articleId: string, updates: Partial<Article>): Promise<void> {
    await articlesStore.update(
      (article) => article.id === articleId,
      (article) => ({ ...article, ...updates, updatedAt: new Date() })
    );
  }

  static async getTodayArticles(): Promise<Article[]> {
    const articles = await this.load();
    const today = new Date().toISOString().split('T')[0];
    return articles.filter(article => 
      article.publishedAt.toString().split('T')[0] === today
    );
  }

  static async getFeaturedArticles(limit: number = 10): Promise<Article[]> {
    const articles = await this.load();
    return articles
      .filter(article => article.isFeatured)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, limit);
  }

  static async getTopArticles(limit: number = 20): Promise<Article[]> {
    const articles = await this.load();
    return articles
      .filter(article => article.isAnalyzed && article.score && article.score >= 75)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, limit);
  }

  static async getArticlesByCategory(category: string, limit: number = 10): Promise<Article[]> {
    const articles = await this.load();
    return articles
      .filter(article => article.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  static async getRecentArticles(days: number = 7, limit: number = 50): Promise<Article[]> {
    const articles = await this.load();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return articles
      .filter(article => new Date(article.publishedAt) >= cutoffDate)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }
}

/**
 * Daily Report operations
 */
export class ReportStore {
  static async save(reports: DailyReport[]): Promise<void> {
    await reportsStore.save(reports);
  }

  static async load(): Promise<DailyReport[]> {
    return await reportsStore.load();
  }

  static async add(report: DailyReport): Promise<void> {
    await reportsStore.append(report);
  }

  static async getByDate(date: string): Promise<DailyReport | null> {
    const reports = await this.load();
    return reports.find(report => report.date === date) || null;
  }

  static async getRecent(limit: number = 10): Promise<DailyReport[]> {
    const reports = await this.load();
    return reports
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

}

/**
 * RSS Feed operations
 */
export class FeedStore {
  static async save(feeds: RSSFeed[]): Promise<void> {
    await feedsStore.save(feeds);
  }

  static async load(): Promise<RSSFeed[]> {
    return await feedsStore.load();
  }

  static async getActive(): Promise<RSSFeed[]> {
    const feeds = await this.load();
    return feeds.filter(feed => feed.isActive);
  }

  static async updateLastUpdated(feedId: string): Promise<void> {
    await feedsStore.update(
      (feed) => feed.id === feedId,
      (feed) => ({ ...feed, lastUpdated: new Date() })
    );
  }
}

/**
 * Database statistics
 */
export class StatsStore {
  static async getStats() {
    const articles = await ArticleStore.load();
    const reports = await ReportStore.load();
    const feeds = await FeedStore.load();

    const today = new Date().toISOString().split('T')[0];
    const todayArticles = articles.filter(article => 
      article.publishedAt.toString().split('T')[0] === today
    );

    return {
      totalArticles: articles.length,
      todayArticles: todayArticles.length,
      analyzedArticles: articles.filter(a => a.isAnalyzed).length,
      featuredArticles: articles.filter(a => a.isFeatured).length,
      totalReports: reports.length,
      totalFeeds: feeds.length,
      activeFeeds: feeds.filter(f => f.isActive).length,
      lastUpdated: new Date().toISOString(),
    };
  }
}
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { RSSFeed, Article } from '@/types';
import { translateArticleToChinese, needsTranslation } from './translator';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'AI-Daily-Report/1.0',
  },
});

/**
 * Parse OPML file to extract RSS feeds
 */
export async function parseOPMLFile(filePath: string): Promise<RSSFeed[]> {
  try {
    const opmlContent = fs.readFileSync(filePath, 'utf-8');
    const feeds: RSSFeed[] = [];
    
    // Simple regex to extract outline elements
    const outlineRegex = /<outline[^>]*text="([^"]*)"[^>]*xmlUrl="([^"]*)"[^>]*\/>/g;
    let match;
    
    while ((match = outlineRegex.exec(opmlContent)) !== null) {
      const [, title, xmlUrl] = match;
      if (title && xmlUrl) {
        feeds.push({
          id: Buffer.from(xmlUrl).toString('base64'),
          title: title.trim(),
          xmlUrl: xmlUrl.trim(),
          category: getCategoryFromFilePath(filePath),
          isActive: true,
        });
      }
    }
    
    return feeds;
  } catch (error) {
    console.error(`Error parsing OPML file ${filePath}:`, error);
    return [];
  }
}

/**
 * Load all RSS feeds from OPML files
 */
export async function loadAllRSSFeeds(): Promise<RSSFeed[]> {
  const publicDir = path.join(process.cwd(), 'public');
  const opmlFiles = [
    'BestBlogs_RSS_Articles.opml',
    'BestBlogs_RSS_Podcasts.opml', 
    'BestBlogs_RSS_Twitters.opml'
  ];
  
  const allFeeds: RSSFeed[] = [];
  
  for (const file of opmlFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      const feeds = await parseOPMLFile(filePath);
      allFeeds.push(...feeds);
    }
  }
  
  return allFeeds;
}

/**
 * Fetch articles from a single RSS feed
 */
export async function fetchFeedArticles(feed: RSSFeed, enableTranslation: boolean = true): Promise<Article[]> {
  try {
    const rssFeed = await parser.parseURL(feed.xmlUrl);
    const articles: Article[] = [];
    
    for (const item of rssFeed.items.slice(0, 10)) { // Limit to 10 recent articles
      if (!item.title || !item.link) continue;
      
      let title = item.title;
      let description = item.contentSnippet || item.content || '';
      let isTranslated = false;
      
      // Translate content to Chinese if needed and enabled
      if (enableTranslation) {
        const needsTitleTranslation = needsTranslation(title, 'zh');
        const needsDescTranslation = needsTranslation(description, 'zh');
        
        if (needsTitleTranslation || needsDescTranslation) {
          const translationResult = await translateArticleToChinese({
            title,
            content: description,
          });
          
          if (translationResult) {
            title = translationResult.title;
            description = translationResult.content;
            isTranslated = translationResult.isTranslated;
          }
        }
      }
      
      const article: Article = {
        id: Buffer.from(item.link).toString('base64'),
        title,
        url: item.link,
        description,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        author: item.creator || item.author,
        feedId: feed.id,
        feedTitle: feed.title,
        language: isTranslated ? 'zh' : detectLanguage(item.title + ' ' + (item.contentSnippet || '')),
        isAnalyzed: false,
        isFeatured: false,
        isTranslated,
        originalTitle: isTranslated ? item.title : undefined,
        originalDescription: isTranslated ? (item.contentSnippet || item.content || '') : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      articles.push(article);
    }
    
    return articles;
  } catch (error) {
    console.error(`Error fetching feed ${feed.title}:`, error);
    return [];
  }
}

/**
 * Detect language of text (simple heuristic)
 */
function detectLanguage(text: string): 'zh' | 'en' {
  const chineseRegex = /[\u4e00-\u9fff]/;
  return chineseRegex.test(text) ? 'zh' : 'en';
}

/**
 * Get category from OPML file path
 */
function getCategoryFromFilePath(filePath: string): 'articles' | 'podcasts' | 'twitter' {
  if (filePath.includes('Articles')) return 'articles';
  if (filePath.includes('Podcasts')) return 'podcasts';
  if (filePath.includes('Twitters')) return 'twitter';
  return 'articles';
}

/**
 * Fetch all articles from all active feeds
 */
export async function fetchAllArticles(enableTranslation: boolean = true): Promise<Article[]> {
  const feeds = await loadAllRSSFeeds();
  const allArticles: Article[] = [];
  
  console.log(`开始抓取 ${feeds.length} 个RSS源${enableTranslation ? '（包含翻译）' : ''}...`);
  
  // Process feeds in batches to avoid overwhelming servers
  const batchSize = enableTranslation ? 2 : 5; // Reduce batch size when translation is enabled
  for (let i = 0; i < feeds.length; i += batchSize) {
    const batch = feeds.slice(i, i + batchSize);
    const batchPromises = batch.map(feed => fetchFeedArticles(feed, enableTranslation));
    
    try {
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allArticles.push(...result.value);
          const translatedCount = result.value.filter(a => a.isTranslated).length;
          console.log(`✓ ${batch[index].title}: ${result.value.length} 篇文章${translatedCount > 0 ? ` (${translatedCount} 篇已翻译)` : ''}`);
        } else {
          console.log(`✗ ${batch[index].title}: 抓取失败`);
        }
      });
      
      // Rate limiting: wait longer when translation is enabled
      if (i + batchSize < feeds.length) {
        await new Promise(resolve => setTimeout(resolve, enableTranslation ? 3000 : 1000));
      }
    } catch (error) {
      console.error('Batch processing error:', error);
    }
  }
  
  const translatedCount = allArticles.filter(a => a.isTranslated).length;
  console.log(`抓取完成！总共获得 ${allArticles.length} 篇文章${translatedCount > 0 ? `，其中 ${translatedCount} 篇已翻译成中文` : ''}`);
  return allArticles;
}
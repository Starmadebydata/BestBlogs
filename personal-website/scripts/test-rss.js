#!/usr/bin/env node

const { loadAllRSSFeeds, fetchFeedArticles } = require('../src/lib/rss-parser');

async function testRSS() {
  console.log('🔍 开始测试RSS功能...\n');
  
  try {
    // 1. 测试RSS源加载
    console.log('1. 测试RSS源加载...');
    const feeds = await loadAllRSSFeeds();
    console.log(`✅ 成功加载 ${feeds.length} 个RSS源`);
    
    if (feeds.length > 0) {
      console.log(`   示例源: ${feeds[0].title} (${feeds[0].xmlUrl})`);
    }
    
    // 2. 测试单个RSS源抓取
    if (feeds.length > 0) {
      console.log('\n2. 测试单个RSS源抓取...');
      const testFeed = feeds.find(f => f.title === '阮一峰的网络日志') || feeds[0];
      console.log(`   测试源: ${testFeed.title}`);
      
      const articles = await fetchFeedArticles(testFeed);
      console.log(`✅ 成功抓取 ${articles.length} 篇文章`);
      
      if (articles.length > 0) {
        console.log(`   最新文章: ${articles[0].title}`);
      }
    }
    
    console.log('\n✅ RSS功能测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testRSS();
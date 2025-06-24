import { AIAnalysisRequest, AIAnalysisResponse, Article } from '@/types';

/**
 * Analyze article using OpenRouter API with configurable AI model
 */
export async function analyzeArticle(request: AIAnalysisRequest): Promise<AIAnalysisResponse | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const modelId = process.env.OPENROUTER_MODEL_ID || 'google/gemini-2.5-flash-lite-preview-06-17';
  
  if (!apiKey) {
    console.error('OpenRouter API key not found');
    return null;
  }
  
  const prompt = `Analyze the following technical article and return the analysis result in JSON format:

Article Title: ${request.title}
Article Content: ${request.content.slice(0, 3000)}...

Please categorize and analyze this article. Choose the most appropriate category from:

**Primary Categories:**
- "AI最新动态" - Latest AI developments, model releases, research breakthroughs
- "Vibe Coding" - Cool programming culture, developer lifestyle, fun tech content
- "AI自媒体" - AI content creation, social media, digital marketing
- "编程技术" - Programming techniques, frameworks, languages
- "产品设计" - Product design, UX/UI, design systems
- "商业科技" - Business technology, enterprise solutions
- "创业投资" - Startups, investment, entrepreneurship
- "开发工具" - Development tools, IDEs, productivity tools
- "行业洞察" - Industry insights, market analysis, trends
- "技术教程" - Technical tutorials, how-to guides

Return JSON format:
{
  "summary": "One-sentence summary of the article core content (within 50 words)",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "score": 85,
  "tags": ["tag1", "tag2", "tag3"],
  "category": "Choose from categories above", 
  "language": "zh or en",
  "highlights": ["Most interesting quote or insight from the article"]
}

Scoring criteria (0-100):
- Technical depth and accuracy (30%)
- Practicality and actionability (25%) 
- Content novelty and forward-thinking (20%)
- Writing quality and clarity (15%)
- Impact and importance (10%)

Please return pure JSON format without any other explanations.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: 'system',
            content: 'You are a professional technical content analysis expert, skilled in evaluating the quality and value of technical articles.'
          },
          {
            role: 'user', 
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in OpenRouter response');
    }
    
    // Parse JSON response
    const analysisResult = JSON.parse(content.trim());
    
    // Validate required fields
    if (!analysisResult.summary || !analysisResult.score) {
      throw new Error('Invalid analysis result format');
    }
    
    return {
      summary: analysisResult.summary || '',
      keyPoints: analysisResult.keyPoints || [],
      score: Math.min(100, Math.max(0, analysisResult.score || 0)),
      tags: analysisResult.tags || [],
      category: analysisResult.category || 'AI最新动态',
      language: analysisResult.language || 'en',
      highlights: analysisResult.highlights || [],
    };
    
  } catch (error) {
    console.error('Error analyzing article:', error);
    return null;
  }
}

/**
 * Batch analyze articles with rate limiting
 */
export async function analyzeArticlesBatch(articles: AIAnalysisRequest[]): Promise<(AIAnalysisResponse | null)[]> {
  const results: (AIAnalysisResponse | null)[] = [];
  
  console.log(`开始AI分析 ${articles.length} 篇文章...`);
  
  for (let i = 0; i < articles.length; i++) {
    try {
      const result = await analyzeArticle(articles[i]);
      results.push(result);
      
      if (result) {
        console.log(`✓ 分析完成 [${i + 1}/${articles.length}]: ${articles[i].title.slice(0, 50)}...`);
      } else {
        console.log(`✗ 分析失败 [${i + 1}/${articles.length}]: ${articles[i].title.slice(0, 50)}...`);
      }
      
      // Rate limiting: 1 request per 2 seconds for GPT-4
      if (i < articles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Error analyzing article ${i}:`, error);
      results.push(null);
    }
  }
  
  console.log(`AI分析完成！成功分析 ${results.filter(r => r !== null).length} 篇文章`);
  return results;
}

/**
 * Generate daily report summary
 */
export async function generateDailyReportSummary(articles: Article[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const modelId = process.env.OPENROUTER_MODEL_ID || 'google/gemini-2.5-flash-lite-preview-06-17';
  
  if (!apiKey) {
    return '今日技术资讯汇总，包含AI、编程、产品等多个领域的精选内容。';
  }
  
  const topArticles = articles
    .filter(a => a.score && a.score >= 80)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 10);
  
  const articleSummaries = topArticles.map(a => 
    `${a.title} (${a.score}分) - ${a.summary}`
  ).join('\n');
  
  const prompt = `Generate a daily tech report summary (about 100 words) based on the following high-quality technical articles:

${articleSummaries}

Requirements:
1. Highlight today's technology trends and important developments
2. Use concise and engaging language suitable for tech professionals
3. Reflect an AI entrepreneur's perspective
4. About 100 words in Chinese

Please return only the summary content without any additional formatting.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: 'system',
            content: 'You are a professional tech editor, skilled in writing technical daily report summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    return data.choices[0]?.message?.content || '今日技术资讯精选，涵盖前沿AI、编程技术和产品创新等热门话题。';
  } catch (error) {
    console.error('Error generating daily report summary:', error);
    return '今日技术资讯精选，涵盖前沿AI、编程技术和产品创新等热门话题。';
  }
}
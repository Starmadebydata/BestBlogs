import { AIAnalysisRequest, AIAnalysisResponse, Article } from '@/types';

/**
 * Analyze article using OpenRouter API with DeepSeek model
 */
export async function analyzeArticle(request: AIAnalysisRequest): Promise<AIAnalysisResponse | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('OpenRouter API key not found');
    return null;
  }
  
  const prompt = `
请分析以下技术文章，并按照JSON格式返回分析结果：

文章标题：${request.title}
文章内容：${request.content.slice(0, 3000)}...

请提供以下分析结果（请用JSON格式回复）：
{
  "summary": "一句话总结文章核心内容（50字以内）",
  "keyPoints": ["关键要点1", "关键要点2", "关键要点3"],
  "score": 85,
  "tags": ["标签1", "标签2", "标签3"],
  "category": "分类（AI/编程/产品/商业/设计之一）", 
  "language": "zh或en"
}

评分标准（0-100分）：
- 技术深度和准确性 (30%)
- 实用性和可操作性 (25%) 
- 内容新颖性和前瞻性 (20%)
- 写作质量和清晰度 (15%)
- 影响力和重要性 (10%)

请确保返回纯JSON格式，不要包含其他文字说明。
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的技术内容分析专家，擅长评估技术文章的质量和价值。'
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
      category: analysisResult.category || 'AI',
      language: analysisResult.language || 'en',
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
  
  const prompt = `
根据以下今日的优质技术文章，生成一个100字左右的日报总结：

${articleSummaries}

要求：
1. 突出今日技术趋势和重要动态
2. 语言简洁有趣，适合技术从业者阅读
3. 体现AI创业者的视角
4. 100字左右

请直接返回总结内容，不要包含其他格式。
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的技术编辑，擅长撰写技术日报摘要。'
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
/**
 * Translation service using OpenRouter API with DeepSeek model
 */

export interface TranslationRequest {
  text: string;
  from?: string; // source language, auto-detect if not provided
  to: string; // target language
}

export interface TranslationResponse {
  translatedText: string;
  originalText: string;
  detectedLanguage?: string;
}

/**
 * Translate text using AI
 */
export async function translateText(request: TranslationRequest): Promise<TranslationResponse | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('OpenRouter API key not found for translation');
    return null;
  }

  const { text, from = 'auto', to } = request;
  
  // Skip translation if text is already in target language or very short
  if (text.length < 10) {
    return {
      translatedText: text,
      originalText: text,
      detectedLanguage: from === 'auto' ? 'unknown' : from,
    };
  }

  const prompt = `
请将以下文本翻译成${to === 'zh' ? '中文' : to === 'en' ? '英文' : to}。

要求：
1. 保持原文的意思和语调
2. 使用自然流畅的表达
3. 对于技术术语，使用常见的中文表达或保留英文原词
4. 保持原文的格式和段落结构
5. 如果是标题，请保持标题的简洁性

原文：
${text}

请直接返回翻译结果，不要包含任何解释或说明。
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
            content: '你是一个专业的翻译专家，擅长技术文档和新闻文章的翻译，能够准确传达原文的意思和语调。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    
    const data = await response.json();
    const translatedText = data.choices[0]?.message?.content;
    
    if (!translatedText) {
      throw new Error('No content in translation response');
    }
    
    return {
      translatedText: translatedText.trim(),
      originalText: text,
      detectedLanguage: from === 'auto' ? detectLanguage(text) : from,
    };
    
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
}

/**
 * Batch translate multiple texts
 */
export async function translateBatch(
  texts: string[], 
  options: { from?: string; to: string }
): Promise<(TranslationResponse | null)[]> {
  const results: (TranslationResponse | null)[] = [];
  
  console.log(`开始批量翻译 ${texts.length} 个文本...`);
  
  for (let i = 0; i < texts.length; i++) {
    try {
      const result = await translateText({
        text: texts[i],
        from: options.from,
        to: options.to,
      });
      results.push(result);
      
      if (result) {
        console.log(`✓ 翻译完成 [${i + 1}/${texts.length}]: ${texts[i].slice(0, 50)}...`);
      } else {
        console.log(`✗ 翻译失败 [${i + 1}/${texts.length}]: ${texts[i].slice(0, 50)}...`);
      }
      
      // Rate limiting: 1 request per 2 seconds
      if (i < texts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Error translating text ${i}:`, error);
      results.push(null);
    }
  }
  
  console.log(`批量翻译完成！成功翻译 ${results.filter(r => r !== null).length} 个文本`);
  return results;
}

/**
 * Simple language detection
 */
export function detectLanguage(text: string): string {
  // Simple heuristic: if text contains Chinese characters, it's Chinese
  const chineseRegex = /[\u4e00-\u9fff]/;
  if (chineseRegex.test(text)) {
    return 'zh';
  }
  
  // Otherwise assume English
  return 'en';
}

/**
 * Check if text needs translation
 */
export function needsTranslation(text: string, targetLanguage: string): boolean {
  const detectedLang = detectLanguage(text);
  return detectedLang !== targetLanguage;
}

/**
 * Translate article content to Chinese
 */
export async function translateArticleToChinese(article: {
  title: string;
  content: string;
  summary?: string;
}): Promise<{
  title: string;
  content: string;
  summary?: string;
  isTranslated: boolean;
} | null> {
  try {
    const translationTasks: Promise<TranslationResponse | null>[] = [];
    
    // Check what needs translation
    const titleNeedsTranslation = needsTranslation(article.title, 'zh');
    const contentNeedsTranslation = needsTranslation(article.content, 'zh');
    const summaryNeedsTranslation = article.summary ? needsTranslation(article.summary, 'zh') : false;
    
    if (!titleNeedsTranslation && !contentNeedsTranslation && !summaryNeedsTranslation) {
      return {
        ...article,
        isTranslated: false,
      };
    }
    
    // Translate title
    if (titleNeedsTranslation) {
      translationTasks.push(translateText({ text: article.title, to: 'zh' }));
    } else {
      translationTasks.push(Promise.resolve({ 
        translatedText: article.title, 
        originalText: article.title 
      }));
    }
    
    // Translate content (limit to first 2000 characters for efficiency)
    if (contentNeedsTranslation) {
      const contentToTranslate = article.content.slice(0, 2000);
      translationTasks.push(translateText({ text: contentToTranslate, to: 'zh' }));
    } else {
      translationTasks.push(Promise.resolve({ 
        translatedText: article.content, 
        originalText: article.content 
      }));
    }
    
    // Translate summary
    if (article.summary) {
      if (summaryNeedsTranslation) {
        translationTasks.push(translateText({ text: article.summary, to: 'zh' }));
      } else {
        translationTasks.push(Promise.resolve({ 
          translatedText: article.summary, 
          originalText: article.summary 
        }));
      }
    }
    
    const results = await Promise.all(translationTasks);
    
    if (results.some(r => r === null)) {
      console.error('Some translations failed');
      return null;
    }
    
    return {
      title: results[0]?.translatedText || article.title,
      content: results[1]?.translatedText || article.content,
      summary: results[2]?.translatedText || article.summary,
      isTranslated: titleNeedsTranslation || contentNeedsTranslation || summaryNeedsTranslation,
    };
    
  } catch (error) {
    console.error('Error translating article:', error);
    return null;
  }
}
/**
 * Internationalization support for Chinese and English
 */

export type Language = 'zh' | 'en';

export interface Translations {
  [key: string]: string | Translations;
}

export const translations = {
  zh: {
    site: {
      title: 'WindFlash AI Daily',
      description: '基于AI技术，每日为创业者和技术从业者精选最有价值的技术资讯',
      subtitle: 'Beta',
    },
    nav: {
      home: '首页',
      dailyReport: '日报',
      news: '技术资讯',
      articles: 'Blog',
      myProject: '我的项目',
      about: '关于',
    },
    home: {
      heroTitle: 'AI驱动的',
      heroTitleHighlight: '技术资讯',
      heroDescription: '基于380个优质RSS源，每日智能筛选和分析最有价值的技术文章，助力AI创业者和技术从业者掌握前沿动态',
      viewTodayReport: '查看今日日报',
      browseArticles: '浏览所有文章',
      rssFeeds: 'RSS源',
      totalArticles: '累计文章',
      aiAnalysis: 'AI分析',
      featuredArticles: '精选文章',
      translatedArticles: '中文翻译',
      translated: '中译',
      featuredSection: '精选文章',
      featuredDescription: 'AI智能筛选的高质量技术内容',
      latestSection: '最新文章',
      latestDescription: '最近更新的技术资讯',
      loading: '加载中...',
      source: '来源',
    },
    dailyReport: {
      title: '技术日报',
      description: '每日精选最有价值的技术资讯，AI智能分析和评分',
      todayLatest: '今日最新',
      featuredArticles: '精选文章',
      totalArticles: '总文章数',
      aiAnalysisCount: 'AI分析',
      translatedCount: '中文翻译',
      todayFeatured: '今日精选文章',
      notGenerated: '今日报告尚未生成',
      notGeneratedDesc: '系统会在有足够优质文章时自动生成日报，请稍后再来查看。',
      browseAllArticles: '浏览所有文章',
      historicalReports: '历史日报',
      viewDetails: '查看详情',
      translated: '中译',
      score: '分',
    },
    blog: {
      title: '我的博客',
      subtitle: '个人创作的技术文章和思考分享',
      comingSoon: '内容筹备中',
      description: '这里将收录我个人创作的技术文章、项目分享和思考记录。内容正在精心准备中，敬请期待！',
      techShare: {
        title: '技术分享',
        description: '前端开发、AI应用、项目实战经验'
      },
      projectReview: {
        title: '项目复盘',
        description: '产品开发心得、架构设计思考'
      },
      growth: {
        title: '成长思考',
        description: '创业感悟、学习笔记、行业观察'
      },
      contactText: '想要了解更多或有合作意向，欢迎通过以下方式联系我：',
      viewProjects: '查看我的项目',
      learnMore: '了解更多关于我'
    },
    projects: {
      title: '我的项目',
      subtitle: '以下是我已经上线部署的网站项目，涵盖AI工具、技术资讯、游戏娱乐和健康生活等领域',
      visitSite: '访问网站',
      techStack: '技术栈与特色',
      techStackDescription: '这些项目采用了现代化的技术栈和架构设计，专注于用户体验和性能优化',
      modernTech: {
        title: '现代技术栈',
        description: 'Next.js, TypeScript, Tailwind CSS'
      },
      performance: {
        title: '性能优化',
        description: '服务端渲染, 图像优化, CDN加速'
      },
      aiIntegration: {
        title: 'AI集成',
        description: '智能分析, 内容生成, 自动化处理'
      },
      projectDetails: {
        windflash: {
          description: 'AI驱动的技术日报平台，基于380个优质RSS源，每日智能筛选和分析最有价值的技术文章，为AI创业者和技术从业者提供精准的前沿资讯。',
          tags: ['Next.js', 'AI分析', 'RSS', '技术资讯']
        },
        xgo: {
          description: 'AI工具箱平台，汇集各类实用的人工智能工具和服务，为用户提供便捷的AI应用入口，涵盖文本生成、图像处理、数据分析等多个领域。',
          tags: ['AI工具', '工具箱', '效率提升', '实用工具']
        },
        bestblogs: {
          description: '优质技术博客RSS订阅平台，精心收录400+个优质技术博客和资源，涵盖编程、AI、产品设计等领域，为技术从业者提供一站式订阅服务。',
          tags: ['RSS订阅', '技术博客', '开源项目', '学习资源']
        },
        instantgames: {
          description: '即时游戏平台，提供各类免费在线小游戏，无需下载即可畅玩，涵盖休闲益智、动作冒险、策略模拟等多种游戏类型。',
          tags: ['在线游戏', '休闲娱乐', '免费游戏', '即时体验']
        },
        bestgamesio: {
          description: '精品游戏推荐平台，汇集全球优质游戏资源，提供专业的游戏评测和推荐，帮助玩家发现最适合的游戏体验。',
          tags: ['游戏推荐', '精品游戏', '游戏评测', '游戏资讯']
        },
        moodjournal: {
          description: '情绪日记应用，帮助用户记录和追踪情绪变化，提供个性化的心理健康建议，促进自我认知和情绪管理，让生活更加平衡和幸福。',
          tags: ['情绪管理', '心理健康', '日记记录', '生活健康']
        }
      }
    },
    about: {
      title: '关于 WindFlash AI Daily',
      subtitle: '基于AI技术，为创业者和技术从业者精选最有价值的技术资讯',
      mission: '我们的使命',
      features: '功能特色',
      techDetails: '技术实现',
      openSource: '开源项目',
      contact: '联系我们',
      dataSource: '数据来源',
      techStack: '技术栈',
      missionText1: '在信息爆炸的时代，获取高质量的技术资讯变得越来越困难。作为AI创业者和技术从业者，我们每天都需要跟上快速发展的技术趋势，但时间和精力却越来越有限。',
      missionText2: 'WindFlash AI Daily旨在解决这个问题。我们利用先进的AI技术，从380个优质RSS源中智能筛选、分析和推荐最有价值的技术文章，帮助您在最短的时间内掌握最重要的技术动态。',
      missionText3: '无论您是AI创业者、技术架构师、产品经理还是技术爱好者，我们都希望通过这个平台为您提供最精准、最有价值的技术资讯。'
    },
    footer: {
      description: '基于AI技术，每日为创业者和技术从业者精选最有价值的技术资讯。',
      features: '功能特色',
      links: '链接',
      copyright: '© 2024 WindFlash AI Daily. 基于 BestBlogs RSS源构建.',
      feature1: '380个优质RSS源',
      feature2: 'AI智能分析和评分',
      feature3: '每日自动生成报告',
      feature4: '多维度内容分类',
    },
  },
  en: {
    site: {
      title: 'WindFlash AI Daily',
      description: 'AI-powered daily digest of valuable tech content for entrepreneurs and developers',
      subtitle: 'Beta',
    },
    nav: {
      home: 'Home',
      dailyReport: 'Daily Report',
      news: 'Tech News',
      articles: 'Blog',
      myProject: 'My Project',
      about: 'About',
    },
    home: {
      heroTitle: 'AI-Powered',
      heroTitleHighlight: 'Tech News',
      heroDescription: 'Based on 380 quality RSS feeds, daily intelligent filtering and analysis of the most valuable tech articles for AI entrepreneurs and developers',
      viewTodayReport: "View Today's Report",
      browseArticles: 'Browse All Articles',
      rssFeeds: 'RSS Feeds',
      totalArticles: 'Total Articles',
      aiAnalysis: 'AI Analysis',
      featuredArticles: 'Featured',
      translatedArticles: 'Translated',
      translated: 'Trans',
      featuredSection: 'Featured Articles',
      featuredDescription: 'High-quality content curated by AI',
      latestSection: 'Latest Articles',
      latestDescription: 'Recently updated tech news',
      loading: 'Loading...',
      source: 'Source',
    },
    dailyReport: {
      title: 'Tech Daily Report',
      description: 'Daily selection of valuable tech news with AI analysis and scoring',
      todayLatest: 'Latest Today',
      featuredArticles: 'Featured',
      totalArticles: 'Total Articles',
      aiAnalysisCount: 'AI Analyzed',
      translatedCount: 'Translated',
      todayFeatured: "Today's Featured Articles",
      notGenerated: 'Today\'s report not generated yet',
      notGeneratedDesc: 'The system will automatically generate a daily report when there are enough quality articles. Please check back later.',
      browseAllArticles: 'Browse All Articles',
      historicalReports: 'Historical Reports',
      viewDetails: 'View Details',
      translated: 'Trans',
      score: 'pts',
    },
    blog: {
      title: 'My Blog',
      subtitle: 'Personal tech articles and insights',
      comingSoon: 'Coming Soon',
      description: 'This space will feature my personal tech articles, project insights, and thoughts. Content is being carefully prepared - stay tuned!',
      techShare: {
        title: 'Tech Sharing',
        description: 'Frontend development, AI applications, project experiences'
      },
      projectReview: {
        title: 'Project Reviews',
        description: 'Product development insights, architecture design thoughts'
      },
      growth: {
        title: 'Growth Insights',
        description: 'Entrepreneurship reflections, learning notes, industry observations'
      },
      contactText: 'Want to learn more or discuss collaboration? Feel free to reach out:',
      viewProjects: 'View My Projects',
      learnMore: 'Learn More About Me'
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Here are my live deployed web projects, covering AI tools, tech news, gaming entertainment, and wellness domains',
      visitSite: 'Visit Site',
      techStack: 'Tech Stack & Features',
      techStackDescription: 'These projects utilize modern tech stacks and architectural designs, focusing on user experience and performance optimization',
      modernTech: {
        title: 'Modern Tech Stack',
        description: 'Next.js, TypeScript, Tailwind CSS'
      },
      performance: {
        title: 'Performance Optimization',
        description: 'Server-side rendering, image optimization, CDN acceleration'
      },
      aiIntegration: {
        title: 'AI Integration',
        description: 'Intelligent analysis, content generation, automated processing'
      },
      projectDetails: {
        windflash: {
          description: 'AI-powered tech daily platform, based on 380 quality RSS feeds, daily intelligent filtering and analysis of the most valuable tech articles, providing precise cutting-edge insights for AI entrepreneurs and tech professionals.',
          tags: ['Next.js', 'AI Analysis', 'RSS', 'Tech News']
        },
        xgo: {
          description: 'AI toolbox platform, gathering various practical AI tools and services, providing users with convenient AI application access, covering text generation, image processing, data analysis and other domains.',
          tags: ['AI Tools', 'Toolbox', 'Efficiency', 'Utilities']
        },
        bestblogs: {
          description: 'Quality tech blog RSS subscription platform, carefully curating 400+ quality tech blogs and resources, covering programming, AI, product design and other fields, providing one-stop subscription service for tech professionals.',
          tags: ['RSS Feeds', 'Tech Blogs', 'Open Source', 'Learning']
        },
        instantgames: {
          description: 'Instant gaming platform, providing various free online mini-games, playable without download, covering casual puzzle, action adventure, strategy simulation and other game types.',
          tags: ['Online Games', 'Casual Gaming', 'Free Games', 'Instant Play']
        },
        bestgamesio: {
          description: 'Premium game recommendation platform, gathering global quality game resources, providing professional game reviews and recommendations, helping players discover the most suitable gaming experiences.',
          tags: ['Game Reviews', 'Premium Games', 'Game Testing', 'Gaming News']
        },
        moodjournal: {
          description: 'Mood journaling app, helping users record and track emotional changes, providing personalized mental health advice, promoting self-awareness and emotional management for a more balanced and happy life.',
          tags: ['Mood Tracking', 'Mental Health', 'Journaling', 'Wellness']
        }
      }
    },
    about: {
      title: 'About WindFlash AI Daily',
      subtitle: 'AI-powered daily digest of valuable tech content for entrepreneurs and developers',
      mission: 'Our Mission',
      features: 'Features',
      techDetails: 'Technical Implementation',
      openSource: 'Open Source',
      contact: 'Contact Us',
      dataSource: 'Data Sources',
      techStack: 'Tech Stack',
      missionText1: 'In an era of information overload, accessing high-quality tech content has become increasingly difficult. As AI entrepreneurs and tech professionals, we need to keep up with rapidly evolving technology trends, but time and energy are increasingly limited.',
      missionText2: 'WindFlash AI Daily aims to solve this problem. We leverage advanced AI technology to intelligently filter, analyze, and recommend the most valuable tech articles from 380 quality RSS feeds, helping you grasp the most important tech developments in the shortest time.',
      missionText3: 'Whether you are an AI entrepreneur, tech architect, product manager, or tech enthusiast, we hope to provide you with the most accurate and valuable tech insights through this platform.'
    },
    footer: {
      description: 'AI-powered daily digest of valuable tech content for entrepreneurs and developers.',
      features: 'Features',
      links: 'Links',
      copyright: '© 2024 WindFlash AI Daily. Built with BestBlogs RSS feeds.',
      feature1: '380 Quality RSS Feeds',
      feature2: 'AI Analysis & Scoring',
      feature3: 'Auto Daily Reports',
      feature4: 'Multi-dimensional Categorization',
    },
  },
} as const;

export function getTranslation(key: string, lang: Language): string | string[] {
  const keys = key.split('.');
  let current: unknown = translations[lang];
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      // Fallback to Chinese if English translation not found
      current = translations.zh;
      for (const fallbackKey of keys) {
        if (current && typeof current === 'object' && fallbackKey in current) {
          current = (current as Record<string, unknown>)[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  if (typeof current === 'string') return current;
  if (Array.isArray(current)) return current;
  return key;
}

export function detectUserLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language;
    if (stored && ['zh', 'en'].includes(stored)) {
      return stored;
    }
    
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
  }
  
  return 'zh'; // Default to Chinese
}

export function setUserLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}
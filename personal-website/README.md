# WindFlash AI Daily

AI-powered daily digest of valuable tech content for entrepreneurs and developers.

🌐 **Production Site**: [https://windflash.us](https://windflash.us)

## Features

- 🤖 **AI-Powered Analysis**: Intelligent content filtering and scoring using DeepSeek models
- 📰 **Daily Reports**: Automatically generated tech news digests
- 🔍 **Smart Translation**: Auto-translate English content to Chinese
- 🌍 **Multi-language Support**: Full Chinese and English interface
- 📱 **Responsive Design**: Optimized for desktop and mobile
- ⚡ **Real-time Updates**: Fresh content from 380+ RSS sources

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Models**: OpenRouter + DeepSeek R1
- **Data Storage**: JSON-based local storage
- **RSS Processing**: Custom RSS parser with batch processing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenRouter API key to `.env.local`:
```bash
OPENROUTER_API_KEY=your_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/status` - System status and statistics
- `GET /api/articles` - Fetch articles with filtering
- `GET /api/daily-report` - Get daily reports
- `POST /api/daily-report` - Generate new daily report
- `GET /api/rss/update` - Update RSS feeds and run AI analysis

## Configuration

### Environment Variables

- `OPENROUTER_API_KEY` - Your OpenRouter API key for AI analysis
- `NEXT_PUBLIC_BASE_URL` - Base URL for production deployment

### RSS Sources

RSS feeds are configured in the `public/` directory:
- `BestBlogs_RSS_Articles.opml` - Tech articles (200 sources)
- `BestBlogs_RSS_Podcasts.opml` - Tech podcasts (30 sources)  
- `BestBlogs_RSS_Twitters.opml` - Twitter feeds (150 sources)

## Deployment

The application is designed to be deployed on **windflash.us**. 

### Production Environment

- Configure `NEXT_PUBLIC_BASE_URL=https://windflash.us`
- Ensure OpenRouter API key is set
- Run build process: `npm run build`

## Features Overview

### AI Analysis Pipeline
1. **RSS Fetching**: Collect articles from 380+ sources
2. **Translation**: Auto-translate English content to Chinese
3. **AI Scoring**: Analyze articles using DeepSeek models (0-100 scale)
4. **Categorization**: Auto-categorize into AI/编程/产品/商业/设计
5. **Daily Reports**: Generate AI-powered daily summaries

### Multi-language Support
- Automatic language detection
- Full UI translation (Chinese/English)
- Content translation for better accessibility
- Language preference persistence

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Private project. All rights reserved.

---

**WindFlash AI Daily** - Empowering entrepreneurs and developers with AI-curated tech insights.
import { Article } from '@/types/article';

interface AssessmentResult {
  pss: {
    score: number;
    level: string;
  };
  bdi: {
    score: number;
    level: string;
  };
  emotionAnalysis: {
    dominant: string;
  };
}

export function getRecommendedArticles(
  articles: Article[], 
  assessment: AssessmentResult,
  maxArticles: number = 3
): Article[] {
  // Buat daftar kata kunci berdasarkan hasil assessment
  const keywords = new Set<string>();
  
  // Tambahkan keyword berdasarkan level stress
  if (assessment.pss.level.toLowerCase() === 'high') {
    keywords.add('manajemen stress');
    keywords.add('relaksasi');
    keywords.add('meditation');
  } else if (assessment.pss.level.toLowerCase() === 'moderate') {
    keywords.add('mindfulness');
    keywords.add('self care');
  }

  // Tambahkan keyword berdasarkan level depresi
  if (['severe', 'extreme'].includes(assessment.bdi.level.toLowerCase())) {
    keywords.add('depresi');
    keywords.add('therapy');
    keywords.add('professional help');
  } else if (['moderate', 'mild'].includes(assessment.bdi.level.toLowerCase())) {
    keywords.add('mood');
    keywords.add('mental health');
  }

  // Tambahkan keyword berdasarkan emosi dominan
  if (assessment.emotionAnalysis.dominant.toLowerCase() === 'sad') {
    keywords.add('motivasi');
    keywords.add('happiness');
  } else if (assessment.emotionAnalysis.dominant.toLowerCase() === 'fearful') {
    keywords.add('anxiety');
    keywords.add('fear management');
  }

  // Filter artikel berdasarkan relevansi dengan keywords
  const scoredArticles = articles.map(article => {
    let relevanceScore = 0;
    const articleText = `${article.title} ${article.description}`.toLowerCase();

    keywords.forEach(keyword => {
      if (articleText.includes(keyword.toLowerCase())) {
        relevanceScore += 1;
      }
    });

    return {
      article,
      score: relevanceScore
    };
  });

  // Sort berdasarkan relevance score dan ambil N artikel teratas
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, maxArticles)
    .map(item => item.article);
}
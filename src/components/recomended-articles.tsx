import Image from 'next/image';
import { Book } from 'lucide-react';
import { Article } from '@/types/article';

interface RecommendedArticlesProps {
  articles: Article[];
}

export function RecommendedArticles({ articles }: RecommendedArticlesProps) {
  if (!articles.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-3">
        Artikel Yang Mungkin Membantu Anda:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="relative h-32 w-full">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Book className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-medium text-purple-900 line-clamp-2 mb-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {article.description}
              </p>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <Book className="w-3 h-3 mr-1" />
                <span>{article.source}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Article } from '@/types/article';

export const useFetchArticles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch langsung dari file JSON di folder public
                const response = await fetch('/data/all-articles.json');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }

                const data = await response.json();
                setArticles(Array.isArray(data) ? data : []);
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching articles');
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return {
        articles,
        loading,
        error
    };
};
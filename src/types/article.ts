export interface Article {
    title: string;
    url: string;
    imageUrl?: string | null;
    source: string;
    description?: string;
    date?: string;
}

export interface CrawlerResult {
    success: boolean;
    count?: number;
    data?: Article[];
    error?: string;
    message?: string;
}
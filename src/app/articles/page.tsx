"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useFetchArticles } from '@/hooks/useArticle';
import { Search, Book, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ArticlesPage() {
    const { articles = [], loading, error } = useFetchArticles();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filter articles dengan null checking
    const filteredArticles = searchTerm.trim() === '' 
        ? articles 
        : articles.filter(article =>
            article?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article?.description?.toLowerCase().includes(searchTerm.toLowerCase())
          );

    // Loading skeleton component
    const Skeleton = () => (
        <div className="bg-white shadow rounded-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-48 rounded w-full"></div>
            <div className="mt-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        {error}. Silakan coba lagi nanti atau hubungi support.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-purple-900 mb-4">
                    Artikel Kesehatan Mental
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Temukan berbagai artikel informatif tentang kesehatan mental untuk membantu 
                    Anda menjalani hidup yang lebih sehat dan bahagia.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles && filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <article 
                            key={index} 
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative h-48 w-full">
                                {article?.imageUrl ? (
                                    <Image
                                        src={article.imageUrl}
                                        alt={article?.title || 'Article image'}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Book className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-purple-900 mb-2 line-clamp-2">
                                    {article?.title || 'Untitled Article'}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {article?.description || 'No description available'}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <Book className="w-4 h-4" />
                                        <span>{article?.source || 'Unknown source'}</span>
                                    </div>
                                </div>
                                {article?.url && (
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 w-full text-center"
                                    >
                                        Baca Selengkapnya
                                    </a>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm.trim() !== '' 
                                ? 'Tidak ada artikel ditemukan' 
                                : 'Belum ada artikel tersedia'}
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm.trim() !== '' 
                                ? 'Coba gunakan kata kunci pencarian yang berbeda'
                                : 'Silakan coba kembali beberapa saat lagi'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { ResultCard } from '@/components/result-card';
import { analyzeResults } from '@/lib/gemini';
import { Button } from '@/components/ui/button';

interface EmotionDetails {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
}

interface AssessmentResult {
  pss: {
    score: number;
    level: string;
    message: string;
  };
  bdi: {
    score: number;
    level: string;
    message: string;
  };
  emotionAnalysis: {
    details: EmotionDetails;
    dominant: string;
  };
}

interface AnalysisResult {
  summary: string;
  correlation: string;
  recommendations: string[];
  professionalHelp: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const processResults = async () => {
      try {
        const results = localStorage.getItem('assessmentResult');
        if (!results) {
          setError('Data assessment tidak ditemukan');
          setIsLoading(false);
          return;
        }

        const parsedResults = JSON.parse(results) as AssessmentResult;
        setAssessmentData(parsedResults);

        const aiAnalysis = await analyzeResults(parsedResults);
        setAnalysis(aiAnalysis);
      } catch (error) {
        console.error('Error processing results:', error);
        setError('Terjadi kesalahan dalam memproses hasil');
      } finally {
        setIsLoading(false);
      }
    };

    processResults();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
          <p className="text-purple-800">Menganalisis hasil Anda...</p>
        </div>
      </div>
    );
  }

  if (error || !assessmentData || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-red-600 mb-4">{error || 'Data tidak ditemukan'}</p>
            <Button onClick={() => router.push('/assessment')}>
              Mulai Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Beranda
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">
            Hasil Analisis
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berdasarkan hasil assessment dan analisis ekspresi wajah Anda, 
            berikut adalah analisis menyeluruh tentang kondisi kesehatan mental Anda.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {analysis.summary && (
            <ResultCard 
              title="Ringkasan Kondisi"
              type="normal"
            >
              <p className="text-gray-700">{analysis.summary}</p>
            </ResultCard>
          )}

          {analysis.correlation && (
            <ResultCard
              title="Analisis Mendalam"
              type="normal"
            >
              <p className="text-gray-700">{analysis.correlation}</p>
            </ResultCard>
          )}

          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <ResultCard
              title="Rekomendasi"
              type="success"
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </ResultCard>
          )}

          {analysis.professionalHelp && (
            <ResultCard
              title="Rekomendasi Konsultasi Profesional"
              type={analysis.professionalHelp.toLowerCase().includes('ya') ? 'warning' : 'normal'}
            >
              <p className="text-gray-700">{analysis.professionalHelp}</p>
            </ResultCard>
          )}

          <ResultCard
            title="Skor Assessment"
            description="Detail skor dari setiap assessment yang telah Anda jalani"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Perceived Stress Scale (PSS)</h4>
                <p className="text-gray-700">
                  Skor: {assessmentData.pss.score} - Level: {assessmentData.pss.level}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Beck Depression Inventory (BDI)</h4>
                <p className="text-gray-700">
                  Skor: {assessmentData.bdi.score} - Level: {assessmentData.bdi.level}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analisis Emosi</h4>
                <p className="text-gray-700">
                  Emosi Dominan: {assessmentData.emotionAnalysis.dominant}
                </p>
              </div>
            </div>
          </ResultCard>

          <div className="flex justify-center gap-4 pt-6">
            <Button 
              variant="outline"
              onClick={() => router.push('/assessment')}
            >
              Mulai Ulang Assessment
            </Button>
            <Button
              onClick={() => router.push('/')}
              className="bg-purple-700 hover:bg-purple-800"
            >
              Selesai
            </Button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-12 max-w-2xl mx-auto">
          Hasil analisis ini bersifat indikatif dan tidak menggantikan diagnosis profesional kesehatan mental.
          Jika Anda mengalami masalah kesehatan mental yang serius, segera hubungi profesional kesehatan mental.
        </p>
      </div>
    </div>
  );
}
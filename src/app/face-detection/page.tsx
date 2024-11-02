'use client';

import { FaceDetection } from '@/components/face-detection';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FaceDetectionPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if assessment has been completed
    const assessment = localStorage.getItem('assessmentResult');
    if (!assessment) {
      router.push('/assessment');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/assessment" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Assessment
        </Link>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                ✓
              </div>
              <div className="ml-2 text-green-700 font-medium">Assessment</div>
            </div>
            <div className="w-16 h-0.5 bg-purple-700" />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center">
                2
              </div>
              <div className="ml-2 text-purple-900 font-medium">Deteksi Emosi</div>
            </div>
            <div className="w-16 h-0.5 bg-purple-200" />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center">
                3
              </div>
              <div className="ml-2 text-gray-500">Hasil</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">
              Deteksi Emosi
            </h1>
            <p className="text-gray-600">
              Kami akan menganalisis ekspresi wajah Anda untuk memberikan hasil yang lebih akurat.
              Pastikan Anda berada di ruangan dengan pencahayaan yang cukup.
            </p>
          </div>

          <FaceDetection />

          <p className="text-center text-gray-500 mt-8 text-sm">
            Data wajah Anda tidak akan disimpan dan hanya digunakan untuk analisis emosi saat ini.
          </p>
        </div>
      </div>
    </div>
  );
}
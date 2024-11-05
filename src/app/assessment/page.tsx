'use client';

import { AssessmentForm } from '@/components/assessment-form';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Beranda
        </Link>

        {/* Progress Steps */}
        <div className="mb-8 steps-container flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center">
              1
            </div>
            <div className="ml-2 text-purple-900 font-medium">Assessment</div>
          </div>
          <div className="w-16 h-0.5 bg-purple-200 hidden md:block" />
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center">
              2
            </div>
            <div className="ml-2 text-gray-500">Deteksi Emosi</div>
          </div>
          <div className="w-16 h-0.5 bg-purple-200 hidden md:block" />
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center">
              3
            </div>
            <div className="ml-2 text-gray-500">Hasil</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8">
          <AssessmentForm />
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-500 mt-8 text-sm px-4">
          Semua jawaban Anda akan dijaga kerahasiaannya dan hanya digunakan untuk memberikan rekomendasi yang sesuai.
        </p>
      </div>
    </div>
  );
}

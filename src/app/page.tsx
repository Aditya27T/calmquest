import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronRight, Brain, Heart, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import hero from '../../public/hero-image.svg';
import { FeaturesSection, GamesSection } from '@/components/landings-sections';


export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden min-h-[calc(100vh-64px)] bg-gradient-to-b from-purple-100 via-purple-50 to-white">
        {/* Decorative Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-64px)] gap-12 py-20">
            {/* Left Content */}
            <div className="md:w-1/2 max-w-xl">
              {/* Badge */}
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <span className="text-sm font-medium text-purple-800">
                  ✨ Platform Kesehatan Mental Terbaik ✨
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 leading-tight mb-6">
                Jaga Kesehatan Mental Anda Bersama <span className="text-purple-700">CalmQuest</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Platform terapi digital yang membantu Anda mengelola kesehatan mental dengan mudah, 
                aman, dan terpercaya. Dilengkapi dengan assessment mental dan analisis emosi menggunakan AI.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/assessment">
                  <Button 
                    className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 rounded-full text-lg flex items-center group shadow-lg shadow-purple-500/25"
                    size="lg"
                  >
                    Mulai Assessment
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button 
                    variant="outline" 
                    className="px-8 py-6 rounded-full text-lg border-2 hover:bg-purple-50 transition-colors"
                    size="lg"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="md:w-1/2 relative">
              {/* Main Image with Container */}
              <div className="relative z-10 bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <Image 
                  src={hero}
                  alt="Hero Image"
                  priority
                  className="w-full h-auto max-w-lg mx-auto drop-shadow-xl"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-float">
                  <span className="text-2xl">🧘‍♀️</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-float animation-delay-1000">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-8 h-12 border-2 border-purple-700 rounded-full flex justify-center">
            <div className="w-2 h-2 bg-purple-700 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Mental Health Awareness Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              Mengapa Kesehatan Mental Penting?
            </h2>
            <p className="text-gray-600 text-lg">
              Kesehatan mental adalah komponen vital dari kesejahteraan hidup yang mempengaruhi 
              cara kita berpikir, merasa, dan menjalani kehidupan sehari-hari.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-xl bg-purple-50">
              <div className="mb-4">
                <Brain className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                Kesehatan Mental yang Baik
              </h3>
              <p className="text-gray-600">
                Memungkinkan Anda mengenali potensi diri, mengatasi stres normal kehidupan, 
                bekerja secara produktif, dan berkontribusi pada komunitas.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50">
              <div className="mb-4">
                <Heart className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                Dampak pada Kehidupan
              </h3>
              <p className="text-gray-600">
                Mempengaruhi hubungan, produktivitas kerja, kualitas tidur, 
                dan kemampuan mengatasi tantangan hidup sehari-hari.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50">
              <div className="mb-4">
                <Users className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                Dukungan Profesional
              </h3>
              <p className="text-gray-600">
                Mencari bantuan profesional adalah langkah berani dan penting 
                untuk menjaga kesehatan mental Anda.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-8 bg-purple-900 rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15%</div>
              <p className="text-purple-200">Orang Indonesia Mengalami Gangguan Mental</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">40%</div>
              <p className="text-purple-200">Tidak Mencari Bantuan Professional</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">6%</div>
              <p className="text-purple-200">Penderita depresi yang menerima pelayanan dengan tepat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            <Step number="1" title="Isi Assessment" description="Jawab pertanyaan sederhana tentang kondisi mental Anda" />
            <Step number="2" title="Deteksi Emosi" description="Sistem akan menganalisis ekspresi wajah Anda" />
            <Step number="3" title="Terima Rekomendasi" description="Dapatkan saran personal berdasarkan hasil analisis" />
          </div>
        </div>
      </div>

      {/* Relaxation Games Section */}
      <GamesSection />

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Mulai Perjalanan Menuju Kesehatan Mental yang Lebih Baik
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Jangan tunggu sampai besok. Ambil langkah pertama untuk kesehatan mental 
            yang lebih baik hari ini dengan CalmQuest.
          </p>
          <Link href="/assessment">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 rounded-full text-lg flex items-center mx-auto group">
              Mulai Assessment Gratis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 CalmQuest. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}

const Step = ({ number, title, description }: any) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
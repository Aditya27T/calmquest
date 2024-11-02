import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Brain, Smile, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-100 to-white">
        <div className="container mx-auto px-4 py-16">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-700" />
              <span className="text-2xl font-bold text-purple-700">CalmQuest</span>
            </div>
          </nav>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
                Jaga Kesehatan Mental Anda Bersama CalmQuest
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Platform terapi digital yang membantu Anda mengelola kesehatan mental dengan mudah, 
                aman, dan terpercaya. Dilengkapi dengan assessment mental dan analisis emosi menggunakan AI.
              </p>
              <Link href="/assessment">
                <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 rounded-full text-lg flex items-center group">
                  Mulai Assessment
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-lg h-96 bg-purple-200 rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-purple-700">Illustration Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Fitur Unggulan Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="h-8 w-8 text-purple-700" />}
              title="Assessment Mental"
              description="Evaluasi kondisi mental Anda menggunakan tools standar psikologi (PSS & BDI)"
            />
            <FeatureCard 
              icon={<Smile className="h-8 w-8 text-purple-700" />}
              title="Deteksi Emosi"
              description="Analisis ekspresi wajah real-time menggunakan teknologi AI canggih"
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-purple-700" />}
              title="Rekomendasi Personal"
              description="Dapatkan saran dan rekomendasi yang dipersonalisasi sesuai kondisi Anda"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-purple-50">
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

      {/* Fitur Relaksasi */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Fitur Relaksasi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-purple-700" />}
              title="Meditasi"
              description="Dengarkan panduan meditasi yang membantu menenangkan pikiran"
            />
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-purple-700" />}
              title="Musik Terapi"
              description="Dengarkan musik terapi yang membantu meredakan stres dan kecemasan"
            />
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-purple-700" />}
              title="Game Santai"
              description="Mainkan game santai yang dirancang khusus untuk meredakan mental health"
            />
          </div>
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

// Component untuk Feature Card
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Component untuk Steps
const Step = ({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
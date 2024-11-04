import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronRight, Brain, Smile, Clock, Heart, Users, Activity, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import hero from '../../public/hero-image.svg';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-100 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-6">
                Jaga Kesehatan Mental Anda Bersama CalmQuest
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Platform terapi digital yang membantu Anda mengelola kesehatan mental dengan mudah, 
                aman, dan terpercaya. Dilengkapi dengan assessment mental dan analisis emosi menggunakan AI.
              </p>
              <div className="flex gap-4">
                <Link href="/assessment">
                  <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 rounded-full text-lg flex items-center group">
                    Mulai Assessment
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="px-8 py-6 rounded-full text-lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-lg h-96 rounded-2xl flex items-center justify-center">
                <Image 
                  src={hero}
                  alt="Hero Image"
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
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
              <div className="text-3xl font-bold mb-2">85%</div>
              <p className="text-purple-200">Bisa Pulih dengan Penanganan Tepat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-purple-50">
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
      <div className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Temukan Ketenangan Melalui Game Relaksasi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GameCard 
              title="Game Santai"
              description="Mainkan game santai yang dirancang khusus untuk meredakan stres dan kecemasan"
              icons={<Activity className="h-8 w-8 text-purple-700" />}
            />
            <GameCard 
              title="Game Meditasi"
              description="Nikmati meditasi singkat dan efektif untuk menenangkan pikiran dan tubuh"
              icons={<Brain className="h-8 w-8 text-purple-700" />}
            />
            <GameCard 
              title="Game Kognitif"
              description="Latih otak dan kognisi Anda dengan berbagai permainan kognitif menarik"
              icons={<Activity className="h-8 w-8 text-purple-700" />}
            />
          </div>
        </div>
      </div>

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

// Existing components remain the same
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs">
    <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const GameCard = ({ title, description, icons }) => (
  <div className="p-6 rounded-xl bg-white hover:shadow-lg transition-shadow">
    <div className="mb-4">
      {icons}
    </div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
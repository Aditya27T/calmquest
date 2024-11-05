import React from 'react';
import { Brain, Smile, Clock, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const FeaturesSection = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Fitur Unggulan Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Solusi komprehensif untuk kesehatan mental Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Interactive Feature List */}
          <div className="space-y-8">
            <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                  <Brain className="h-6 w-6 text-purple-600 group-hover:text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">Assessment Mental</h3>
                  <p className="text-gray-600">
                    Evaluasi kondisi mental menggunakan tools standar psikologi (PSS & BDI) 
                    dengan interface yang mudah digunakan.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                  <Smile className="h-6 w-6 text-purple-600 group-hover:text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">Deteksi Emosi</h3>
                  <p className="text-gray-600">
                    Analisis ekspresi wajah real-time menggunakan teknologi AI canggih 
                    untuk pemahaman emosi yang lebih baik.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                  <Clock className="h-6 w-6 text-purple-600 group-hover:text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">Rekomendasi Personal</h3>
                  <p className="text-gray-600">
                    Dapatkan saran dan rekomendasi yang dipersonalisasi berdasarkan 
                    hasil analisis kondisi Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Illustration */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-purple-100 rounded-3xl overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src="https://cdn.prod.website-files.com/5e9bc09705bf3a7e0e160744/5ea99b00414d1448a97d28aa_illust-whatismh-0-header.svg"
                  alt="Features Illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GamesSection = () => {
  return (
    <div className="py-24 bg-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Temukan Ketenangan Melalui Game Relaksasi
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Berbagai permainan interaktif yang dirancang untuk membantu meredakan stres dan meningkatkan kesejahteraan mental
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Main Featured Game */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-purple-800 to-purple-700 p-8 rounded-3xl shadow-xl">
              <div className="aspect-video relative rounded-xl overflow-hidden mb-6">
                <Image
                  src="/gamemeditasi.jpg"
                  alt="Featured Game"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Game Meditasi</h3>
              <p className="text-purple-200">
                Nikmati pengalaman meditasi interaktif dengan panduan suara dan visualisasi yang menenangkan
              </p>
            </div>
          </div>

          {/* Game List */}
          <div className="lg:w-1/2 grid gap-6">
          <Link href="/game/zen-garden">
            <GameCard
              title="Game Santai"
              description="Mainkan game santai yang dirancang khusus untuk meredakan stres"
              icon="🎮"
              color="from-blue-500 to-blue-600"
            />
            </Link>
            <Link href="/game/breath-flow">
              <GameCard
                title="Game Meditasi Dasar"
                description="Latihan meditasi sederhana untuk pemula"
                icon="🧘‍♂️"
                color="from-green-500 to-green-600"
              />
            </Link>
            <Link href="/game/memory-match">
              <GameCard
                title="Game Kognitif"
                description="Latih otak dengan permainan kognitif yang menarik"
                icon="🧠"
                color="from-orange-500 to-orange-600"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ title, description, icon, color }: any) => (
  <div className={`bg-gradient-to-r ${color} p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1`}>
    <div className="flex items-center">
      <span className="text-3xl mr-4">{icon}</span>
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-white text-opacity-90 text-sm">{description}</p>
      </div>
    </div>
  </div>
);
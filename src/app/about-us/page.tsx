'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const teamMembers = [
  {
    name: "Ambatukam",
    role: "Project Manager, Fullstack Developer, AI Engineer",
    description: "Bertanggung jawab atas manajemen proyek, pengembangan aplikasi, dan integrasi AI. Memastikan aplikasi berjalan dengan baik dan sesuai dengan kebutuhan pengguna.",
    image: "https://avatars.dicebear.com/api/avataaars/ambatukam.svg",
    responsibilities: [
      "Manajemen proyek",
        "Pengembangan backend",
        "Pengembangan frontend",
        "Integrasi AI",
        "Integrasi API",
        "Quality assurance"
    ]
  },
  {
    name: "Jane Smith",
    role: "Frontend Developer",
    description: "Mengembangkan antarmuka pengguna yang responsif dan interaktif. Fokus pada implementasi fitur-fitur frontend menggunakan Next.js dan TailwindCSS.",
    image: "https://avatars.dicebear.com/api/avataaars/jane-smith.svg",
    responsibilities: [
      "Implementasi UI/UX design",
      "Pengembangan komponen React",
      "Integrasi API",
      "Frontend testing"
    ]
  },
  {
    name: "David Wilson",
    role: "AI & Machine Learning Engineer",
    description: "Mengembangkan dan mengoptimalkan model AI untuk analisis emosi dan integrasi Gemini AI. Memastikan akurasi dan efisiensi sistem AI.",
    image: "https://avatars.dicebear.com/api/avataaars/david-wilson.svg",
    responsibilities: [
      "Pengembangan model AI",
      "Integrasi face-api.js",
      "Optimasi model",
      "Analisis data AI"
    ]
  },
  {
    name: "Sarah Chen",
    role: "Psychology Expert",
    description: "Memberikan expertise dalam aspek psikologi, memvalidasi assessment, dan memastikan rekomendasi yang diberikan sesuai dengan standar kesehatan mental.",
    image: "https://avatars.dicebear.com/api/avataaars/sarah-chen.svg",
    responsibilities: [
      "Validasi assessment PSS & BDI",
      "Pengembangan rekomendasi",
      "Konsultasi psikologi",
      "Quality control analisis"
    ]
  },
  {
    name: "Michael Brown",
    role: "Quality Assurance Engineer",
    description: "Memastikan kualitas aplikasi melalui testing menyeluruh, dokumentasi, dan pemantauan performa sistem.",
    image: "https://avatars.dicebear.com/api/avataaars/michael-brown.svg",
    responsibilities: [
      "Testing dan QA",
      "Dokumentasi teknis",
      "Performance monitoring",
      "Bug tracking dan reporting"
    ]
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Beranda
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Tim CalmQuest
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami adalah tim multidisiplin yang berkomitmen untuk mengembangkan solusi 
            kesehatan mental yang inovatif dan mudah diakses. Setiap anggota tim membawa 
            keahlian unik untuk menciptakan pengalaman yang optimal bagi pengguna.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover bg-purple-100"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-purple-900">{member.name}</h3>
                    <p className="text-sm text-purple-600">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {member.description}
                </p>
                <div>
                  <h4 className="font-medium text-purple-900 mb-2">Tanggung Jawab:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {member.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            Mari Berkolaborasi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami selalu terbuka untuk umpan balik dan saran untuk meningkatkan layanan kami.
            Kesehatan mental Anda adalah prioritas kami.
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const teamMembers = [
  {
    name: "Dea Alensa",
    role: "Project Manager",
    image: "https://pbs.twimg.com/media/GYUnJB8bkAADhnH.jpg"
  },
  {
    name: "Aditya Eka Rahmadani",
    role: "Fullstack Developer",
    image: "https://pbs.twimg.com/media/GYUnJB8bkAADhnH.jpg"
  },
  {
    name: "Amelia Novelinda",
    role: "Desain Grafis",
    image: "https://pbs.twimg.com/media/GYUnJB8bkAADhnH.jpg"
  },
  {
    name: "Fajar Pramudya Ananta Purba",
    role: "UI/UX Designer",
    image: "https://pbs.twimg.com/media/GYUnJB8bkAADhnH.jpg"
  },
  {
    name: "Januarta Madi Pratama Putra",
    role: "Quality Assurance And Documentation",
    image: "https://pbs.twimg.com/media/GYUnJB8bkAADhnH.jpg"
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
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="aspect-[4/3] w-full">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
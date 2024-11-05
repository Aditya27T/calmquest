'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image  from 'next/image';

const teamMembers = [
  {
    name: "Dea Alensa",
    role: "Project Manager",
    image: "https://i.ibb.co.com/9H5WLNc/Whats-App-Image-2024-11-05-at-15-41-06.jpg"
  },
  {
    name: "Aditya Eka Rahmadani",
    role: "Fullstack Developer",
    image: "https://i.ibb.co.com/KXD8QSG/Whats-App-Image-2024-11-05-at-08-50-59.jpg",
    objectFit: "auto",
  },
  {
    name: "Amelia Novelinda",
    role: "Desain Grafis",
    image: "https://i.ibb.co.com/ky7B2CM/Whats-App-Image-2024-11-05-at-15-20-11.jpg"
  },
  {
    name: "Fajar Pramudya Ananta Purba",
    role: "UI/UX Designer",
    image: "https://i.ibb.co.com/6Wpt4Pd/image.png",
    objectFit: "cover",
  },
  {
    name: "Januarta Madi Pratama Putra",
    role: "Quality Assurance And Documentation",
    image: "https://i.ibb.co.com/DrRzLDB/Whats-App-Image-2024-11-05-at-15-15-13.jpg"
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
            <div key={index} className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
              {/* Image */}
              <div className="relative h-60 md:h-80">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  layout="fill"
                  objectFit={member.objectFit || "cover"}
                  className="rounded-t-3xl"
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
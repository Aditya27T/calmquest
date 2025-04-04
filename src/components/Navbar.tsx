'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import logo from '@/../public/logo-calmquest.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEmergencyClick = () => {
    router.push('/emergency');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white via-white to-purple-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src={logo}
                alt="CalmQuest Logo"
                width={150}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-purple-700 transition-colors">
                Beranda
              </Link>
              <Link href="/game" className="text-gray-600 hover:text-purple-700 transition-colors">
                Game
              </Link>
              <Link href="/articles" className="text-gray-600 hover:text-purple-700 transition-colors">
                Artikel
              </Link>
              <Link href="/about-us" className="text-gray-600 hover:text-purple-700 transition-colors">
                Tentang Kami
              </Link>
              <Button 
                onClick={handleEmergencyClick} 
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full"
              >
                Kontak Penting
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-purple-700 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 bg-gradient-to-b from-white to-purple-50 absolute left-0 right-0 shadow-lg">
              <div className="flex flex-col space-y-4 container mx-auto px-4">
                <Link 
                  href="/"
                  className="text-gray-600 hover:text-purple-700 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Beranda
                </Link>
                <Link 
                  href="/game"
                  className="text-gray-600 hover:text-purple-700 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Game
                </Link>
                <Link href="/articles" className="text-gray-600 hover:text-purple-700 transition-colors px-2 py-1">
                  Artikel
              </Link>
                <Link 
                  href="/about-us"
                  className="text-gray-600 hover:text-purple-700 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tentang Kami
                </Link>
                <Button 
                  onClick={() => {
                    handleEmergencyClick();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full"
                >
                  Kontak Penting
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer untuk mencegah konten tertutup navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
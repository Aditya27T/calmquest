'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Menu,
  X,
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-b from-white-100 to-purple shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-purple-700" />
            <span className="text-2xl font-bold text-purple-700">CalmQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-purple-700 transition-colors">
              Beranda
            </Link>
            <Link href="/game" className="text-gray-600 hover:text-purple-700 transition-colors">
              Game
            </Link>
            <Link href="/about-us" className="text-gray-600 hover:text-purple-700 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/assessment">
              <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full">
                Hubungi Kami
              </Button>
            </Link>
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
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
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
              <Link 
                href="/about"
                className="text-gray-600 hover:text-purple-700 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link 
                href="/assessment"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full">
                  Mulai Assessment
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Gamepad, Sun } from 'lucide-react';
import Link from 'next/link';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
          Game Terapi
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Pilih kategori game yang sesuai dengan kebutuhan Anda. Setiap game dirancang 
          untuk membantu meredakan stress, melatih kognitif, atau sekedar relaksasi.
        </p>

        <Tabs defaultValue="relaxation" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="relaxation" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Relaksasi
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Kognitifs
            </TabsTrigger>
            <TabsTrigger value="casual" className="flex items-center gap-2">
              <Gamepad className="h-4 w-4" />
              Santai
            </TabsTrigger>
          </TabsList>

          {/* Relaxation Tab */}
          <TabsContent value="relaxation">
            <div className="flex justify-center">
              <div className="w-full max-w-xl">
                <GameCard
                  title="Breath Flow"
                  description="Latihan pernapasan interaktif dengan visualisasi yang menenangkan"
                  route="/game/breath-flow"
                  difficulty="Mudah"
                  duration="1 menit"
                />
              </div>
            </div>
          </TabsContent>

          {/* Cognitive Tab */}
          <TabsContent value="cognitive">
            <div className="flex justify-center">
              <div className="w-full max-w-xl">
                <GameCard
                  title="Memory Match"
                  description="Latih memori Anda dengan mencocokkan kartu dengan pola yang menenangkan"
                  route="/game/memory-match"
                  difficulty="Sedang"
                  duration="10-15 menit"
                />
              </div>
            </div>
          </TabsContent>

          {/* Casual Tab */}
          <TabsContent value="casual">
            <div className="flex justify-center">
              <div className="w-full max-w-xl">
                <GameCard
                  title="Zen Garden"
                  description="Bangun dan rawat taman zen digital Anda untuk relaksasi"
                  route="/game/zen-garden"
                  difficulty="Mudah"
                  duration="Bebas"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Mainkan game ini secara rutin untuk hasil yang optimal. Jika Anda merasa 
            stress berlebih, jangan ragu untuk menghubungi profesional kesehatan mental.
          </p>
        </div>
      </div>
    </div>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  route: string;
  difficulty: string;
  duration: string;
}

const GameCard = ({ title, description, route, difficulty, duration }: GameCardProps) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Kesulitan: {difficulty}</span>
        <span>Durasi: {duration}</span>
      </div>
      <Link href={route}>
        <Button className="w-full bg-purple-700 hover:bg-purple-800">
          Mainkan Sekarang
        </Button>
      </Link>
    </CardContent>
  </Card>
);
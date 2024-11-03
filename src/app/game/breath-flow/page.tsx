'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import { ChevronLeft, Play, Pause, RefreshCw } from 'lucide-react';

const BREATH_PHASES = {
  INHALE: 'Tarik Nafas',
  HOLD: 'Tahan',
  EXHALE: 'Hembuskan',
  REST: 'Istirahat'
};

const PHASE_DURATIONS = {
  INHALE: 4000,
  HOLD: 4000,
  EXHALE: 4000,
  REST: 2000
};

export default function BreathFlowGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<keyof typeof BREATH_PHASES>('INHALE');
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (isPlaying) {
      const currentDuration = PHASE_DURATIONS[currentPhase];
      let startTime = Date.now();

      // Progress update timer
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / currentDuration) * 100;
        setProgress(Math.min(newProgress, 100));
      }, 16);

      // Phase change timer
      timer = setTimeout(() => {
        setProgress(0);
        
        // Update phase
        switch (currentPhase) {
          case 'INHALE':
            setCurrentPhase('HOLD');
            break;
          case 'HOLD':
            setCurrentPhase('EXHALE');
            break;
          case 'EXHALE':
            setCurrentPhase('REST');
            break;
          case 'REST':
            setCurrentPhase('INHALE');
            setCycleCount(prev => prev + 1);
            break;
        }
      }, currentDuration);

      // Update total time
      const timeInterval = setInterval(() => {
        setTotalTime(prev => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
        clearInterval(timeInterval);
      };
    }
  }, [isPlaying, currentPhase]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentPhase('INHALE');
    setProgress(0);
    setCycleCount(0);
    setTotalTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link 
          href="/game" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Game
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
            Breath Flow
          </h1>

          <Card className="p-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 rounded-full border-4 border-purple-200 flex items-center justify-center mb-8 relative">
                <div 
                  className="w-48 h-48 rounded-full bg-purple-100 flex items-center justify-center"
                  style={{
                    transform: currentPhase === 'INHALE' ? 'scale(1.1)' : 
                             currentPhase === 'EXHALE' ? 'scale(0.9)' : 'scale(1)',
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  <span className="text-2xl font-medium text-purple-900">
                    {BREATH_PHASES[currentPhase]}
                  </span>
                </div>
                <Progress 
                  value={progress} 
                  className="absolute -bottom-4 w-48"
                />
              </div>

              <div className="flex gap-4 mb-8">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="bg-purple-700 hover:bg-purple-800"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  onClick={resetGame}
                  size="lg"
                  variant="outline"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Siklus Selesai</p>
                  <p className="text-2xl font-semibold text-purple-900">{cycleCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Waktu Total</p>
                  <p className="text-2xl font-semibold text-purple-900">{formatTime(totalTime)}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              Petunjuk Penggunaan
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>1. Tekan tombol play untuk memulai latihan pernapasan</li>
              <li>2. Ikuti petunjuk yang muncul di layar</li>
              <li>3. Fokus pada pernapasan Anda</li>
              <li>4. Lakukan minimal 5-10 siklus untuk hasil optimal</li>
              <li>5. Hentikan jika merasa pusing atau tidak nyaman</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
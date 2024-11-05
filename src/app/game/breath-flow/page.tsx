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
} as const;

type Phase = keyof typeof BREATH_PHASES;

// Adjusted timings for a complete cycle under 10 seconds
const PHASE_DURATIONS = {
  INHALE: 3000, // 3 seconds
  HOLD: 2000,   // 2 seconds
  EXHALE: 3000, // 3 seconds
  REST: 1000    // 1 second
} as const;

const TOTAL_TIME_LIMIT = 90; // 90 seconds = 1.5 minutes

export default function BreathFlowGame() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('INHALE');
  const [progress, setProgress] = useState<number>(0);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;
    let timeInterval: NodeJS.Timeout;

    if (isPlaying && !isTimeUp) {
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
      timeInterval = setInterval(() => {
        setTotalTime(prev => {
          const newTime = prev + 1;
          if (newTime >= TOTAL_TIME_LIMIT) {
            setIsTimeUp(true);
            setIsPlaying(false);
            return TOTAL_TIME_LIMIT;
          }
          return newTime;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
        clearInterval(timeInterval);
      };
    }
  }, [isPlaying, currentPhase, isTimeUp]);

  const togglePlay = () => {
    if (isTimeUp) {
      resetGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentPhase('INHALE');
    setProgress(0);
    setCycleCount(0);
    setTotalTime(0);
    setIsTimeUp(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timeLeft = TOTAL_TIME_LIMIT - totalTime;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="max-w-md mx-auto">
        <Link 
          href="/game" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Game
        </Link>

        <h1 className="text-3xl font-bold text-purple-900 text-center mb-6">
          Breath Flow
        </h1>

        <Card className="p-6 mb-6 shadow-lg">
          <div className="flex flex-col items-center">
            {/* Main breathing circle with pulsing animation */}
            <div className="relative w-56 h-56 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200" />
              <div 
                className={`absolute inset-4 rounded-full bg-purple-100 flex items-center justify-center transform transition-all duration-1000 ease-in-out ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{
                  transform: currentPhase === 'INHALE' ? 'scale(1.1)' : 
                           currentPhase === 'EXHALE' ? 'scale(0.9)' : 'scale(1)',
                }}
              >
                <div className="text-center px-4">
                  {isTimeUp ? (
                    <span className="text-xl font-medium text-purple-900">
                      Waktu Habis!
                    </span>
                  ) : (
                    <>
                      <span className="text-xl font-medium text-purple-900">
                        {BREATH_PHASES[currentPhase]}
                      </span>
                      <div className="text-sm text-purple-600 mt-2">
                        {formatTime(timeLeft)}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="100"
                  cx="112"
                  cy="112"
                />
                <circle
                  className="text-purple-500 transition-all duration-150"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="100"
                  cx="112"
                  cy="112"
                  strokeDasharray={`${progress * 6.28} 628`}
                />
              </svg>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-purple-700 hover:bg-purple-800 w-16 h-16 rounded-full"
              >
                {isTimeUp ? (
                  <RefreshCw className="h-6 w-6" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button
                onClick={resetGame}
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full"
              >
                <RefreshCw className="h-6 w-6" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Siklus</p>
                <p className="text-3xl font-semibold text-purple-900">{cycleCount}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Sisa</p>
                <p className="text-3xl font-semibold text-purple-900">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-purple-50 border-none">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            Petunjuk Penggunaan
          </h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• Tekan tombol play untuk memulai latihan</li>
            <li>• Ikuti ritme pernapasan yang ditampilkan</li>
            <li>• Fokus pada pernapasan Anda</li>
            <li>• Latihan akan selesai dalam 1,5 menit</li>
            <li>• Berhenti jika merasa tidak nyaman</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
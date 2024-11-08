// src/app/game/zen-garden/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Link from 'next/link';
import { ChevronLeft, Save, Undo, RefreshCw, Music, Music2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Point {
  x: number;
  y: number;
}

interface Element {
  type: 'rock' | 'plant';
  x: number;
  y: number;
  size: number;
}

export default function ZenGardenGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<Element[]>([]);
  const [tool, setTool] = useState<'rake' | 'rock' | 'plant'>('rake');
  const [rakePattern, setRakePattern] = useState<'wave' | 'circle' | 'straight'>('wave');
  const [elementSize, setElementSize] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize audio
  useEffect(() => {
    let mounted = true;
    const audio = new Audio('/audio/zen-background.mp3');
    
    const handleError = (e: Event) => {
      if (!mounted) return;
      
      const audioElement = e.target as HTMLAudioElement;
      let errorMessage = 'Unknown audio error';
      
      if (audioElement.error) {
        switch (audioElement.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = 'Audio playback was aborted';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error while loading audio';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = 'Audio decoding error';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Audio format not supported';
            break;
        }
      }
      
      setAudioError(errorMessage);
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      if (!mounted) return;
      setAudioError(null);
      setIsLoading(false);
      audioRef.current = audio;
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.loop = true;
    audio.load();

    if (audio.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      mounted = false;
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        }).catch(() => {});
      } else if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      audioRef.current = null;
    };
  }, []);

  // Handle canvas resize
 // Handle canvas resize
useEffect(() => {
  const handleResize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set canvas size based on container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Redraw canvas contents
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawBackground(ctx);
      drawElements(ctx);
    }
  };

  // Initial setup
  handleResize();

  // Add resize listener
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [elements]);

  const toggleMusic = async () => {
    if (!audioRef.current || audioError || isLoading) return;

    try {
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }

      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        playPromiseRef.current = null;
      } else {
        playPromiseRef.current = audioRef.current.play();
        try {
          await playPromiseRef.current;
          setIsPlaying(true);
        } finally {
          playPromiseRef.current = null;
        }
      }
    } catch (error) {
      setAudioError(error instanceof Error ? error.message : 'Audio playback failed');
      setIsPlaying(false);
      playPromiseRef.current = null;
    }
  };

  const getCanvasPoint = (clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#f5e6d3';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawRock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x + 2, y + 2, size, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Rock
    ctx.fillStyle = '#666666';
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawPlant = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.strokeStyle = '#4a9c5d';
    ctx.lineWidth = 2;

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(x - size/2 + i * size/4, y + size/2);
      ctx.quadraticCurveTo(
        x - size/4 + i * size/4,
        y - size/2,
        x + i * size/4,
        y + size/2
      );
      ctx.stroke();
    }
  };

  const drawRakeLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) => {
    ctx.strokeStyle = '#e6d5c3';
    ctx.lineWidth = 2;
    
    if (rakePattern === 'wave') {
      ctx.beginPath();
      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const steps = Math.floor(distance / 10);
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t + Math.sin(i * 0.5) * 5;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else if (rakePattern === 'circle') {
      ctx.beginPath();
      ctx.arc(endX, endY, 20, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  };

  const drawElements = (ctx: CanvasRenderingContext2D) => {
    elements.forEach(element => {
      if (element.type === 'rock') {
        drawRock(ctx, element.x, element.y, element.size);
      } else {
        drawPlant(ctx, element.x, element.y, element.size);
      }
    });
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx);
    drawElements(ctx);
  };

  const clearCanvas = () => {
    setElements([]);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx);
  };

  // Mouse/Touch Event Handlers
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    const point = e instanceof MouseEvent || 'button' in e
      ? getCanvasPoint(e.clientX, e.clientY)
      : getCanvasPoint(e.touches[0].clientX, e.touches[0].clientY);

    if (tool === 'rake') {
      setIsDrawing(true);
      setLastPoint(point);
    } else {
      setElements(prev => [...prev, { type: tool, ...point, size: elementSize }]);
      redrawCanvas();
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    if (!isDrawing || !lastPoint) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const point = e instanceof MouseEvent || 'button' in e
      ? getCanvasPoint(e.clientX, e.clientY)
      : getCanvasPoint(e.touches[0].clientX, e.touches[0].clientY);

    drawRakeLine(ctx, lastPoint.x, lastPoint.y, point.x, point.y);
    setLastPoint(point);
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-4 md:py-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <Link 
            href="/game" 
            className="inline-flex items-center text-purple-700 hover:text-purple-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Kembali ke Game</span>
            <span className="sm:hidden">Kembali</span>
          </Link>
          <Button
            onClick={toggleMusic}
            variant="outline"
            className="flex items-center gap-2"
            disabled={!!audioError || isLoading}
          >
            {isPlaying ? (
              <>
                <Music2 className="h-4 w-4" />
                <span className="hidden sm:inline">Musik On</span>
              </>
            ) : (
              <>
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Musik Off</span>
              </>
            )}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-900 text-center mb-4 md:mb-8">
            Zen Sand Garden
          </h1>

          <Card className="mb-4 md:mb-8">
            <div className="p-2 md:p-4 flex flex-wrap gap-2 md:gap-4">
              <Select value={tool} onValueChange={(value: 'rake' | 'rock' | 'plant') => setTool(value)}>
                <SelectTrigger className="w-[140px] md:w-[180px]">
                  <SelectValue placeholder="Pilih Alat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rake">Sisir Pasir</SelectItem>
                  <SelectItem value="rock">Batu</SelectItem>
                  <SelectItem value="plant">Tanaman</SelectItem>
                </SelectContent>
              </Select>

              {tool === 'rake' && (
                <Select value={rakePattern} onValueChange={(value: 'wave' | 'circle' | 'straight') => setRakePattern(value)}>
                  <SelectTrigger className="w-[140px] md:w-[180px]">
                    <SelectValue placeholder="Pilih Pola" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wave">Gelombang</SelectItem>
                    <SelectItem value="circle">Lingkaran</SelectItem>
                    <SelectItem value="straight">Lurus</SelectItem>
                  </SelectContent>
                </Select>
              )}

{(tool === 'rock' || tool === 'plant') && (
  <div className="flex items-center gap-2 md:gap-4 flex-1">
    <span className="text-sm text-gray-500 whitespace-nowrap">Ukuran:</span>
    <Slider
      value={[elementSize]}
      onValueChange={(value) => setElementSize(value[0])}
      min={10}
      max={40}
      step={1}
      className="w-full max-w-[200px]"
    />
  </div>
)}

<Button variant="outline" onClick={clearCanvas} className="w-full sm:w-auto">
  <RefreshCw className="h-4 w-4 mr-2" />
  <span className="hidden sm:inline">Bersihkan</span>
  <span className="sm:hidden">Reset</span>
</Button>
            </div>
          </Card>

          <div 
            ref={containerRef} 
            className="aspect-video relative mb-4 md:mb-8 bg-gray-50"
            style={{ maxHeight: '70vh' }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full border-2 border-gray-200 rounded-lg cursor-crosshair touch-none"
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />
          </div>

          <Card className="p-4 md:p-6 bg-purple-50">
            <h3 className="text-lg font-semibold text-purple-900 mb-3 md:mb-4">
              Petunjuk
            </h3>
            <ul className="text-sm md:text-base text-gray-600 space-y-1.5 md:space-y-2">
              <li>1. Pilih alat: sisir pasir, batu, atau tanaman</li>
              <li>2. Untuk sisir pasir, pilih pola yang diinginkan</li>
              <li>3. Untuk batu dan tanaman, atur ukuran sesuai keinginan</li>
              <li>4. Sentuh dan geser untuk membuat pola di pasir</li>
              <li>5. Sentuh untuk menempatkan batu atau tanaman</li>
              <li>6. Nikmati proses meditasi melalui kreasi taman zen Anda</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

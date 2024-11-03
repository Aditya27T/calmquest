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
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<Element[]>([]);
  const [tool, setTool] = useState<'rake' | 'rock' | 'plant'>('rake');
  const [rakePattern, setRakePattern] = useState<'wave' | 'circle' | 'straight'>('wave');
  const [elementSize, setElementSize] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/sounds/zen-background.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initial sand background
    drawBackground(ctx);
    
    // Draw elements
    drawElements(ctx);
  }, []);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#f5e6d3'; // Sand color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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

  const drawRock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.fillStyle = '#666666';
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x + 2, y + 2, size, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawPlant = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.fillStyle = '#4a9c5d';
    // Draw multiple grass-like strokes
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(x - size/2 + i * size/4, y + size/2);
      ctx.quadraticCurveTo(
        x - size/4 + i * size/4,
        y - size/2,
        x + i * size/4,
        y + size/2
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#4a9c5d';
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

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'rake') {
      setIsDrawing(true);
      setLastPoint({ x, y });
    } else {
      setElements(prev => [...prev, { type: tool, x, y, size: elementSize }]);
      redrawCanvas();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawRakeLine(ctx, lastPoint.x, lastPoint.y, x, y);
    setLastPoint({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/game" 
            className="inline-flex items-center text-purple-700 hover:text-purple-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Game
          </Link>
          <Button
            onClick={toggleMusic}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Music2 className="h-4 w-4" />
                Musik On
              </>
            ) : (
              <>
                <Music className="h-4 w-4" />
                Musik Off
              </>
            )}
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
            Zen Sand Garden
          </h1>

          <Card className="mb-8">
            <div className="p-4 flex flex-wrap gap-4">
              <Select value={tool} onValueChange={(value: 'rake' | 'rock' | 'plant') => setTool(value)}>
                <SelectTrigger className="w-[180px]">
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
                  <SelectTrigger className="w-[180px]">
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
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-sm text-gray-500">Ukuran:</span>
                  <Slider
                    value={[elementSize]}
                    onValueChange={(value) => setElementSize(value[0])}
                    min={10}
                    max={40}
                    step={1}
                  />
                </div>
              )}

              <Button variant="outline" onClick={clearCanvas}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Bersihkan
              </Button>
            </div>
          </Card>

          <div className="aspect-video relative mb-8">
            <canvas
              ref={canvasRef}
              className="w-full h-full border-2 border-gray-200 rounded-lg cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>

          <Card className="p-6 bg-purple-50">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              Petunjuk
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>1. Pilih alat yang ingin digunakan: sisir pasir, batu, atau tanaman</li>
              <li>2. Untuk sisir pasir, pilih pola yang diinginkan</li>
              <li>3. Untuk batu dan tanaman, atur ukuran yang diinginkan</li>
              <li>4. Klik dan geser untuk membuat pola di pasir</li>
              <li>5. Klik untuk menempatkan batu atau tanaman</li>
              <li>6. Nikmati proses meditasi melalui kreasi taman zen Anda</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
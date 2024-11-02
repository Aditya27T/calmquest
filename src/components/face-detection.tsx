'use client';

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type EmotionData = {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
};

export function FaceDetection() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      setIsModelLoading(false);
    } catch (error) {
      console.error('Error loading models:', error);
      alert('Gagal memuat model deteksi wajah. Silakan muat ulang halaman.');
    }
  };

  const captureEmotion = async (): Promise<EmotionData | null> => {
    if (!webcamRef.current?.video || !canvasRef.current) return null;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    try {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detection) {
        // Draw detection results
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const dims = faceapi.matchDimensions(canvas, video, true);
          const resizedDetection = faceapi.resizeResults(detection, dims);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
        }

        return {
          neutral: detection.expressions.neutral || 0,
          happy: detection.expressions.happy || 0,
          sad: detection.expressions.sad || 0,
          angry: detection.expressions.angry || 0,
          fearful: detection.expressions.fearful || 0,
          disgusted: detection.expressions.disgusted || 0,
          surprised: detection.expressions.surprised || 0
        };
      }
    } catch (error) {
      console.error('Error during detection:', error);
    }
    return null;
  };

  const startDetection = async () => {
    if (!webcamRef.current?.video) {
      alert('Kamera tidak tersedia. Pastikan Anda mengizinkan akses kamera.');
      return;
    }

    setIsAnalyzing(true);
    setDetectionCount(0);

    const emotionResults: EmotionData[] = [];
    
    // Capture 3 samples with 1-second interval
    for (let i = 0; i < 3; i++) {
      setDetectionCount(i + 1);
      const emotion = await captureEmotion();
      if (emotion) {
        emotionResults.push(emotion);
      }
      if (i < 2) { // Don't wait after the last capture
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (emotionResults.length === 0) {
      setIsAnalyzing(false);
      alert('Tidak dapat mendeteksi emosi. Pastikan pencahayaan cukup dan wajah terlihat jelas.');
      return;
    }

    // Calculate average emotions
    const averageEmotions = emotionResults.reduce((acc, curr) => ({
      neutral: acc.neutral + curr.neutral / emotionResults.length,
      happy: acc.happy + curr.happy / emotionResults.length,
      sad: acc.sad + curr.sad / emotionResults.length,
      angry: acc.angry + curr.angry / emotionResults.length,
      fearful: acc.fearful + curr.fearful / emotionResults.length,
      disgusted: acc.disgusted + curr.disgusted / emotionResults.length,
      surprised: acc.surprised + curr.surprised / emotionResults.length
    }), {
      neutral: 0, happy: 0, sad: 0, angry: 0, 
      fearful: 0, disgusted: 0, surprised: 0
    });

    try {
      const previousAssessment = localStorage.getItem('assessmentResult');
      if (!previousAssessment) {
        alert('Hasil assessment tidak ditemukan. Silakan mulai dari awal.');
        router.push('/assessment');
        return;
      }

      const assessmentData = JSON.parse(previousAssessment);
      
      // Find dominant emotion
      const dominantEmotion = Object.entries(averageEmotions)
        .reduce((a, b) => b[1] > a[1] ? b : a)[0];

      // Save combined results
      const result = {
        ...assessmentData,
        emotionAnalysis: {
          details: averageEmotions,
          dominant: dominantEmotion,
          samples: emotionResults
        }
      };

      localStorage.setItem('assessmentResult', JSON.stringify(result));
      
      // Proceed to result/analysis page
      router.push('/result');

    } catch (error) {
      console.error('Error saving results:', error);
      alert('Terjadi kesalahan saat menyimpan hasil. Silakan coba lagi.');
    }

    setIsAnalyzing(false);
  };

  if (isModelLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="text-purple-800">Memuat model deteksi wajah...</p>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-full max-w-lg aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <Webcam
            ref={webcamRef}
            mirrored
            className="w-full h-full object-cover"
            onUserMediaError={() => {
              alert('Tidak dapat mengakses kamera. Pastikan Anda mengizinkan akses kamera.');
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
          {isAnalyzing && (
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow">
              <p className="text-sm text-purple-800">
                Menganalisis: {detectionCount}/3
              </p>
            </div>
          )}
        </div>

        {!isAnalyzing && (
          <Button
            onClick={startDetection}
            className="bg-purple-700 hover:bg-purple-800"
            size="lg"
          >
            Mulai Deteksi Emosi
          </Button>
        )}
        
        <p className="text-sm text-gray-600 text-center max-w-md">
          Pastikan wajah Anda terlihat jelas di kamera dan pencahayaan cukup.
          Sistem akan mengambil 3 sampel ekspresi wajah Anda.
        </p>
      </div>
    </Card>
  );
}
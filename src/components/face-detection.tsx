'use client';

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Camera } from 'lucide-react';

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
  const [cameraError, setCameraError] = useState(false);

  // Video constraints untuk kualitas dan performa yang lebih baik
  const videoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user",
    frameRate: { ideal: 30 }
  };

  useEffect(() => {
    loadModels();
    // Tambahkan event listener untuk orientasi
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const handleOrientationChange = () => {
    // Berikan waktu untuk orientasi berubah
    setTimeout(() => {
      if (webcamRef.current && webcamRef.current.video) {
        const video = webcamRef.current.video;
        if (canvasRef.current) {
          canvasRef.current.width = video.videoWidth;
          canvasRef.current.height = video.videoHeight;
        }
      }
    }, 100);
  };

  const loadModels = async () => {
    try {
      const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
      await Promise.all([
        faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
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
        .detectSingleFace(video, new faceapi.MtcnnOptions({ minFaceSize: 100 }))
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detection) {
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
    
    for (let i = 0; i < 10; i++) {
      setDetectionCount(i + 1);
      const emotion = await captureEmotion();
      if (emotion) {
        emotionResults.push(emotion);
      }
      if (i < 9) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (emotionResults.length === 0) {
      setIsAnalyzing(false);
      alert('Tidak dapat mendeteksi emosi. Pastikan pencahayaan cukup dan wajah terlihat jelas.');
      return;
    }

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
      const dominantEmotion = Object.entries(averageEmotions)
        .reduce((a, b) => b[1] > a[1] ? b : a)[0];

      const result = {
        ...assessmentData,
        emotionAnalysis: {
          details: averageEmotions,
          dominant: dominantEmotion,
          samples: emotionResults
        }
      };

      localStorage.setItem('assessmentResult', JSON.stringify(result));
      router.push('/result');

    } catch (error) {
      console.error('Error saving results:', error);
      alert('Terjadi kesalahan saat menyimpan hasil. Silakan coba lagi.');
    }

    setIsAnalyzing(false);
  };

  if (isModelLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
        <p className="text-purple-800 text-lg">Memuat model deteksi wajah...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <div className="relative w-full">
          {/* Camera Container */}
          <div className="relative aspect-[3/4] md:aspect-video w-full bg-black rounded-t-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              mirrored
              videoConstraints={videoConstraints}
              className="absolute inset-0 w-full h-full object-cover"
              onUserMediaError={() => {
                setCameraError(true);
                alert('Tidak dapat mengakses kamera. Pastikan Anda mengizinkan akses kamera.');
              }}
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            {/* Counter Overlay */}
            {isAnalyzing && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                <p className="text-base font-medium text-purple-800">
                  {detectionCount}/10
                </p>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="p-6 space-y-6">
            {!isAnalyzing && (
              <Button
                onClick={startDetection}
                className="w-full py-6 text-lg bg-purple-700 hover:bg-purple-800 shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                size="lg"
                disabled={cameraError}
              >
                <Camera className="h-6 w-6" />
                Mulai Deteksi Emosi
              </Button>
            )}
            
            <div className="text-center">
              <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
                Pastikan wajah Anda terlihat jelas di kamera dan pencahayaan cukup.
                Sistem akan mengambil 10 sampel ekspresi wajah Anda.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
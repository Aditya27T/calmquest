// src/app/api/training/save/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { TrainingMessage, TrainingData } from '@/types';

const TRAINING_FILE_PATH = path.join(process.cwd(), 'public/cache/training-data.json');

// Helper function untuk inisialisasi data
const initializeTrainingData = (): TrainingData => ({
  conversations: [],
  metadata: {
    lastUpdated: new Date(),
    totalConversations: 0,
    performanceMetrics: {
      averageEffectiveness: 0,
      stressLevelDistribution: {
        low: 0,
        medium: 0,
        high: 0
      }
    }
  }
});

export async function POST(req: Request) {
  try {
    // Validasi request
    if (!req.body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const newData: TrainingMessage = await req.json();

    // Validasi data training
    if (!newData.userMessage || !newData.botResponse || !newData.stressLevel) {
      return NextResponse.json({ 
        error: 'Invalid training data' 
      }, { status: 400 });
    }

    // Baca atau inisialisasi file training
    let existingData: TrainingData;
    try {
      const fileContent = await fs.readFile(TRAINING_FILE_PATH, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      existingData = initializeTrainingData();
    }

    // Pastikan struktur data valid
    if (!existingData.conversations) {
      existingData.conversations = [];
    }

    // Tambah data baru
    existingData.conversations.push(newData);

    // Update metadata
    existingData.metadata = {
      lastUpdated: new Date(),
      totalConversations: existingData.conversations.length,
      performanceMetrics: {
        averageEffectiveness: calculateAverageEffectiveness(existingData.conversations),
        stressLevelDistribution: calculateStressDistribution(existingData.conversations)
      }
    };

    // Simpan ke file
    await fs.writeFile(
      TRAINING_FILE_PATH,
      JSON.stringify(existingData, null, 2)
    );

    return NextResponse.json({ 
      success: true,
      metadata: existingData.metadata 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error saving training data:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to save training data' 
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Helper functions
function calculateAverageEffectiveness(conversations: TrainingMessage[]): number {
  const validEffectiveness = conversations
    .filter(msg => typeof msg.effectiveness === 'number')
    .map(msg => msg.effectiveness as number);

  if (validEffectiveness.length === 0) return 0;
  return validEffectiveness.reduce((a, b) => a + b, 0) / validEffectiveness.length;
}

function calculateStressDistribution(conversations: TrainingMessage[]) {
  return {
    low: conversations.filter(msg => msg.stressLevel === 'low').length,
    medium: conversations.filter(msg => msg.stressLevel === 'medium').length,
    high: conversations.filter(msg => msg.stressLevel === 'high').length
  };
}
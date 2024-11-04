import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Fungsi helper untuk generate ID yang lebih unik
export function generateUniqueId(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${prefix}-${timestamp}-${random}`;
}

export async function analyzeStressLevel(content: string): Promise<'low' | 'medium' | 'high'> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
    Analisis tingkat stres dari teks berikut dan klasifikasikan sebagai 'low', 'medium', atau 'high'.
    Berikan respons hanya dengan satu kata: 'low', 'medium', atau 'high'.
    
    Teks: "${content}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().toLowerCase().trim();
    
    if (text.includes('low')) return 'low';
    if (text.includes('medium')) return 'medium';
    if (text.includes('high')) return 'high';
    
    return 'medium'; // default fallback
  } catch (error) {
    console.error('Error analyzing stress level:', error);
    return 'medium';
  }
}

export async function generateResponse(
  content: string, 
  stressLevel: 'low' | 'medium' | 'high'
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
    Kamu adalah asisten kesehatan mental yang empatik dan suportif. 
    Berikan respons yang mendukung untuk pesan berikut.
    Tingkat stres pengguna: ${stressLevel}
    
    Panduan respons:
    - Gunakan bahasa yang empatik dan suportif
    - Berikan afirmasi positif
    - Tawarkan saran praktis jika sesuai
    - Gunakan bahasa Indonesia yang natural
    - Respons tidak boleh lebih dari 2-3 kalimat
    - Jika tingkat stres tinggi, sarankan untuk mencari bantuan profesional
    
    Pesan pengguna: "${content}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return "Maaf, saya sedang mengalami kesulitan teknis. Bagaimana jika Anda mencoba menjelaskan lebih lanjut tentang perasaan Anda?";
  }
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  stressLevel?: 'low' | 'medium' | 'high';
  needsFeedback?: boolean;
  feedback?: boolean;
  isWarning?: boolean;
  messageType?: 'normal' | 'warning' | 'error';
}

export interface TrainingMessage {
  id: string;  // Menambahkan id untuk TrainingMessage
  userMessage: string;
  botResponse: string;
  stressLevel: 'low' | 'medium' | 'high';
  effectiveness?: number;
  timestamp: Date;
  sessionId: string;
  messageType: 'normal' | 'bad-words' | 'irrelevant' | 'unclear';
}

// Fungsi helper untuk membuat pesan baru
export function createMessage(params: {
  content: string;
  sender: 'user' | 'bot';
  stressLevel?: 'low' | 'medium' | 'high';
  isWarning?: boolean;
  messageType?: 'normal' | 'warning' | 'error';
}): Message {
  return {
    id: generateUniqueId(params.sender),
    content: params.content,
    sender: params.sender,
    timestamp: new Date(),
    stressLevel: params.stressLevel,
    isWarning: params.isWarning || false,
    messageType: params.messageType || 'normal',
    needsFeedback: params.sender === 'bot',
    feedback: undefined
  };
}

// Fungsi helper untuk membuat training message
export function createTrainingMessage(params: {
  userMessage: string;
  botResponse: string;
  stressLevel: 'low' | 'medium' | 'high';
  sessionId: string;
  messageType?: 'normal' | 'bad-words' | 'irrelevant' | 'unclear';
}): TrainingMessage {
  return {
    id: generateUniqueId('training'),
    userMessage: params.userMessage,
    botResponse: params.botResponse,
    stressLevel: params.stressLevel,
    timestamp: new Date(),
    sessionId: params.sessionId,
    messageType: params.messageType || 'normal',
    effectiveness: undefined
  };
}
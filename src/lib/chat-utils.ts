// src/lib/chat-utils.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

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
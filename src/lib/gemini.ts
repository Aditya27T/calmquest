import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

type AssessmentResult = {
  pss: {
    score: number;
    level: string;
    message: string;
  };
  bdi: {
    score: number;
    level: string;
    message: string;
  };
  emotionAnalysis: {
    details: {
      neutral: number;
      happy: number;
      sad: number;
      angry: number;
      fearful: number;
      disgusted: number;
      surprised: number;
    };
    dominant: string;
  };
};

export async function analyzeResults(results: AssessmentResult) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analisis kondisi kesehatan mental seseorang berdasarkan data berikut sebagai seorang psikolog profesional. Berikan analisis yang mendalam namun tetap empatik dan mudah dipahami.

Data Assessment:
1. PSS (Tingkat Stres):
- Skor: ${results.pss.score}
- Level: ${results.pss.level}

2. BDI (Tingkat Depresi):
- Skor: ${results.bdi.score}
- Level: ${results.bdi.level}

3. Analisis Emosi Wajah:
- Emosi Dominan: ${results.emotionAnalysis.dominant}
- Detail Emosi:
  • Netral: ${(results.emotionAnalysis.details.neutral * 100).toFixed(1)}%
  • Bahagia: ${(results.emotionAnalysis.details.happy * 100).toFixed(1)}%
  • Sedih: ${(results.emotionAnalysis.details.sad * 100).toFixed(1)}%
  • Marah: ${(results.emotionAnalysis.details.angry * 100).toFixed(1)}%
  • Takut: ${(results.emotionAnalysis.details.fearful * 100).toFixed(1)}%
  • Jijik: ${(results.emotionAnalysis.details.disgusted * 100).toFixed(1)}%
  • Terkejut: ${(results.emotionAnalysis.details.surprised * 100).toFixed(1)}%

Berikan analisis dengan format berikut, jangan sertakan label bagian (seperti "RINGKASAN KONDISI:"" dll) dalam respon, hasilkan dalam bentuk paragraf:

1. Ringkasan singkat dan jelas tentang kondisi mental saat ini berdasarkan ketiga hasil assessment. Jelaskan dengan 2-3 kalimat yang mudah dipahami.

2. Analisis mendalam tentang bagaimana tingkat stres (PSS) mempengaruhi tingkat depresi (BDI) dan bagaimana ini tercermin dalam ekspresi emosi yang terdeteksi. Jelaskan dalam 3-4 kalimat yang saling terkait.

3. Lima rekomendasi konkret dan praktis yang dapat langsung diterapkan untuk meningkatkan kesehatan mental, seperti:
- Aktivitas spesifik untuk manajemen stres
- Kegiatan untuk meningkatkan mood
- Aktivitas fisik yang sesuai
- Cara membangun dukungan sosial
- Rutinitas sehari-hari yang mendukung

4. Rekomendasi apakah perlu konsultasi dengan profesional atau tidak, sertakan alasan singkat dan spesifik.

Panduan penting:
- Gunakan bahasa yang empatik dan suportif
- Berikan informasi yang jelas dan dapat ditindaklanjuti
- Hindari istilah teknis yang rumit
- Pastikan setiap rekomendasi bersifat spesifik
- Jangan menggunakan simbol atau format yang rumit`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('Gemini response:', response);
    const text = response.text();
    
    const parts = text.split('\n\n');

    return {
      summary: parts[0]?.trim() || '',
      correlation: parts[1]?.trim() || '',
      recommendations: parts[2]?.split('\n')
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim()) || [],
      professionalHelp: parts[3]?.trim() || ''
    };

  } catch (error) {
    console.error('Error analyzing results with Gemini:', error);
    throw new Error('Gagal menganalisis hasil. Silakan coba lagi.');
  }
}
// Definisi interface untuk type safety
interface ContentAnalysis {
    isValid: boolean;
    warningType?: 'bad-words' | 'irrelevant' | 'unclear';
    response?: string;
  }
  
  // Daftar kata-kata terlarang dengan ID unik
  const badWords = [
    { id: 'bw1', word: 'anjing' },
    { id: 'bw2', word: 'bangsat' },
    { id: 'bw3', word: 'bajingan' },
    { id: 'bw4', word: 'kontol' },
    { id: 'bw5', word: 'memek' },
    { id: 'bw6', word: 'bego' },
    { id: 'bw7', word: 'tolol' },
    { id: 'bw8', word: 'goblok' },
    { id: 'bw9', word: 'idiot' },
    { id: 'bw10', word: 'tai' },
    { id: 'bw11', word: 'bacot' },
    { id: 'bw12', word: 'ngentot' }
  ].map(item => ({ ...item, word: item.word.toLowerCase() }));
  
  // Daftar kata kunci konten tidak relevan dengan ID unik
  const irrelevantKeywords = [
    { id: 'ir1', word: 'bokep' },
    { id: 'ir2', word: 'porn' },
    { id: 'ir3', word: 'judi' },
    { id: 'ir4', word: 'jackpot' },
    { id: 'ir5', word: 'seks' },
    { id: 'ir6', word: 'ngewe' },
    { id: 'ir7', word: 'togel' },
    { id: 'ir8', word: 'slots' },
    { id: 'ir9', word: 'gambling' },
    { id: 'ir10', word: 'bet' },
    { id: 'ir11', word: 'taruhan' }
  ].map(item => ({ ...item, word: item.word.toLowerCase() }));
  
  // Daftar kata kunci kesehatan mental dengan ID unik
  const mentalHealthKeywords = [
    { id: 'mh1', word: 'stress' },
    { id: 'mh2', word: 'depresi' },
    { id: 'mh3', word: 'cemas' },
    { id: 'mh4', word: 'anxiety' },
    { id: 'mh5', word: 'sedih' },
    { id: 'mh6', word: 'khawatir' },
    { id: 'mh7', word: 'takut' },
    { id: 'mh8', word: 'gelisah' },
    { id: 'mh9', word: 'trauma' },
    { id: 'mh10', word: 'bunuh diri' },
    { id: 'mh11', word: 'self-harm' },
    { id: 'mh12', word: 'panic attack' },
    { id: 'mh13', word: 'bipolar' },
    { id: 'mh14', word: 'mental' },
    { id: 'mh15', word: 'psikolog' },
    { id: 'mh16', word: 'psikiater' },
    { id: 'mh17', word: 'terapi' },
    { id: 'mh18', word: 'konseling' },
    { id: 'mh19', word: 'konsultasi' }
  ].map(item => ({ ...item, word: item.word.toLowerCase() }));
  
  export function containsBadWords(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    return words.some(word => badWords.some(bw => bw.word === word));
  }
  
  export function containsIrrelevantContent(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    return words.some(word => irrelevantKeywords.some(ir => ir.word === word));
  }
  
  export function isMentalHealthRelated(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    return words.some(word => mentalHealthKeywords.some(mh => mh.word === word));
  }
  
  export function generateWarningResponse(type: 'bad-words' | 'irrelevant' | 'unclear'): string {
    const warnings = {
      'bad-words': "Mohon gunakan bahasa yang lebih sopan. Saya di sini untuk membantu Anda dengan cara yang positif dan mendukung.",
      'irrelevant': "Maaf, saya hanya dapat membantu dengan topik seputar kesehatan mental dan kesejahteraan psikologis. Silakan ajukan pertanyaan yang relevan dengan hal tersebut.",
      'unclear': "Maaf, saya kurang memahami pertanyaan Anda. Bisakah Anda menjelaskan lebih detail tentang apa yang Anda rasakan atau pikirkan?"
    };
    
    return warnings[type] || "Maaf, bisakah Anda mengajukan pertanyaan yang lebih spesifik tentang kesehatan mental?";
  }
  
  export function analyzeMessage(text: string): ContentAnalysis {
    if (containsBadWords(text)) {
      return {
        isValid: false,
        warningType: 'bad-words',
        response: generateWarningResponse('bad-words')
      };
    }
  
    if (containsIrrelevantContent(text)) {
      return {
        isValid: false,
        warningType: 'irrelevant',
        response: generateWarningResponse('irrelevant')
      };
    }
  
    if (!isMentalHealthRelated(text) && text.length > 10) {
      return {
        isValid: false,
        warningType: 'unclear',
        response: generateWarningResponse('unclear')
      };
    }
  
    return { isValid: true };
  }
  
  export function cleanText(text: string): string {
    let cleanedText = text.toLowerCase();
    badWords.forEach(({ word }) => {
      const replacement = '*'.repeat(word.length);
      cleanedText = cleanedText.replace(new RegExp(word, 'gi'), replacement);
    });
    return cleanedText;
  }
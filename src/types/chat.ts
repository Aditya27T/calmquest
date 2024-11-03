export type Message = {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    stressLevel?: 'low' | 'medium' | 'high';
  };
  
  export type ChatHistory = {
    messages: Message[];
    lastAnalysis?: {
      timestamp: Date;
      overallStressLevel: 'low' | 'medium' | 'high';
      recommendations: string[];
    };
  };
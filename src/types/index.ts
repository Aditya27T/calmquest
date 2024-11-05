
  export interface Hospital {
    name: string;
    address: string;
    phone: string;
    coords: Coordinates;
  }
  
  export interface EmergencyContact {
    name: string;
    description: string;
    phone: string;
    available: string;
    type: 'emergency' | 'hotline';
  }
  
  export interface EmergencyData {
    emergencyContacts: {
      contacts: EmergencyContact[];
    }[];
    hospitals: Hospital[];
  }

// Type untuk pesan dalam chat interface
export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  stressLevel?: 'low' | 'medium' | 'high';
  needsFeedback?: boolean;
  feedback?: boolean;
  isWarning?: boolean;
};

export type TrainingMessage = {
  userMessage: string;
  botResponse: string;
  stressLevel: 'low' | 'medium' | 'high';
  effectiveness?: number;
  timestamp: Date;
  sessionId: string;
  messageType?: 'normal' | 'bad-words' | 'irrelevant' | 'unclear';
};

export type TrainingData = {
  conversations: TrainingMessage[];
  metadata: {
    lastUpdated: Date;
    totalConversations: number;
    performanceMetrics: {
      averageEffectiveness: number;
      stressLevelDistribution: {
        low: number;
        medium: number;
        high: number;
      };
    };
  };
};

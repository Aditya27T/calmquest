export interface Question {
    id: number;
    question: string;
    options: {
      value: number;
      label: string;
    }[];
  }
  
  export interface AssessmentFormData {
    pss: Record<number, number>;
    bdi: Record<number, number>;
  }
  
  export interface AssessmentResult {
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
    timestamp: string;
  }
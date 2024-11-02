import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { PSS_QUESTIONS, BDI_QUESTIONS, calculatePSSScore, calculateBDIScore } from '@/lib/constants';
import type { AssessmentFormData } from '@/types/assessment';

export function AssessmentForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'PSS' | 'BDI'>('PSS');
  const [pssAnswers, setPssAnswers] = useState<Record<number, number>>({});
  const [bdiAnswers, setBdiAnswers] = useState<Record<number, number>>({});
  
  const { handleSubmit } = useForm<AssessmentFormData>();

  const handlePSSChange = (questionId: number, value: string) => {
    setPssAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const handleBDIChange = (questionId: number, value: string) => {
    setBdiAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const validateAnswers = (answers: Record<number, number>, questions: typeof PSS_QUESTIONS | typeof BDI_QUESTIONS) => {
    return questions.every(q => typeof answers[q.id] === 'number');
  };

  const onSubmit = () => {
    if (currentStep === 'PSS') {
      if (!validateAnswers(pssAnswers, PSS_QUESTIONS)) {
        alert('Mohon jawab semua pertanyaan');
        return;
      }
      setCurrentStep('BDI');
      return;
    }

    if (!validateAnswers(bdiAnswers, BDI_QUESTIONS)) {
      alert('Mohon jawab semua pertanyaan');
      return;
    }

    // Calculate scores
    const pssResult = calculatePSSScore(pssAnswers);
    const bdiResult = calculateBDIScore(bdiAnswers);

    // Save results to localStorage
    const result = {
      pss: {
        score: Object.values(pssAnswers).reduce((a, b) => a + b, 0),
        ...pssResult
      },
      bdi: {
        score: Object.values(bdiAnswers).reduce((a, b) => a + b, 0),
        ...bdiResult
      },
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('assessmentResult', JSON.stringify(result));
    router.push('/face-detection');
  };

  const questions = currentStep === 'PSS' ? PSS_QUESTIONS : BDI_QUESTIONS;
  const currentAnswers = currentStep === 'PSS' ? pssAnswers : bdiAnswers;
  const handleChange = currentStep === 'PSS' ? handlePSSChange : handleBDIChange;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">
          {currentStep === 'PSS' ? 'Perceived Stress Scale (PSS)' : 'Beck Depression Inventory (BDI)'}
        </h1>
        <p className="text-gray-600">
          {currentStep === 'PSS' 
            ? 'Jawab pertanyaan berikut sesuai dengan yang Anda rasakan dalam 1 bulan terakhir'
            : 'Jawab pertanyaan berikut sesuai dengan yang Anda rasakan saat ini'}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <Card key={q.id} className="border-purple-100">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-lg font-medium">{q.question}</p>
                <RadioGroup
                  value={currentAnswers[q.id]?.toString()}
                  onValueChange={(value) => handleChange(q.id, value)}
                  className="space-y-2"
                >
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`${q.id}-${index}`}
                      />
                      <Label htmlFor={`${q.id}-${index}`} className="text-gray-700">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        {currentStep === 'BDI' && (
          <Button 
            type="button"
            variant="outline"
            onClick={() => setCurrentStep('PSS')}
          >
            Kembali
          </Button>
        )}
        <Button 
          type="submit" 
          className="bg-purple-700 hover:bg-purple-800"
        >
          {currentStep === 'PSS' ? 'Lanjut' : 'Selesai'}
        </Button>
      </div>
    </form>
  );
}
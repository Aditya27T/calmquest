import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PSS_QUESTIONS, BDI_QUESTIONS, calculatePSSScore, calculateBDIScore } from '@/lib/constants';
import type { AssessmentFormData } from '@/types/assessment';

export function AssessmentForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState<'PSS' | 'BDI'>('PSS');
  const [pssAnswers, setPssAnswers] = useState<Record<number, number>>({});
  const [bdiAnswers, setBdiAnswers] = useState<Record<number, number>>({});
  
  const { handleSubmit } = useForm<AssessmentFormData>();

  // Hitung progress
  const calculateProgress = () => {
    const totalQuestions = PSS_QUESTIONS.length + BDI_QUESTIONS.length;
    const answeredPSS = Object.keys(pssAnswers).length;
    const answeredBDI = Object.keys(bdiAnswers).length;
    return Math.round(((answeredPSS + answeredBDI) / totalQuestions) * 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
        alert('Mohon jawab semua pertanyaan PSS');
        // Highlight pertanyaan yang belum dijawab
        PSS_QUESTIONS.forEach(q => {
          if (typeof pssAnswers[q.id] === 'undefined') {
            const element = document.getElementById(`PSS-${q.id}-section`);
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        });
        return;
      }
      setCurrentStep('BDI');
      setTimeout(scrollToTop, 100);
      return;
    }

    if (!validateAnswers(bdiAnswers, BDI_QUESTIONS)) {
      alert('Mohon jawab semua pertanyaan BDI');
      // Highlight pertanyaan yang belum dijawab
      BDI_QUESTIONS.forEach(q => {
        if (typeof bdiAnswers[q.id] === 'undefined') {
          const element = document.getElementById(`BDI-${q.id}-section`);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return;
    }

    // Calculate scores
    const pssResult = calculatePSSScore(pssAnswers);
    const bdiResult = calculateBDIScore(bdiAnswers);

    // Save results to localStorage
    const result = {
      pss: {
        answers: pssAnswers,
        score: pssResult.score,
        level: pssResult.level,
        message: pssResult.message
      },
      bdi: {
        answers: bdiAnswers,
        score: bdiResult.score,
        level: bdiResult.level,
        message: bdiResult.message
      },
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('assessmentResult', JSON.stringify(result));
    router.push('/face-detection');
  };

  const handleBack = () => {
    setCurrentStep('PSS');
    setTimeout(scrollToTop, 100);
  };

  const getRadioId = (questionId: number, optionIndex: number) => {
    return `${currentStep}-${questionId}-${optionIndex}`;
  };

  const getCurrentAnswers = () => {
    return currentStep === 'PSS' ? pssAnswers : bdiAnswers;
  };

  const getCurrentHandler = () => {
    return currentStep === 'PSS' ? handlePSSChange : handleBDIChange;
  };

  const questions = currentStep === 'PSS' ? PSS_QUESTIONS : BDI_QUESTIONS;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Progress Bar */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm py-4 z-10">
          <Progress value={calculateProgress()} className="w-full" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Progress: {calculateProgress()}%
          </p>
        </div>

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
            <Card 
              key={`${currentStep}-${q.id}`} 
              className={`border-purple-100 transition-all duration-300 ${
                typeof getCurrentAnswers()[q.id] === 'undefined' 
                  ? 'border-red-200 bg-red-50/50' 
                  : 'border-green-200 bg-green-50/50'
              }`}
              id={`${currentStep}-${q.id}-section`}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-lg font-medium">{q.question}</p>
                  <RadioGroup
                    name={`${currentStep}-question-${q.id}`}
                    value={getCurrentAnswers()[q.id]?.toString()}
                    onValueChange={(value) => getCurrentHandler()(q.id, value)}
                    className="space-y-2"
                  >
                    {q.options.map((option, index) => {
                      const radioId = getRadioId(q.id, index);
                      return (
                        <div key={radioId} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option.value.toString()}
                            id={radioId}
                          />
                          <Label htmlFor={radioId} className="text-gray-700">
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center gap-4 pb-8 sticky bottom-0 bg-white/80 backdrop-blur-sm py-4">
          <div className="text-sm text-gray-600">
            {currentStep === 'PSS' 
              ? `${Object.keys(pssAnswers).length} dari ${PSS_QUESTIONS.length} pertanyaan dijawab`
              : `${Object.keys(bdiAnswers).length} dari ${BDI_QUESTIONS.length} pertanyaan dijawab`
            }
          </div>
          <div className="flex gap-4">
            {currentStep === 'BDI' && (
              <Button 
                type="button"
                variant="outline"
                onClick={handleBack}
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
        </div>
      </form>
    </div>
  );
}
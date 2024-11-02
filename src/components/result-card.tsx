import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ThumbsUp, AlertTriangle } from 'lucide-react';

interface ResultCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  type?: 'normal' | 'success' | 'warning';
  show?: boolean;
}

export function ResultCard({
  title,
  description,
  children,
  type = 'normal',
  show = true
}: ResultCardProps) {
  if (!show || !children) return null;

  const icons = {
    normal: <Brain className="h-6 w-6 text-purple-600" />,
    success: <ThumbsUp className="h-6 w-6 text-green-600" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-600" />
  };

  const backgrounds = {
    normal: 'bg-purple-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50'
  };

  return (
    <Card className={`${backgrounds[type]} border-none shadow-sm`}>
      <CardHeader className="flex flex-row items-center gap-4">
        {icons[type]}
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
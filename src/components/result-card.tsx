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

  const icons: Record<typeof type, JSX.Element> = {
    normal: <Brain className="h-6 w-6 text-purple-600" />,
    success: <ThumbsUp className="h-6 w-6 text-green-600" />,
    warning: <AlertTriangle className="h-6 w-6 text-yellow-600" />
  };

  const backgrounds: Record<typeof type, string> = {
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
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Usage Example:
export default function App() {
  return (
    <div className="space-y-4">
      <ResultCard
        title="Stress Management Tips"
        description="Practical tips to reduce stress"
        type="success"
      >
        <ul className="list-disc pl-5">
          <li>Practice deep breathing exercises</li>
          <li>Go for a walk in nature</li>
          <li>Connect with supportive friends</li>
        </ul>
      </ResultCard>

      <ResultCard
        title="Warning: High Stress Level"
        description="Consider seeking professional help"
        type="warning"
      >
        <p>Your stress level is elevated. Here are some immediate actions to consider:</p>
        <ul className="list-disc pl-5">
          <li>Talk to a mental health professional</li>
          <li>Engage in relaxation activities</li>
        </ul>
      </ResultCard>
    </div>
  );
}

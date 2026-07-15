import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuizResult {
  date: string;
  score: number;
  total: number;
  authorityScore: number;
  urgencyScore: number;
  technicalScore: number;
}

interface Badge {
  id: string;
  name: string;
  emoji: string;
  earnedAt: string;
}

interface UserProgress {
  quizzesCompleted: number;
  simulationsCompleted: number;
  linksAnalyzed: number;
  trainingHours: number;
  quizResults: QuizResult[];
  badges: Badge[];
  simulationSurvived: boolean;
}

interface UserProgressContextType {
  progress: UserProgress;
  addQuizResult: (result: Omit<QuizResult, 'date'>) => void;
  incrementSimulations: (survived: boolean) => void;
  incrementLinksAnalyzed: () => void;
  addBadge: (badge: Omit<Badge, 'earnedAt'>) => void;
  hasBadge: (id: string) => boolean;
}

const defaultProgress: UserProgress = {
  quizzesCompleted: 0,
  simulationsCompleted: 0,
  linksAnalyzed: 0,
  trainingHours: 0,
  quizResults: [],
  badges: [],
  simulationSurvived: false,
};

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('anweshan-progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('anweshan-progress', JSON.stringify(progress));
  }, [progress]);

  const addQuizResult = (result: Omit<QuizResult, 'date'>) => {
    const newResult = { ...result, date: new Date().toISOString() };
    setProgress(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      trainingHours: prev.trainingHours + 0.1,
      quizResults: [...prev.quizResults, newResult],
    }));
  };

  const incrementSimulations = (survived: boolean) => {
    setProgress(prev => ({
      ...prev,
      simulationsCompleted: prev.simulationsCompleted + 1,
      trainingHours: prev.trainingHours + 0.3,
      simulationSurvived: survived || prev.simulationSurvived,
    }));
  };

  const incrementLinksAnalyzed = () => {
    setProgress(prev => ({
      ...prev,
      linksAnalyzed: prev.linksAnalyzed + 1,
      trainingHours: prev.trainingHours + 0.05,
    }));
  };

  const addBadge = (badge: Omit<Badge, 'earnedAt'>) => {
    if (!progress.badges.find(b => b.id === badge.id)) {
      setProgress(prev => ({
        ...prev,
        badges: [...prev.badges, { ...badge, earnedAt: new Date().toISOString() }],
      }));
    }
  };

  const hasBadge = (id: string) => {
    return progress.badges.some(b => b.id === id);
  };

  return (
    <UserProgressContext.Provider value={{ progress, addQuizResult, incrementSimulations, incrementLinksAnalyzed, addBadge, hasBadge }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

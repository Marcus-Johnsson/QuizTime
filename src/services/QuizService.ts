import questionsData from '../data/questions.json';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'continuous' | 'challenge-5' | 'challenge-10' | 'challenge-15';
export type TimeLimit = 10 | 15 | 20;
export type ExperienceLevel = 1 | 2 | 3 | 4 | 5;
export type QuestionType = 'regex' | 'ai-agent' | 'multiple';

export interface Question {
  id: number;
  experienceLevel: ExperienceLevel;
  question: string;
  correctAnswers: string[];
  type: QuestionType;
  tags: string[];
}

export interface GameSettings {
  mode: GameMode;
  timeLimit?: TimeLimit;
  experienceLevel?: ExperienceLevel;
  tags?: string[];
}

export interface ScoreEntry {
  name: string;
  score: number;
  mode: GameMode;
  date: string;
}

class QuizService {
  private questions: Question[] = questionsData.questions as Question[];

  getAllTags(): string[] {
    const tagsSet = new Set<string>();
    this.questions.forEach(q => q.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }

  getRandomQuestion(experienceLevel?: ExperienceLevel, tags?: string[], excludeIds?: number[]): Question {
    let availableQuestions = this.questions;
    
    // Filter out ai-agent questions (not supported yet)
    availableQuestions = availableQuestions.filter(
      (q) => q.type !== 'ai-agent'
    );

    // Filter by experience level if specified
    if (experienceLevel) {
      availableQuestions = availableQuestions.filter(
        (q) => q.experienceLevel <= experienceLevel
      );
    }

    // Filter by tags if specified (question must have at least one of the selected tags)
    if (tags && tags.length > 0) {
      availableQuestions = availableQuestions.filter(
        (q) => q.tags.some(tag => tags.includes(tag))
      );
    }

    // Exclude already shown questions
    if (excludeIds && excludeIds.length > 0) {
      availableQuestions = availableQuestions.filter(
        (q) => !excludeIds.includes(q.id)
      );
    }

    if (availableQuestions.length === 0) {
      throw new Error('No questions available for the selected filters');
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  }

  checkAnswer(userAnswer: string, correctAnswers: string[]): boolean {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    return correctAnswers.some(
      (answer) => answer.toLowerCase() === normalizedUserAnswer
    );
  }

  // Map experience level (1-5) to difficulty multiplier
  // 1-2: easy (1.0), 3-4: medium (1.3), 5: hard (1.6)
  getExperienceLevelMultiplier(experienceLevel: ExperienceLevel): number {
    if (experienceLevel <= 2) {
      return 1.0; // Easy
    } else if (experienceLevel <= 4) {
      return 1.3; // Medium
    } else {
      return 1.6; // Hard
    }
  }

  getTimeLimitMultiplier(timeLimit: TimeLimit): number {
    switch (timeLimit) {
      case 10:
        return 1.6;
      case 15:
        return 1.3;
      case 20:
        return 1.0;
      default:
        return 1.0;
    }
  }

  calculateScore(
    basePoints: number,
    experienceLevel: ExperienceLevel,
    timeRemainingPercentage: number,
    timeLimit?: TimeLimit
  ): number {
    const experienceMult = this.getExperienceLevelMultiplier(experienceLevel);
    const timeLimitMult = timeLimit ? this.getTimeLimitMultiplier(timeLimit) : 1.0;
    const speedBonus = 1 + (timeRemainingPercentage / 100); // 1.0 to 2.0 based on speed
    
    return Math.round(basePoints * experienceMult * timeLimitMult * speedBonus);
  }
}

export const quizService = new QuizService();

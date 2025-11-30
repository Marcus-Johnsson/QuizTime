import type { GameMode, ScoreEntry } from './QuizService';

class ScoreService {
  private readonly STORAGE_KEY = 'quiztime_scores';

  getScores(mode?: GameMode): ScoreEntry[] {
    const scores = this.loadScores();
    if (mode) {
      return scores.filter((score) => score.mode === mode);
    }
    return scores;
  }

  addScore(entry: ScoreEntry): void {
    const scores = this.loadScores();
    scores.push(entry);
    this.saveScores(scores);
  }

  getTopScores(mode: GameMode, limit: number = 10): ScoreEntry[] {
    const scores = this.getScores(mode);
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private loadScores(): ScoreEntry[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveScores(scores: ScoreEntry[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scores));
  }

  clearScores(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const scoreService = new ScoreService();

<script lang="ts">
  import type { Question } from '../services/QuizService';

  interface QuestionHistory {
    question: Question;
    userAnswer: string | string[];
    isCorrect: boolean;
  }

  interface Props {
    history: QuestionHistory[];
    score: number;
    isContinuousMode: boolean;
    onBack: () => void;
  }

  let { history, score, isContinuousMode, onBack }: Props = $props();

  const reportEmail = "mj.workflows@gmail.com"; // TODO: Update with actual email

  function formatUserAnswer(answer: string | string[]): string {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return answer;
  }

  function reportQuestion(item: QuestionHistory) {
    const subject = encodeURIComponent(`Quiz Question Report - ID: ${item.question.id}`);
    const body = encodeURIComponent(
`Question Report

Question ID: ${item.question.id}
Question: ${item.question.question}

Your Answer: ${formatUserAnswer(item.userAnswer)}
Correct Answer(s): ${item.question.correctAnswers.join(', ')}

Result: ${item.isCorrect ? 'Marked as Correct' : 'Marked as Incorrect'}

Please describe the issue with this question:
[Write your feedback here]

---
Question Type: ${item.question.type}
Tags: ${item.question.tags.join(', ')}
Experience Level: ${item.question.experienceLevel}
`
    );

    window.location.href = `mailto:${reportEmail}?subject=${subject}&body=${body}`;
  }
</script>

<div class="quiz-summary">
  <div class="summary-header">
    <h2>Quiz Complete!</h2>
    <div class="final-score">
      {#if isContinuousMode}
        <p>Final Streak: <strong>{score}</strong></p>
      {:else}
        <p>Final Score: <strong>{score}</strong> points</p>
      {/if}
    </div>
    <p class="summary-stats">
      {history.filter(h => h.isCorrect).length} / {history.length} Correct
    </p>
  </div>

  <div class="questions-review">
    <h3>Review Your Answers</h3>
    {#each history as item, index}
      <div class="question-item" class:correct={item.isCorrect} class:incorrect={!item.isCorrect}>
        <div class="question-header">
          <span class="question-number">Question {index + 1}</span>
          <span class="result-badge" class:correct={item.isCorrect} class:incorrect={!item.isCorrect}>
            {item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </span>
        </div>
        
        <div class="question-content">
          <p class="question-text">{item.question.question}</p>
          
          <div class="answer-section">
            <div class="answer-row">
              <span class="label">Your answer:</span>
              <span class="value user-answer">{formatUserAnswer(item.userAnswer)}</span>
            </div>
            {#if !item.isCorrect}
              <div class="answer-row">
                <span class="label">Correct answer(s):</span>
                <span class="value correct-answer">{item.question.correctAnswers.join(', ')}</span>
              </div>
            {/if}
          </div>

          <button class="report-btn" onclick={() => reportQuestion(item)}>
            📧 Report Issue
          </button>
        </div>
      </div>
    {/each}
  </div>

  <button class="back-btn" onclick={onBack}>Back to Home</button>
</div>

<style>
  .quiz-summary {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  .summary-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }

  .summary-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .final-score {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .final-score strong {
    color: #646cff;
  }

  .summary-stats {
    color: #888;
    font-size: 1.1rem;
  }

  .questions-review h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .question-item {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid transparent;
  }

  .question-item.correct {
    border-left-color: #4caf50;
  }

  .question-item.incorrect {
    border-left-color: #f44336;
  }

  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .question-number {
    font-weight: bold;
    color: #888;
  }

  .result-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: bold;
  }

  .result-badge.correct {
    background: #4caf50;
    color: white;
  }

  .result-badge.incorrect {
    background: #f44336;
    color: white;
  }

  .question-content {
    padding-left: 0.5rem;
  }

  .question-text {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .answer-section {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .answer-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .answer-row:last-child {
    margin-bottom: 0;
  }

  .label {
    font-weight: bold;
    color: #888;
    min-width: 140px;
  }

  .value {
    flex: 1;
  }

  .user-answer {
    color: #fff;
  }

  .correct-answer {
    color: #4caf50;
  }

  .report-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ff9800;
    border-radius: 6px;
    background: transparent;
    color: #ff9800;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .report-btn:hover {
    background: #ff9800;
    color: white;
  }

  .back-btn {
    width: 100%;
    padding: 1rem 2rem;
    margin-top: 2rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: #646cff;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }

  .back-btn:hover {
    background: transparent;
    transform: translateY(-2px);
  }
</style>

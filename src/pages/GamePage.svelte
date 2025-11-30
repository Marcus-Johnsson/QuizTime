<script lang="ts">
  import QuestionCard from '../components/QuestionCard.svelte';
  import Timer from '../components/Timer.svelte';
  import QuizSummary from '../components/QuizSummary.svelte';
  import { quizService, type GameSettings, type Question } from '../services/QuizService';
  import { scoreService } from '../services/ScoreService';

  interface Props {
    settings: GameSettings;
    onExit: () => void;
  }

  interface QuestionHistory {
    question: Question;
    userAnswer: string | string[];
    isCorrect: boolean;
  }

  let { settings, onExit }: Props = $props();

  // Initialize question tracking
  let shownQuestionIds = $state<number[]>([]);
  const initialQuestion = quizService.getRandomQuestion(settings.experienceLevel, settings.tags);
  let currentQuestion = $state<Question>(initialQuestion);
  shownQuestionIds.push(initialQuestion.id);

  let questionNumber = $state(1);
  let score = $state(0);
  let streak = $state(0);
  let gameOver = $state(false);
  let feedback = $state<{ correct: boolean; message: string } | null>(null);
  let timerKey = $state(0); // Used to remount timer
  let questionHistory = $state<QuestionHistory[]>([]); // Track all answered questions
  let currentTimeRemaining = $state({ value: 0 }); // Track current time remaining

  const isContinuousMode = settings.mode === 'continuous';
  const totalQuestions = settings.mode === 'challenge-5' ? 5 : 
                         settings.mode === 'challenge-10' ? 10 : 
                         settings.mode === 'challenge-15' ? 15 : 0;

  // Calculate time limit for current question (add extra time for multiple answers)
  function getQuestionTimeLimit(question: Question): number {
    if (!settings.timeLimit) return 0;
    
    if (question.type === 'multiple') {
      const requiredAnswers = 1 + question.experienceLevel;
      const extraTimePerAnswer = 5; // 5 seconds per required answer
      return settings.timeLimit + (requiredAnswers * extraTimePerAnswer);
    }
    
    return settings.timeLimit;
  }

  let currentTimeLimit = $derived(getQuestionTimeLimit(currentQuestion));

  function handleAnswer(answer: string | string[]) {
    let isCorrect = false;
    
    if (Array.isArray(answer)) {
      // For multiple answers, require 1 + experienceLevel correct answers
      const requiredCount = 1 + currentQuestion.experienceLevel;
      const correctCount = answer.filter(userAns => 
        quizService.checkAnswer(userAns, currentQuestion.correctAnswers)
      ).length;
      isCorrect = correctCount >= requiredCount;
    } else {
      isCorrect = quizService.checkAnswer(answer, currentQuestion.correctAnswers);
    }

    // Store question in history
    questionHistory = [...questionHistory, {
      question: currentQuestion,
      userAnswer: answer,
      isCorrect: isCorrect
    }];

    if (isCorrect) {
      if (isContinuousMode) {
        streak++;
        score = streak;
      } else {
        // Calculate points based on actual time remaining
        const basePoints = 100;
        const timeRemainingPercentage = (currentTimeRemaining.value / currentTimeLimit) * 100;
        const earnedPoints = quizService.calculateScore(
          basePoints,
          currentQuestion.experienceLevel,
          timeRemainingPercentage,
          settings.timeLimit
        );
        score += earnedPoints;
      }

      feedback = { 
        correct: true, 
        message: `Correct! ${isContinuousMode ? `Streak: ${streak}` : `+${score} points`}` 
      };
    } else {
      if (isContinuousMode) {
        // Game over in continuous mode
        gameOver = true;
        feedback = { 
          correct: false, 
          message: `Wrong! Your streak was ${streak}` 
        };
        saveScore();
        return;
      } else {
        feedback = { 
          correct: false, 
          message: `Wrong! Correct answer: ${currentQuestion.correctAnswers[0]}` 
        };
      }
    }

    // Move to next question or end game
    setTimeout(() => {
      if (!isContinuousMode && questionNumber >= totalQuestions) {
        gameOver = true;
        saveScore();
      } else {
        nextQuestion();
      }
    }, 1500);
  }

  function handleTimeout() {
    // Store timeout as incorrect answer in history
    questionHistory = [...questionHistory, {
      question: currentQuestion,
      userAnswer: '(No answer - timeout)',
      isCorrect: false
    }];

    feedback = { 
      correct: false, 
      message: `Time's up! Correct answer: ${currentQuestion.correctAnswers[0]}` 
    };

    if (isContinuousMode) {
      setTimeout(() => {
        gameOver = true;
        saveScore();
      }, 1500);
    } else {
      setTimeout(() => {
        if (questionNumber >= totalQuestions) {
          gameOver = true;
          saveScore();
        } else {
          nextQuestion();
        }
      }, 1500);
    }
  }

  function nextQuestion() {
    currentQuestion = quizService.getRandomQuestion(settings.experienceLevel, settings.tags, shownQuestionIds);
    shownQuestionIds = [...shownQuestionIds, currentQuestion.id]; // Add new question to shown list
    questionNumber++;
    feedback = null;
    timerKey++; // Force timer remount
  }

  function saveScore() {
    const playerName = prompt('Enter your name for the scoreboard:') || 'Anonymous';
    scoreService.addScore({
      name: playerName,
      score: score,
      mode: settings.mode,
      date: new Date().toISOString()
    });
  }
</script>

<div class="game-page">
  <div class="game-header">
    <div class="game-info">
      <h2>{isContinuousMode ? 'Continuous Stream' : `Challenge Mode (${totalQuestions})`}</h2>
      <div class="stats">
        {#if isContinuousMode}
          <span class="stat">Streak: {streak}</span>
        {:else}
          <span class="stat">Question: {questionNumber}/{totalQuestions}</span>
          <span class="stat">Score: {score}</span>
        {/if}
      </div>
    </div>
    <button class="exit-btn" onclick={onExit}>Exit</button>
  </div>

  {#if !gameOver}
    <div class="game-content">
      {#if settings.timeLimit}
        {#key timerKey}
          <Timer timeLimit={currentTimeLimit} onTimeout={handleTimeout} timeRemaining={currentTimeRemaining} />
        {/key}
      {/if}

      {#if feedback}
        <div class="feedback" class:correct={feedback.correct} class:incorrect={!feedback.correct}>
          {feedback.message}
        </div>
      {:else}
        <QuestionCard question={currentQuestion} onSubmit={handleAnswer} />
      {/if}
    </div>
  {:else}
    <QuizSummary 
      history={questionHistory} 
      score={score} 
      isContinuousMode={isContinuousMode}
      onBack={onExit} 
    />
  {/if}
</div>

<style>
  .game-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }

  .game-info h2 {
    margin-bottom: 0.5rem;
  }

  .stats {
    display: flex;
    gap: 2rem;
  }

  .stat {
    font-size: 1.2rem;
    font-weight: bold;
    color: #646cff;
  }

  .exit-btn {
    padding: 0.5rem 1.5rem;
    border: 1px solid #888;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
  }

  .exit-btn:hover {
    background: #888;
  }

  .game-content {
    margin-top: 2rem;
  }

  .feedback {
    padding: 2rem;
    border-radius: 12px;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    animation: fadeIn 0.3s;
  }

  .feedback.correct {
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
  }

  .feedback.incorrect {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>

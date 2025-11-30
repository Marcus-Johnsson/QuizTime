<script lang="ts">
  import type { Question } from '../services/QuizService';

  interface Props {
    question: Question;
    onSubmit: (answer: string | string[]) => void;
  }

  let { question, onSubmit }: Props = $props();
  let userAnswer = $state('');
  let multipleAnswers = $state<string[]>([]);

  $effect(() => {
    // Reset answers when question changes
    userAnswer = '';
    multipleAnswers = [];
  });

  function handleSubmit() {
    if (question.type === 'multiple') {
      if (multipleAnswers.length > 0) {
        onSubmit(multipleAnswers);
        multipleAnswers = [];
      }
    } else {
      if (userAnswer.trim()) {
        onSubmit(userAnswer);
        userAnswer = '';
      }
    }
  }

  function addAnswer() {
    if (userAnswer.trim() && !multipleAnswers.includes(userAnswer.trim())) {
      multipleAnswers = [...multipleAnswers, userAnswer.trim()];
      userAnswer = '';
    }
  }

  function removeAnswer(answer: string) {
    multipleAnswers = multipleAnswers.filter(a => a !== answer);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && question.type === 'multiple') {
      e.preventDefault();
      addAnswer();
    }
  }
</script>

<div class="question-card">
  <div class="type-badge" class:regex={question.type === 'regex'} 
       class:multiple={question.type === 'multiple'}>
    {question.type === 'multiple' ? `Multiple Answers (${1 + question.experienceLevel} required)` : 'Single Answer'}
  </div>

  <h2>{question.question}</h2>

  {#if question.type === 'multiple'}
    <div class="multiple-answers-section">
      {#if multipleAnswers.length > 0}
        <div class="answers-list">
          <p class="answers-label">Your answers ({multipleAnswers.length}):</p>
          <div class="answers-chips">
            {#each multipleAnswers as answer}
              <div class="answer-chip">
                {answer}
                <button type="button" class="remove-btn" onclick={() => removeAnswer(answer)}>×</button>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div class="input-group">
          <input
            type="text"
            bind:value={userAnswer}
            placeholder="Type an answer and press Enter to add..."
            onkeypress={handleKeyPress}
          />
          <button type="button" class="add-btn" onclick={addAnswer} disabled={!userAnswer.trim()}>Add</button>
        </div>
        <button type="submit" class="submit-btn" disabled={multipleAnswers.length === 0}>Submit All</button>
      </form>
    </div>
  {:else}
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input
        type="text"
        bind:value={userAnswer}
        placeholder="Type your answer..."
      />
      <button type="submit" disabled={!userAnswer.trim()}>Submit</button>
    </form>
  {/if}
</div>

<style>
  .question-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .type-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .type-badge.regex {
    background: #4caf50;
    color: white;
  }

  .type-badge.multiple {
    background: #ff9800;
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  .multiple-answers-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .answers-list {
    margin-bottom: 1rem;
  }

  .answers-label {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 0.5rem;
  }

  .answers-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .answer-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: #646cff;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  .remove-btn {
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0;
    transition: background 0.2s;
  }

  .remove-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
  }

  form {
    display: flex;
    gap: 1rem;
  }

  input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    color: inherit;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #747bff;
  }

  button {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    background: #646cff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  .add-btn {
    padding: 0.75rem 1rem;
  }

  .submit-btn {
    width: 100%;
    font-weight: bold;
  }

  button:hover:not(:disabled) {
    background: #747bff;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

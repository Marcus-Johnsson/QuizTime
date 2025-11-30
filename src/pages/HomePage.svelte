<script lang="ts">
  import type { GameMode } from '../services/QuizService';

  interface Props {
    onModeSelect: (mode: GameMode) => void;
    onShowScoreboard: () => void;
  }

  let { onModeSelect, onShowScoreboard }: Props = $props();
</script>

<div class="home-page">
  <h1>QuizTime</h1>
  <p class="subtitle">Programming Quiz Station</p>

  <div class="mode-selection">
    <h2>Select Game Mode</h2>

    <button class="mode-btn continuous" onclick={() => onModeSelect('continuous')}>
      <h3>Continuous Stream</h3>
      <p>Endless questions • No time limit • Track your streak</p>
    </button>

    <div class="challenge-modes">
      <h3>Challenge Mode</h3>
      <button class="mode-btn challenge" onclick={() => onModeSelect('challenge-5')}>
        5 Questions
      </button>
      <button class="mode-btn challenge" onclick={() => onModeSelect('challenge-10')}>
        10 Questions
      </button>
      <button class="mode-btn challenge" onclick={() => onModeSelect('challenge-15')}>
        15 Questions
      </button>
    </div>
  </div>

  <button class="scoreboard-btn" onclick={onShowScoreboard}>
    View Scoreboard
  </button>
</div>

<style>
  .home-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #888;
    margin-bottom: 3rem;
  }

  .mode-selection {
    margin-bottom: 2rem;
  }

  .mode-btn {
    width: 100%;
    padding: 1.5rem;
    margin: 1rem 0;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
  }

  .mode-btn:hover {
    background: #646cff;
    transform: translateY(-2px);
  }

  .mode-btn.continuous {
    border-color: #ff3e00;
  }

  .mode-btn.continuous:hover {
    background: #ff3e00;
  }

  .challenge-modes {
    margin-top: 2rem;
  }

  .challenge-modes h3 {
    margin-bottom: 1rem;
  }

  .scoreboard-btn {
    padding: 1rem 2rem;
    border: 1px solid #888;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
  }

  .scoreboard-btn:hover {
    background: #888;
  }
</style>

<script lang="ts">
  import { scoreService } from '../services/ScoreService';
  import type { GameMode } from '../services/QuizService';

  interface Props {
    onBack: () => void;
  }

  let { onBack }: Props = $props();

  let selectedMode: GameMode | 'all' = $state('all');
  let scores = $derived(
    selectedMode === 'all'
      ? scoreService.getScores()
      : scoreService.getTopScores(selectedMode)
  );
</script>

<div class="scoreboard-page">
  <div class="header">
    <h1>Scoreboard</h1>
    <button onclick={onBack}>Back to Home</button>
  </div>

  <div class="mode-filter">
    <button class:active={selectedMode === 'all'} onclick={() => selectedMode = 'all'}>
      All
    </button>
    <button class:active={selectedMode === 'continuous'} onclick={() => selectedMode = 'continuous'}>
      Continuous
    </button>
    <button class:active={selectedMode === 'challenge-5'} onclick={() => selectedMode = 'challenge-5'}>
      5 Questions
    </button>
    <button class:active={selectedMode === 'challenge-10'} onclick={() => selectedMode = 'challenge-10'}>
      10 Questions
    </button>
    <button class:active={selectedMode === 'challenge-15'} onclick={() => selectedMode = 'challenge-15'}>
      15 Questions
    </button>
  </div>

  <div class="scores-list">
    {#if scores.length === 0}
      <p class="no-scores">No scores yet. Play a game to set a record!</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Mode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {#each scores as score, index}
            <tr>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
              <td>{score.mode}</td>
              <td>{new Date(score.date).toLocaleDateString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .scoreboard-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .mode-filter {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .mode-filter button {
    padding: 0.5rem 1rem;
    border: 1px solid #646cff;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }

  .mode-filter button.active {
    background: #646cff;
  }

  .scores-list {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
  }

  th {
    border-bottom: 2px solid #646cff;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .no-scores {
    text-align: center;
    padding: 2rem;
    color: #888;
  }
</style>

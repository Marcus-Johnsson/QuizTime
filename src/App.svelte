<script lang="ts">
  import HomePage from './pages/HomePage.svelte';
  import GamePage from './pages/GamePage.svelte';
  import ScoreboardPage from './pages/ScoreboardPage.svelte';
  import SettingsPage from './pages/SettingsPage.svelte';
  import ExperienceSelector from './components/ExperienceSelector.svelte';
  import TagSelector from './components/TagSelector.svelte';
  import type { GameMode, GameSettings, ExperienceLevel } from './services/QuizService';

  type Page = 'home' | 'experience' | 'tags' | 'game' | 'scoreboard' | 'settings';

  let currentPage = $state<Page>('home');
  let gameSettings = $state<GameSettings | null>(null);
  let selectedMode = $state<GameMode | null>(null);
  let selectedExperienceLevel = $state<ExperienceLevel | null>(null);

  function handleModeSelect(mode: GameMode) {
    selectedMode = mode;
    currentPage = 'experience';
  }

  function handleExperienceSelect(level: ExperienceLevel) {
    selectedExperienceLevel = level;
    currentPage = 'tags';
  }

  function handleTagSelect(tags: string[]) {
    if (selectedMode && selectedExperienceLevel) {
      // For challenge modes, default to 20 seconds
      if (selectedMode.startsWith('challenge')) {
        gameSettings = { 
          mode: selectedMode, 
          timeLimit: 20, 
          experienceLevel: selectedExperienceLevel,
          tags: tags.length > 0 ? tags : undefined
        };
      } else {
        gameSettings = { 
          mode: selectedMode, 
          experienceLevel: selectedExperienceLevel,
          tags: tags.length > 0 ? tags : undefined
        };
      }
      currentPage = 'game';
    }
  }

  function handleShowScoreboard() {
    currentPage = 'scoreboard';
  }

  function handleShowSettings() {
    currentPage = 'settings';
  }

  function handleBackToHome() {
    currentPage = 'home';
    gameSettings = null;
    selectedMode = null;
    selectedExperienceLevel = null;
  }

  function handleBackToExperience() {
    currentPage = 'experience';
  }
</script>

<main>
  {#if currentPage === 'home'}
    <HomePage onModeSelect={handleModeSelect} onShowScoreboard={handleShowScoreboard} onShowSettings={handleShowSettings} />
  {:else if currentPage === 'experience'}
    <ExperienceSelector onSelect={handleExperienceSelect} onBack={handleBackToHome} />
  {:else if currentPage === 'tags'}
    <TagSelector onSelect={handleTagSelect} onBack={handleBackToExperience} />
  {:else if currentPage === 'game' && gameSettings}
    <GamePage settings={gameSettings} onExit={handleBackToHome} />
  {:else if currentPage === 'scoreboard'}
    <ScoreboardPage onBack={handleBackToHome} />
  {:else if currentPage === 'settings'}
    <SettingsPage onBack={handleBackToHome} />
  {/if}
</main>

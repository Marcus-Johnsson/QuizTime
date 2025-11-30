<script lang="ts">
  import type { ExperienceLevel } from '../services/QuizService';

  interface Props {
    onSelect: (level: ExperienceLevel) => void;
    onBack: () => void;
  }

  let { onSelect, onBack }: Props = $props();

  const experienceLevels = [
    { level: 1 as ExperienceLevel, label: '< 1 Year', description: 'Just started programming' },
    { level: 2 as ExperienceLevel, label: '1-2 Years', description: 'Learning the fundamentals' },
    { level: 3 as ExperienceLevel, label: '2-3 Years', description: 'Building real projects' },
    { level: 4 as ExperienceLevel, label: '3-4 Years', description: 'Comfortable with most concepts' },
    { level: 5 as ExperienceLevel, label: '5+ Years', description: 'Experienced developer' }
  ];
</script>

<div class="experience-selector">
  <h2>Select Your Experience Level</h2>
  <p class="subtitle">We'll show you appropriate questions based on your programming experience</p>

  <div class="levels">
    {#each experienceLevels as exp}
      <button class="level-btn" onclick={() => onSelect(exp.level)}>
        <div class="level-label">{exp.label}</div>
        <div class="level-description">{exp.description}</div>
      </button>
    {/each}
  </div>

  <button class="back-btn" onclick={onBack}>Back</button>
</div>

<style>
  .experience-selector {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #888;
    margin-bottom: 2rem;
  }

  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .level-btn {
    padding: 1.5rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    text-align: left;
  }

  .level-btn:hover {
    background: #646cff;
    transform: translateX(5px);
  }

  .level-label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .level-description {
    color: #888;
    font-size: 0.9rem;
  }

  .level-btn:hover .level-description {
    color: #fff;
  }

  .back-btn {
    padding: 0.75rem 2rem;
    border: 1px solid #888;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
  }

  .back-btn:hover {
    background: #888;
  }
</style>

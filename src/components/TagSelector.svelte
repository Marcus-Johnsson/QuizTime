<script lang="ts">
  import { quizService } from '../services/QuizService';

  interface Props {
    onSelect: (tags: string[]) => void;
    onBack: () => void;
  }

  let { onSelect, onBack }: Props = $props();

  const allTags = quizService.getAllTags();
  let selectedTags = $state<string[]>([]);

  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

  function handleContinue() {
    onSelect(selectedTags);
  }

  function selectAll() {
    selectedTags = [...allTags];
  }

  function clearAll() {
    selectedTags = [];
  }
</script>

<div class="tag-selector">
  <h2>Select Topics</h2>
  <p class="subtitle">Choose the topics you want to be quizzed on (select none for all topics)</p>

  <div class="action-buttons">
    <button class="action-btn" onclick={selectAll}>Select All</button>
    <button class="action-btn" onclick={clearAll}>Clear All</button>
  </div>

  <div class="tags-grid">
    {#each allTags as tag}
      <button 
        class="tag-btn {selectedTags.includes(tag) ? 'selected' : ''}" 
        onclick={() => toggleTag(tag)}
      >
        {tag}
      </button>
    {/each}
  </div>

  <div class="bottom-actions">
    <button class="back-btn" onclick={onBack}>Back</button>
    <button class="continue-btn" onclick={handleContinue}>
      Continue {selectedTags.length > 0 ? `(${selectedTags.length} selected)` : '(All Topics)'}
    </button>
  </div>
</div>

<style>
  .tag-selector {
    max-width: 700px;
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
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .action-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #888;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: #888;
  }

  .tags-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .tag-btn {
    padding: 0.75rem 1rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.95rem;
  }

  .tag-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(100, 108, 255, 0.3);
  }

  .tag-btn.selected {
    background: #646cff;
    font-weight: bold;
  }

  .bottom-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .back-btn {
    padding: 0.75rem 2rem;
    border: 1px solid #888;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-btn:hover {
    background: #888;
  }

  .continue-btn {
    padding: 0.75rem 2rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: #646cff;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
  }

  .continue-btn:hover {
    background: transparent;
    transform: translateY(-2px);
  }
</style>

<script lang="ts">
  import { aiService } from '../services/AiService';

  interface Props {
    onBack: () => void;
  }

  let { onBack }: Props = $props();
  
  let apiKey = $state(aiService.getApiKey() || '');
  let showKey = $state(false);
  let saveMessage = $state('');

  function handleSave() {
    if (apiKey.trim()) {
      aiService.setApiKey(apiKey.trim());
      saveMessage = '✓ API key saved successfully!';
      setTimeout(() => {
        saveMessage = '';
      }, 3000);
    }
  }

  function handleClear() {
    apiKey = '';
    aiService.setApiKey('');
    saveMessage = 'API key cleared';
    setTimeout(() => {
      saveMessage = '';
    }, 3000);
  }
</script>

<div class="settings-page">
  <h1>Settings</h1>
  
  <div class="settings-section">
    <h2>Google Gemini API Configuration</h2>
    <p class="description">
      To use AI-powered question validation, you need a Google Gemini API key.
    </p>

    <div class="info-box">
      <h3>How to get your free API key:</h3>
      <ol>
        <li>Visit <a href="https://ai.google.dev/" target="_blank" rel="noopener">Google AI Studio</a></li>
        <li>Click "Get API key"</li>
        <li>Sign in with your Google account</li>
        <li>Create a new API key</li>
        <li>Copy and paste it below</li>
      </ol>
      <p class="note">
        <strong>Free tier:</strong> 60 requests per minute • Your key is stored locally in your browser
      </p>
    </div>

    <div class="api-key-input">
      <label for="apiKey">API Key</label>
      <div class="input-group">
        <input
          id="apiKey"
          type={showKey ? 'text' : 'password'}
          bind:value={apiKey}
          placeholder="AIza..."
        />
        <button class="toggle-btn" onclick={() => showKey = !showKey}>
          {showKey ? '🙈' : '👁️'}
        </button>
      </div>
    </div>

    {#if saveMessage}
      <div class="save-message">{saveMessage}</div>
    {/if}

    <div class="button-group">
      <button class="save-btn" onclick={handleSave} disabled={!apiKey.trim()}>
        Save API Key
      </button>
      <button class="clear-btn" onclick={handleClear}>
        Clear
      </button>
    </div>

    <div class="status">
      {#if aiService.hasApiKey()}
        <span class="status-indicator active">✓</span>
        <span>API key configured - AI questions enabled</span>
      {:else}
        <span class="status-indicator inactive">✗</span>
        <span>No API key - AI questions will be skipped</span>
      {/if}
    </div>
  </div>

  <button class="back-btn" onclick={onBack}>Back to Home</button>
</div>

<style>
  .settings-page {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .settings-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .description {
    color: #888;
    margin-bottom: 1.5rem;
  }

  .info-box {
    background: rgba(100, 108, 255, 0.1);
    border: 1px solid rgba(100, 108, 255, 0.3);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .info-box h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #646cff;
  }

  .info-box ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .info-box li {
    margin-bottom: 0.5rem;
  }

  .info-box a {
    color: #646cff;
    text-decoration: none;
  }

  .info-box a:hover {
    text-decoration: underline;
  }

  .note {
    font-size: 0.9rem;
    color: #888;
    margin-top: 1rem;
  }

  .api-key-input {
    margin-bottom: 1rem;
  }

  .api-key-input label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
    color: inherit;
    font-size: 1rem;
    font-family: monospace;
  }

  input:focus {
    outline: none;
    border-color: #747bff;
  }

  .toggle-btn {
    padding: 0.75rem 1rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .toggle-btn:hover {
    background: #646cff;
  }

  .save-message {
    padding: 0.75rem;
    margin-bottom: 1rem;
    background: rgba(76, 175, 80, 0.2);
    color: #4caf50;
    border-radius: 8px;
    text-align: center;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .save-btn, .clear-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .save-btn {
    background: #646cff;
    color: white;
  }

  .save-btn:hover:not(:disabled) {
    background: #747bff;
  }

  .save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .clear-btn {
    background: transparent;
    border: 1px solid #888;
    color: inherit;
  }

  .clear-btn:hover {
    background: #888;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  .status-indicator {
    font-size: 1.5rem;
  }

  .status-indicator.active {
    color: #4caf50;
  }

  .status-indicator.inactive {
    color: #f44336;
  }

  .back-btn {
    width: 100%;
    padding: 1rem;
    border: 2px solid #646cff;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
  }

  .back-btn:hover {
    background: #646cff;
  }
</style>

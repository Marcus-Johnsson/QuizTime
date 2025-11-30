<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Props {
    timeLimit: number;
    onTimeout: () => void;
    timeRemaining?: { value: number };
  }

  let { timeLimit, onTimeout, timeRemaining: timeRemainingProp }: Props = $props();
  let timeRemaining = $state(timeLimit);

  // Update the prop object if provided
  $effect(() => {
    if (timeRemainingProp) {
      timeRemainingProp.value = timeRemaining;
    }
  });
  let intervalId: number | undefined;

  onMount(() => {
    intervalId = setInterval(() => {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        onTimeout();
      }
    }, 1000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  let percentage = $derived((timeRemaining / timeLimit) * 100);
  let isWarning = $derived(percentage < 30);
</script>

<div class="timer">
  <div class="timer-bar" style="width: {percentage}%" class:warning={isWarning}></div>
  <div class="timer-text">{timeRemaining}s</div>
</div>

<style>
  .timer {
    position: relative;
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .timer-bar {
    height: 100%;
    background: #646cff;
    transition: width 1s linear, background 0.3s;
  }

  .timer-bar.warning {
    background: #f44336;
  }

  .timer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>

# QuizTime - Setup Complete! 🎉

## Project Structure

```
QuizTime/
├── src/
│   ├── components/
│   │   ├── ExperienceSelector.svelte - Experience level selection
│   │   ├── QuestionCard.svelte       - Displays question with input field
│   │   └── Timer.svelte              - Visual countdown timer
│   ├── pages/
│   │   ├── HomePage.svelte      - Mode selection screen
│   │   ├── GamePage.svelte      - Main game logic and UI
│   │   └── ScoreboardPage.svelte - Leaderboard display
│   ├── services/
│   │   ├── QuizService.ts       - Question logic, scoring, multipliers
│   │   └── ScoreService.ts      - LocalStorage score management
│   ├── data/
│   │   └── questions.json       - Question database (blank template)
│   ├── App.svelte               - Main app with routing
│   └── main.ts                  - Entry point
├── README.txt                   - Full project documentation
└── package.json                 - Dependencies
```

## Features Implemented

### ✅ Game Modes
- **Continuous Stream**: Endless questions, no time limit, tracks streak
- **Challenge Mode**: 5, 10, or 15 questions with time limits and point scoring

### ✅ Experience Level System
- 5 experience levels (< 1 year to 5+ years)
- Questions filtered by experience level
- Beginners only see questions appropriate for their skill level
- Prevents overwhelming new programmers with advanced topics

### ✅ Scoring System
- Difficulty multipliers: Easy (1.0x), Medium (1.3x), Hard (1.6x)
- Time limit multipliers: 20s (1.0x), 15s (1.3x), 10s (1.6x)
- Combined scoring formula implemented

### ✅ Components
- Question card with difficulty badges
- Visual timer with warning states
- Score tracking and feedback

### ✅ Scoreboard
- LocalStorage persistence
- Filter by game mode
- Top scores display

## Next Steps

### 1. Add Questions
Edit `src/data/questions.json` and add questions in this format:

```json
{
  "questions": [
    {
      "id": 1,
      "difficulty": "easy",
      "experienceLevel": 1,
      "question": "What is the time complexity of binary search?",
      "correctAnswers": ["O(log n)", "O(logn)", "log n", "logarithmic"]
    }
  ]
}
```

**Experience Level Guidelines:**
- Level 1: Basic syntax, simple concepts
- Level 2: Fundamental data structures, basic algorithms  
- Level 3: Intermediate patterns, common frameworks
- Level 4: Advanced concepts, system design basics
- Level 5: Expert topics, architecture, optimization

### 2. Run the App
```bash
npm run dev
```
Open http://localhost:5173/

### 3. Optional Enhancements
- Add settings page for time limit selection before game starts
- Implement better point calculation based on actual time remaining
- Add sound effects and animations
- Create backend API for question management
- Add user authentication
- Implement multiplayer mode

## How It Works

1. **App.svelte** manages routing between Home, Experience, Game, and Scoreboard pages
2. **HomePage** presents mode selection buttons
3. **ExperienceSelector** lets users choose their programming experience level
4. **GamePage** handles game flow:
   - Loads random questions filtered by experience level from JSON
   - Manages timer (if applicable)
   - Checks answers against multiple correct variations
   - Calculates scores with multipliers
   - Saves scores to localStorage
5. **ScoreboardPage** displays filtered leaderboards
6. **Services** provide reusable logic for quiz and score management

## Technologies
- Svelte 5 (latest with runes: $state, $props, $derived)
- TypeScript
- Vite
- LocalStorage for persistence

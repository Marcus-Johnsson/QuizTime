QuizTime - Programming Quiz Station
====================================

OVERVIEW
--------
QuizTime is an interactive quiz application designed for testing and improving programming knowledge. 
Users can challenge themselves with programming questions in different game modes, each offering 
unique gameplay experiences and scoring systems.


GAME MODES
----------

1. CONTINUOUS STREAM MODE
   - Endless question flow with no stopping point
   - New question appears immediately after answering the current one
   - No time limit per question - answer at your own pace
   - Scoring: Track consecutive correct answers in a row
   - Perfect for: Learning and practice without pressure

2. CHALLENGE MODE (5, 10, or 15 Questions)
   - Choose your challenge size: 5, 10, or 15 questions
   - Select time limit per question: 20, 15, or 10 seconds
   - Points awarded based on remaining time when you answer correctly
   - Faster correct answers = more points
   - Lower time limits = higher point multipliers
   - Scoring: Total points accumulated across all questions
   - Perfect for: Competitive play and testing speed + accuracy


EXPERIENCE LEVELS
-----------------
Before starting a game, you select your programming experience level.
Questions are filtered to match your experience:

   - LEVEL 1: < 1 Year - Just started programming
   - LEVEL 2: 1-2 Years - Learning the fundamentals  
   - LEVEL 3: 2-3 Years - Building real projects
   - LEVEL 4: 3-4 Years - Comfortable with most concepts
   - LEVEL 5: 5+ Years - Experienced developer

Example: If you select Level 2, you'll only see questions marked Level 1-2.
This ensures beginners aren't overwhelmed by advanced database or architecture questions.


QUESTION DIFFICULTY & POINT MULTIPLIERS
----------------------------------------
Each question has a difficulty level that affects scoring in Challenge Mode:

   - EASY: 1.0x points multiplier
   - MEDIUM: 1.3x points multiplier
   - HARD: 1.6x points multiplier

Example: If you earn 100 base points for a quick answer:
   - Easy question: 100 × 1.0 = 100 points
   - Medium question: 100 × 1.3 = 130 points
   - Hard question: 100 × 1.6 = 160 points


TIME LIMIT MULTIPLIERS
----------------------
In Challenge Mode, you can select different time limits per question.
Lower time limits increase the challenge and reward more points:

   - 20 SECONDS: 1.0x points multiplier
   - 15 SECONDS: 1.3x points multiplier
   - 10 SECONDS: 1.6x points multiplier


TOTAL SCORE CALCULATION
-----------------------
Your final score for each question is calculated by combining all multipliers:

Final Points = Base Points (from remaining time) × Difficulty Multiplier × Time Limit Multiplier

Example: Hard question with 10-second limit, answered with 60% time remaining:
   - Base points: 100
   - Difficulty: 1.6x (Hard)
   - Time limit: 1.6x (10 seconds)
   - Final score: 100 × 1.6 × 1.6 = 256 points


SCOREBOARD SYSTEM
-----------------

Continuous Stream Mode Leaderboard:
   - Tracks highest number of correct answers in a row
   - Displays best streaks achieved by users

Challenge Mode Leaderboard:
   - Separate leaderboards for each challenge size (5, 10, 15)
   - Ranks based on total points earned
   - Points reflect both accuracy and speed


FEATURES
--------
- Programming-focused questions covering various topics and difficulty levels
- Multiple game modes to suit different learning and playing styles
- Time-based scoring system for competitive challenge modes
- Persistent scoreboards to track personal bests and compete with others
- Clean, intuitive interface built with Svelte and TypeScript


TECHNOLOGY STACK
----------------
- Frontend: Svelte 5 + TypeScript
- Build Tool: Vite
- Styling: CSS


HOW TO RUN
----------
1. Install dependencies: npm install
2. Start development server: npm run dev
3. Open browser to: http://localhost:5173/
4. Build for production: npm run build


FUTURE ENHANCEMENTS
-------------------
- Backend API for question management
- User authentication and profiles
- Question difficulty selection
- Category filtering (algorithms, data structures, language-specific, etc.)
- Multiplayer modes
- Question contribution system

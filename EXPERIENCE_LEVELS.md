# Experience Level System

## Overview
The experience level system filters questions based on the user's programming experience, ensuring beginners aren't overwhelmed with advanced topics like databases, architecture, or complex algorithms.

## How It Works

### User Flow
1. Select game mode (Continuous or Challenge)
2. Choose experience level (1-5)
3. Play with questions appropriate for your level

### Experience Levels

| Level | Years | Description | Question Types |
|-------|-------|-------------|----------------|
| 1 | < 1 Year | Just started programming | Basic syntax, variables, simple control flow |
| 2 | 1-2 Years | Learning the fundamentals | Arrays, loops, functions, basic OOP |
| 3 | 2-3 Years | Building real projects | Data structures, common algorithms, frameworks |
| 4 | 3-4 Years | Comfortable with most concepts | Design patterns, advanced algorithms, databases |
| 5 | 5+ Years | Experienced developer | System design, architecture, optimization, all topics |

## Filtering Logic

When a user selects experience level N, they will see:
- All questions marked level N or below
- Example: Level 3 user sees questions marked 1, 2, and 3

This ensures:
- ✅ Progressive difficulty
- ✅ No overwhelming advanced topics
- ✅ Appropriate challenge for skill level

## Question Structure

```json
{
  "id": 1,
  "difficulty": "easy",
  "experienceLevel": 2,
  "question": "What is a closure in JavaScript?",
  "correctAnswers": ["closure", "function"]
}
```

## Guidelines for Creating Questions

### Level 1 (< 1 Year)
- Language basics (variables, data types)
- Simple operators
- Basic control structures (if/else, loops)
- Console output

### Level 2 (1-2 Years)
- Arrays and strings
- Functions and parameters
- Basic object-oriented concepts
- Simple algorithms (sorting basics)

### Level 3 (2-3 Years)
- Data structures (stack, queue, linked list)
- Common algorithms (binary search, recursion)
- Web basics (HTTP, REST)
- Framework fundamentals

### Level 4 (3-4 Years)
- Design patterns
- Database concepts (SQL, indexes)
- Advanced algorithms
- System design basics

### Level 5 (5+ Years)
- Architecture patterns
- Performance optimization
- Distributed systems
- Expert-level topics

## Benefits

1. **Better Learning Experience**: Beginners aren't discouraged by questions beyond their knowledge
2. **Appropriate Challenge**: Questions match current skill level
3. **Progressive Growth**: Users can increase their level as they improve
4. **Fair Competition**: Scoreboards reflect skill at appropriate difficulty

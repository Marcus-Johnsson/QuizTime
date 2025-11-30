// Service for AI-powered answer validation using Google Gemini API

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

class AiService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', key);
    }
  }

  getApiKey(): string | null {
    if (this.apiKey) return this.apiKey;
    
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      const storedKey = localStorage.getItem('gemini_api_key');
      if (storedKey) {
        this.apiKey = storedKey;
        return storedKey;
      }
    }
    
    return null;
  }

  hasApiKey(): boolean {
    return this.getApiKey() !== null;
  }

  async checkAnswer(
    question: string,
    userAnswer: string,
    correctAnswers: string[]
  ): Promise<boolean> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error('Gemini API key not set. Please configure your API key in settings.');
    }

    try {
      const prompt = `You are grading a programming quiz answer. 

Question: ${question}
Student's Answer: ${userAnswer}
Expected Answer(s): ${correctAnswers.join(' OR ')}

Is the student's answer correct? Consider:
- Technical accuracy
- Conceptual understanding
- Acceptable variations in wording

Respond with ONLY "yes" or "no" (lowercase, no punctuation).`;

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1, // Low temperature for consistent grading
            maxOutputTokens: 10,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase().trim();

      if (!aiResponse) {
        throw new Error('Invalid response from Gemini API');
      }

      return aiResponse === 'yes';
    } catch (error) {
      console.error('Error checking answer with AI:', error);
      throw error;
    }
  }
}

export const aiService = new AiService();

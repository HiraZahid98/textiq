import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function analyzeText(text: string) {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a text analysis AI. Always respond with valid JSON only. No markdown, no backticks, no explanation.',
      },
      {
        role: 'user',
        content: `Analyze this text and respond ONLY in this exact JSON format:
{
  "summary": "2-3 sentence summary here",
  "sentiment": "positive",
  "sentiment_score": 0.85,
  "key_topics": ["topic1", "topic2", "topic3"],
  "readability_grade": "Grade 8"
}

sentiment must be exactly one of: positive, negative, neutral
sentiment_score must be a number between 0 and 1

Text to analyze: ${text}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  const responseText = completion.choices[0]?.message?.content || '';
  const clean = responseText.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}
import axios from 'axios';

// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';


interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const getLegalResponse = async (question: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are an expert Indian legal assistant. Provide specific legal guidance in this format:

            First Message:
            - Quote the relevant law/section
            - Give specific legal steps to take
            - Mention any immediate deadlines
            - Ask one key question for better guidance

            Example response:
            "Under [specific law and section], here's what you need to know:
            - [Specific legal action required]
            - [Another legal requirement]
            - [Any legal deadline]

            Could you tell me [one specific question about their case]? This will help me provide more targeted legal advice."

            Keep responses short but include specific laws and legal requirements.
            
            User's question: ${question}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    throw new Error('Failed to get legal response. Please try again later.');
  }
}; 
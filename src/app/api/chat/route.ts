import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Simple rate limiting (In-memory, session based for hackathon)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

const systemInstruction = `
You are the AI assistant for Deepesh Patel's portfolio website.
Answer questions strictly based on the following context about Deepesh.
Do not make up facts or answer questions unrelated to Deepesh's professional profile.
Keep answers concise, polite, and professional.

### Context about Deepesh Patel:
- **Role**: AI & ML Engineer
- **Education**: B.Tech in Artificial Intelligence and Machine Learning from Acropolis Institute of Technology and Research, Indore (Aug 2024 - Aug 2028, CGPA: 7.96). Class XII from Vijay Jyoti Academy (85.4%).
- **Skills**: Python, C, C++, Java, NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, Git, Docker, PostgreSQL, Firestore.
- **Projects**:
  1. Books Recommender (Machine Learning, Data Analysis): Python, Kaggle dataset, Pandas, NumPy, Cosine Similarity.
  2. Laptop Recommender System (Machine Learning, Web Deployment): Python backend, Streamlit frontend, deployed on Hugging Face.
  3. Sortify: Sorting Visualizer: Vanilla HTML/CSS/JS visualizer for Bubble, Merge, Quick Sort.
  4. Reflect AI: Your AI Companion: Serverless journaling app, Gemini API integration, Firestore.
- **Certifications**: Python for Data Science (NPTEL, Top 2%), Python Foundation (Infosys), AI Foundation (Infosys).
- **Volunteer Experience**: Technical Team Member & Visual Designer at IEEE ICIH Conference (Nov 2025). Managed presentations, designed posters, certificates.
- **Interests**: Strategy games, independent tech research, long-distance running.
- **Contact**: Email: pateldeepesh1408@gmail.com, GitHub: github.com/deepesh-45, LinkedIn: linkedin.com/in/deepesh-patel.
`;

export async function POST(req: Request) {
  try {
    // Simple IP based rate limit (mocking with generic key if IP not available)
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    if (now - userLimit.timestamp > RATE_WINDOW) {
      userLimit.count = 0;
      userLimit.timestamp = now;
    }
    
    if (userLimit.count >= RATE_LIMIT) {
      return NextResponse.json(
        { reply: "I've reached my question limit for this session! Please reach out to Deepesh directly via the Contact section." },
        { status: 429 }
      );
    }
    
    rateLimitMap.set(ip, { count: userLimit.count + 1, timestamp: userLimit.timestamp });

    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback if no key is set yet
      return NextResponse.json({ 
        reply: "My backend AI is currently disabled (missing API key). Deepesh is likely setting this up right now!" 
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Format history for Gemini API
    let formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Gemini requires the first message to be from the user.
    // Filter out the initial greeting from the assistant.
    while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: message }]}
        ],
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.3,
        }
    });

    return NextResponse.json({ reply: response.text });
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: "I'm temporarily unavailable. Please reach out via the contact section instead." },
      { status: 500 }
    );
  }
}

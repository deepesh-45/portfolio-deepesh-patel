import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatboxProps {
  currentTheme: {
    cardBg: string
    cardBorder: string
    textColor: string
    subTextColor: string
    pillBg: string
    pillBorder: string
    accent: string
    spotlight: string
  }
  lang: 'en' | 'hi'
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['who', 'about', 'deepesh', 'introduce', 'name', 'profile'],
    answerEn:
      "Deepesh Patel is an AI & Machine Learning student at Acropolis Institute of Technology and Research (Indore, India). He specializes in machine learning models, predictive analytics, and serverless AI integrations.",
    answerHi:
      "दीपेश पटेल एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में एआई और मशीन लर्निंग के छात्र हैं। वह मशीन लर्निंग मॉडल, प्रिडिक्टिव एनालिटिक्स और एआई इंटीग्रेशन में विशेषज्ञता रखते हैं।",
  },
  {
    keywords: ['education', 'college', 'acropolis', 'cgpa', 'degree', 'gpa', 'university', 'btech', 'b.tech'],
    answerEn:
      "Deepesh is pursuing B.Tech in Artificial Intelligence & Machine Learning (Aug 2024 – Aug 2028) at Acropolis Institute of Technology and Research, maintaining a strong 7.96 CGPA.",
    answerHi:
      "दीपेश एकोपोलिस इंस्टीट्यूट में एआई एंड एमएल (2024-2028) में बी.टेक कर रहे हैं और उनका सीजीपीए 7.96 है।",
  },
  {
    keywords: ['project', 'projects', 'reflect', 'sortify', 'laptop', 'books', 'work', 'app', 'repo'],
    answerEn:
      "Deepesh's key featured projects include:\n1. Reflect AI (Gemini API & Firestore journaling app)\n2. Sortify (Real-time Sorting Visualizer)\n3. Laptop Recommender System (Streamlit ML app on Hugging Face)\n4. Books Recommender System (Pandas, NumPy & Cosine Similarity vector matching).",
    answerHi:
      "दीपेश की मुख्य परियोजनाएं:\n1. Reflect AI (Gemini API और Firestore जर्नलिंग ऐप)\n2. Sortify (रीयल-टाइम सॉर्टिंग विजुअलाइज़र)\n3. Laptop Recommender System (Streamlit ML ऐप)\n4. Books Recommender System (Pandas और Cosine Similarity vector matching)।",
  },
  {
    keywords: ['nptel', 'cert', 'certification', 'iit', 'madras', 'score', 'infosys', 'achievement', 'topper'],
    answerEn:
      "Deepesh earned the NPTEL IIT Madras 'Python for Data Science' Course Topper (Top 2%) badge with an 83% score! He also holds Infosys certifications in Python Foundation and Artificial Intelligence Foundation.",
    answerHi:
      "दीपेश ने NPTEL IIT मद्रास 'Python for Data Science' में 83% अंक के साथ टॉप 2% कोर्स टॉपर का ख़िताब जीता है! उन्होंने इंफोसिस से पाइथन और एआई फाउंडेशन सर्टिफिकेट भी हासिल किया है।",
  },
  {
    keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'hire', 'mail', 'phone'],
    answerEn:
      "You can contact Deepesh directly via:\n• Email: pateldeepesh1408@gmail.com\n• LinkedIn: linkedin.com/in/deepesh-patel-564b35398\n• GitHub: github.com/deepesh-45",
    answerHi:
      "आप दीपेश से सीधे संपर्क कर सकते हैं:\n• ई-मेल: pateldeepesh1408@gmail.com\n• लिंक्डइन: linkedin.com/in/deepesh-patel-564b35398\n• गिटहब: github.com/deepesh-45",
  },
  {
    keywords: ['running', 'hobby', 'hobbies', 'game', 'games', 'discipline', 'strategy'],
    answerEn:
      "Beyond coding, Deepesh practices long-distance running to build mental resilience and discipline, and plays strategy-based games to sharpen critical thinking.",
    answerHi:
      "कोडिंग के अलावा, दीपेश मानसिक दृढ़ता के लिए लंबी दूरी की दौड़ लगाते हैं और रणनीति-आधारित खेल खेलते हैं।",
  },
  {
    keywords: ['skill', 'skills', 'python', 'java', 'c++', 'react', 'machine learning', 'tech stack', 'ml'],
    answerEn:
      "Deepesh's technical stack includes Python, C, C++, Java, JavaScript, TypeScript, React, Next.js, NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, Git, Docker, PostgreSQL, and Firestore.",
    answerHi:
      "दीपेश का तकनीकी कौशल: Python, C, C++, Java, JavaScript, TypeScript, React, Next.js, NumPy, Pandas, Scikit-learn, Docker, PostgreSQL, और Firestore।",
  },
]

export default function Chatbox({ currentTheme, lang }: ChatboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        lang === 'hi'
          ? "नमस्ते! मैं दीपेश का एआई असिस्टेंट हूँ। उनके कौशल, प्रोजेक्ट्स, प्रमाणपत्र या अनुभव के बारे में कुछ भी पूछें!"
          : "Hi! I'm Deepesh's AI assistant. Ask me anything about his skills, projects, certifications, or experience!",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const findAnswer = (query: string): string => {
    const lower = query.toLowerCase()
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return lang === 'hi' ? item.answerHi : item.answerEn
      }
    }

    return lang === 'hi'
      ? "दीपेश के पास मशीन लर्निंग, डेटा एनालिसिस और वेब डेवलपमेंट में मजबूत पृष्ठभूमि है। अधिक जानकारी के लिए नीचे दिए गए संपर्क फॉर्म का उपयोग करें या ईमेल करें: pateldeepesh1408@gmail.com!"
      : "Deepesh has a strong background in Machine Learning, Data Analytics, and Web Development. For specific queries, feel free to email him at pateldeepesh1408@gmail.com!"
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userQuery = input.trim()
    const userMessage: Message = { role: 'user', content: userQuery }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const replyText = findAnswer(userQuery)
      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }])
      setIsLoading(false)
    }, 500)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant Chat"
        style={{
          position: 'fixed',
          bottom: 'clamp(16px, 3vw, 24px)',
          right: 'clamp(16px, 3vw, 24px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'clamp(48px, 12vw, 56px)',
          height: 'clamp(48px, 12vw, 56px)',
          borderRadius: '50%',
          backgroundColor: currentTheme.accent,
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isOpen ? 'rotate(90deg) scale(0.95)' : 'scale(1)',
        }}
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 'clamp(74px, 14vw, 92px)',
            right: 'clamp(12px, 3vw, 24px)',
            left: 'clamp(12px, 3vw, auto)',
            zIndex: 1000,
            width: 'clamp(290px, 92vw, 380px)',
            height: '470px',
            maxHeight: 'calc(100vh - 100px)',
            backgroundColor: currentTheme.cardBg,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${currentTheme.cardBorder}`,
            borderRadius: '24px',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${currentTheme.cardBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: currentTheme.pillBg,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>
                  {lang === 'hi' ? 'दीपेश का एआई सहायक' : "Deepesh's AI Assistant"}
                </h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: currentTheme.accent, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: currentTheme.subTextColor, cursor: 'pointer', outline: 'none' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    backgroundColor: msg.role === 'user' ? currentTheme.accent : currentTheme.pillBg,
                    border: `1px solid ${msg.role === 'user' ? 'transparent' : currentTheme.pillBorder}`,
                    color: msg.role === 'user' ? '#ffffff' : currentTheme.textColor,
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '20px 20px 20px 4px',
                    backgroundColor: currentTheme.pillBg,
                    border: `1px solid ${currentTheme.pillBorder}`,
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: currentTheme.accent, animation: 'pulse 1s infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: currentTheme.accent, animation: 'pulse 1s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: currentTheme.accent, animation: 'pulse 1s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '12px 16px',
              borderTop: `1px solid ${currentTheme.cardBorder}`,
              display: 'flex',
              gap: '8px',
              backgroundColor: currentTheme.pillBg,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'hi' ? 'परियोजनाओं, कौशल के बारे में पूछें...' : 'Ask about projects, skills, resume...'}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '9999px',
                backgroundColor: currentTheme.cardBg,
                border: `1px solid ${currentTheme.cardBorder}`,
                color: currentTheme.textColor,
                fontSize: '0.88rem',
                outline: 'none',
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentTheme.accent,
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

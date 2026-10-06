import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, Terminal } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatboxProps {
  currentTheme: {
    bgCanvas: string
    surfaceLow: string
    surface: string
    surfaceHigh: string
    surfaceVariant: string
    primary: string
    secondary: string
    textColor: string
    subTextColor: string
    hairlineBorder: string
    goldAccent: string
  }
  lang: 'en' | 'hi'
  isOpen?: boolean
  onToggle?: () => void
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['who', 'about', 'deepesh', 'introduce', 'name', 'profile', 'bio'],
    answerEn:
      "Deepesh Patel is an AI & Machine Learning student at Acropolis Institute of Technology and Research (Indore, India). He specializes in machine learning models, predictive data pipelines, and serverless AI integrations.",
    answerHi:
      "दीपेश पटेल एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च (इंदौर) में एआई और मशीन लर्निंग के छात्र हैं। वह मशीन लर्निंग मॉडल, प्रिडिक्टिव डेटा पाइपलाइन और सर्वरलेस एआई इंटीग्रेशन में विशेषज्ञता रखते हैं।",
  },
  {
    keywords: ['education', 'college', 'acropolis', 'cgpa', 'degree', 'gpa', 'university', 'btech', 'b.tech'],
    answerEn:
      "Deepesh is pursuing B.Tech in Artificial Intelligence & Machine Learning (Aug 2024 – Aug 2028) at Acropolis Institute of Technology and Research, maintaining a strong 7.96 CGPA.",
    answerHi:
      "दीपेश एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च से एआई एंड एमएल में बी.टेक (2024-2028) कर रहे हैं, और उनका वर्तमान सीजीपीए 7.96 है।",
  },
  {
    keywords: ['project', 'projects', 'reflect', 'sortify', 'laptop', 'books', 'work', 'app', 'repo'],
    answerEn:
      "Deepesh's key featured projects include:\n1. Reflect AI: Serverless journaling web app with Gemini API & Firestore\n2. Laptop Recommender: Interactive ML app built with Streamlit & Scikit-Learn on Hugging Face\n3. Books Recommender: Vector similarity matching using Pandas, NumPy & Cosine Similarity\n4. Sortify: Real-time interactive sorting algorithm visualizer.",
    answerHi:
      "दीपेश की मुख्य परियोजनाएं:\n1. Reflect AI (Gemini API और Firestore सर्वरलेस जर्नलिंग ऐप)\n2. Laptop Recommender System (Streamlit और Scikit-Learn आधारित एमएल ऐप, Hugging Face पर लाइव)\n3. Books Recommender System (Pandas और Cosine Similarity वेक्टर मिलान)\n4. Sortify (रीयल-टाइम सॉर्टिंग एल्गोरिदम विजुअलाइज़र)।",
  },
  {
    keywords: ['nptel', 'cert', 'certification', 'iit', 'madras', 'score', 'infosys', 'achievement', 'topper'],
    answerEn:
      "Deepesh achieved NPTEL IIT Madras 'Python for Data Science' Course Topper (Top 2%) with an 83% score! He also holds certifications in Programming in Python and Artificial Intelligence.",
    answerHi:
      "दीपेश ने NPTEL IIT मद्रास 'Python for Data Science' में 83% अंक के साथ टॉप 2% कोर्स टॉपर का ख़िताब हासिल किया! उनके पास प्रोग्रामिंग इन पाइथन और आर्टिफिशियल इंटेलिजेंस सर्टिफिकेट भी हैं।",
  },
  {
    keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'hire', 'mail', 'phone'],
    answerEn:
      "You can connect directly with Deepesh via:\n• Email: pateldeepesh1408@gmail.com\n• LinkedIn: linkedin.com/in/deepesh-patel-564b35398\n• GitHub: github.com/deepesh-45",
    answerHi:
      "आप दीपेश से संपर्क कर सकते हैं:\n• ई-मेल: pateldeepesh1408@gmail.com\n• लिंक्डइन: linkedin.com/in/deepesh-patel-564b35398\n• गिटहब: github.com/deepesh-45",
  },
  {
    keywords: ['running', 'hobby', 'hobbies', 'game', 'games', 'discipline', 'strategy'],
    answerEn:
      "Outside engineering, Deepesh practices long-distance running to sharpen physical endurance, focus, and resilience, and enjoys strategic gaming for analytical reasoning.",
    answerHi:
      "इंजीनियरिंग के अलावा, दीपेश सहनशक्ति और अनुशासन के लिए लंबी दूरी की दौड़ का अभ्यास करते हैं, और रणनीतिक खेल खेलना पसंद करते हैं।",
  },
]

export const Chatbox = ({ currentTheme, lang, isOpen: controlledIsOpen, onToggle }: ChatboxProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isChatOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const toggleChat = onToggle || (() => setInternalIsOpen(!internalIsOpen))

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: 'assistant',
      content:
        lang === 'hi'
          ? 'नमस्ते! मैं प्राण (PRANA AI) हूँ — दीपेश पटेल का डिजिटल कोपायलट। आप उनके प्रोजेक्ट्स, स्किल्स या आईआईटी मद्रास अचीवमेंट्स के बारे में कुछ भी पूछ सकते हैं।'
          : 'Namaskaram! I am PRANA AI — Deepesh Patel’s computational copilot. Inquire freely about his machine learning projects, NPTEL IIT Madras honors, or architectural background.',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const findAnswer = (question: string): string => {
    const qLower = question.toLowerCase()
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => qLower.includes(kw))) {
        return lang === 'hi' ? item.answerHi : item.answerEn
      }
    }
    return lang === 'hi'
      ? 'क्षमा करें, मुझे इस बारे में सटीक जानकारी नहीं मिली। आप दीपेश से pateldeepesh1408@gmail.com पर संपर्क कर सकते हैं या उनके प्रोजेक्ट्स और स्किल्स के बारे में पूछ सकते हैं।'
      : "I don't have exact details on that specific topic. Feel free to contact Deepesh directly at pateldeepesh1408@gmail.com, or ask about his ML projects, IIT Madras distinction, or technical stack."
  }

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg: Message = { role: 'user', content: query }
    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const answer = findAnswer(query)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
      setIsTyping(false)
    }, 450)
  }

  const quickPrompts =
    lang === 'hi'
      ? ['दीपेश का परिचय', 'प्रमुख प्रोजेक्ट्स', 'आईआईटी मद्रास उपलब्धि', 'संपर्क सूत्र']
      : ['Who is Deepesh?', 'Featured Projects', 'NPTEL IIT Madras Topper', 'Contact & Links']

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={toggleChat}
        aria-label="Open AI Assistant"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          borderRadius: '9999px',
          backgroundColor: currentTheme.primary,
          color: currentTheme.bgCanvas,
          border: `1px solid ${currentTheme.hairlineBorder}`,
          boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
          cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: currentTheme.goldAccent,
            boxShadow: `0 0 10px ${currentTheme.goldAccent}`,
          }}
        />
        <Bot size={18} />
        <span>{lang === 'hi' ? 'प्राण AI' : 'PRANA AI'}</span>
      </button>

      {/* Slide-over Editorial Drawer / Chat Window */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            zIndex: 10000,
            width: 'min(440px, calc(100vw - 32px))',
            height: 'min(620px, calc(100vh - 120px))',
            backgroundColor: currentTheme.surface,
            borderRadius: '24px',
            border: `1px solid ${currentTheme.hairlineBorder}`,
            boxShadow: '0 25px 60px -15px rgba(36, 33, 32, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            animation: 'fadeInUp 0.25s ease-out',
          }}
        >
          {/* Telemetry Header */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: currentTheme.surfaceLow,
              borderBottom: `1px solid ${currentTheme.hairlineBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.surfaceVariant,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentTheme.primary,
                  position: 'relative',
                }}
              >
                <Terminal size={18} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: currentTheme.goldAccent,
                  }}
                />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: currentTheme.primary,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    PRANA AI
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: currentTheme.surfaceVariant,
                      color: currentTheme.secondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                    }}
                  >
                    v2.4 Core
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: currentTheme.secondary }}>
                  {lang === 'hi' ? 'दीपेश पटेल का न्यूरल कोपायलट' : 'Deepesh Patel’s Spatial Copilot'}
                </div>
              </div>
            </div>

            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: currentTheme.secondary,
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Telemetry Status Ribbon */}
          <div
            style={{
              padding: '6px 20px',
              backgroundColor: currentTheme.surfaceVariant,
              fontSize: '0.68rem',
              color: currentTheme.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <span>Model: Gemini / Neural Engine</span>
            <span>Sync: 99.4%</span>
            <span>Studio Clearance</span>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '18px 20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: m.role === 'user' ? currentTheme.primary : currentTheme.surfaceLow,
                  color: m.role === 'user' ? currentTheme.bgCanvas : currentTheme.textColor,
                  fontSize: '0.92rem',
                  lineHeight: 1.55,
                  border: m.role === 'user' ? 'none' : `1px solid ${currentTheme.hairlineBorder}`,
                  whiteSpace: 'pre-line',
                }}
              >
                {m.content}
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '10px 16px',
                  borderRadius: '18px',
                  backgroundColor: currentTheme.surfaceLow,
                  border: `1px solid ${currentTheme.hairlineBorder}`,
                  color: currentTheme.secondary,
                  fontSize: '0.85rem',
                  fontStyle: 'italic',
                }}
              >
                {lang === 'hi' ? 'प्राण विचार कर रहा है...' : 'Synthesizing response...'}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div
            style={{
              padding: '8px 16px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              borderTop: `1px solid ${currentTheme.hairlineBorder}`,
            }}
          >
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  backgroundColor: currentTheme.surfaceLow,
                  border: `1px solid ${currentTheme.hairlineBorder}`,
                  color: currentTheme.secondary,
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: currentTheme.surfaceLow,
              borderTop: `1px solid ${currentTheme.hairlineBorder}`,
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'hi' ? 'दीपेश के बारे में कुछ भी पूछें...' : 'Ask about Deepesh’s work, code, or background...'}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: currentTheme.surface,
                border: `1px solid ${currentTheme.hairlineBorder}`,
                color: currentTheme.textColor,
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: currentTheme.primary,
                color: currentTheme.bgCanvas,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbox

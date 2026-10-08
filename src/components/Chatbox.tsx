import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

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
      "Deepesh is pursuing B.Tech in Artificial Intelligence & Machine Learning (2022 – 2026) at Acropolis Institute of Technology and Research, maintaining a strong 7.64 CGPA.",
    answerHi:
      "दीपेश एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च से एआई एंड एमएल में बी.टेक (2022-2026) कर रहे हैं, और उनका वर्तमान सीजीपीए 7.64 है।",
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
      {/* Standalone 3D AI Personal Assistant (No container box, sitting alone in the corner) */}
      <button
        onClick={toggleChat}
        aria-label="Open AI Personal Assistant"
        style={{
          position: 'fixed',
          bottom: 0,
          right: isChatOpen ? 'calc(min(440px, calc(100vw - 32px)) + 36px)' : 'clamp(16px, 3.5vw, 40px)',
          zIndex: 9999,
          background: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={isChatOpen ? 'hidden md:flex' : 'flex'}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1.0)'
        }}
      >
        <div style={{ position: 'relative' }}>
          {/* Animated 3D Avatar waving hello - doubled size */}
          <img
            src="/ai-avatar-wave.webp"
            alt="AI Personal Assistant Waving Hello"
            style={{
              display: 'block',
              width: 'clamp(190px, 18vw, 260px)',
              height: 'auto',
              filter:
                'drop-shadow(0 18px 36px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 24px rgba(212, 155, 158, 0.32))',
              userSelect: 'none',
              pointerEvents: 'auto',
            }}
          />
        </div>
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
          {/* Header Featuring 3D AI Avatar */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: currentTheme.surfaceLow,
              borderBottom: `1px solid ${currentTheme.hairlineBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', width: '42px', height: '42px', flexShrink: 0 }}>
                <img
                  src="/ai-avatar.jpg"
                  alt="Deepesh AI Avatar"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `1.5px solid ${currentTheme.primary}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    border: '2px solid #260B0F',
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    color: currentTheme.textColor,
                  }}
                >
                  {lang === 'hi' ? 'पोर्टफोलियो एआई असिस्टेंट' : 'Portfolio AI Assistant'}
                </div>
                <div style={{ fontSize: '0.76rem', color: currentTheme.subTextColor }}>
                  {lang === 'hi' ? 'ऑनलाइन · जेमिनी एआई द्वारा संचालित' : 'Online · Powered by Gemini API'}
                </div>
              </div>
            </div>

            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: currentTheme.textColor,
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
                  color: '#FFFFFF',
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
                {lang === 'hi' ? 'एआई सोच रहा है...' : 'AI is typing...'}
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
                color: '#FFFFFF',
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

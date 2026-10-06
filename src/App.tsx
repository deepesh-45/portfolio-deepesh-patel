import { useState, useEffect } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react'
import NamaskaramAvatar from './components/NamaskaramAvatar'
import Chatbox from './components/Chatbox'

// Editorial luxury color tokens matching DESIGN.md & stitch_3d_avatar_personal_portfolio
const themes = {
  light: {
    bgCanvas: '#fcf9f2',
    surfaceLow: '#f6f3ec',
    surface: '#f1eee7',
    surfaceHigh: '#ebe8e1',
    surfaceVariant: '#e5e2db',
    primary: '#332e2d',
    secondary: '#645d59',
    textColor: '#1c1c18',
    subTextColor: '#4e4543',
    hairlineBorder: 'rgba(78, 69, 67, 0.15)',
    goldAccent: '#c8aa6e',
    glowColor: 'rgba(233, 221, 216, 0.6)',
  },
  dark: {
    bgCanvas: '#171514',
    surfaceLow: '#1f1c1b',
    surface: '#262322',
    surfaceHigh: '#2e2a29',
    surfaceVariant: '#3a3533',
    primary: '#f5f2eb',
    secondary: '#b0a7a2',
    textColor: '#fcf9f2',
    subTextColor: '#cfc5bf',
    hairlineBorder: 'rgba(209, 196, 193, 0.16)',
    goldAccent: '#dfc79b',
    glowColor: 'rgba(78, 68, 57, 0.4)',
  },
}

const skillCategories = [
  {
    title: 'Core Programming Languages',
    titleHi: 'प्रमुख प्रोग्रामिंग भाषाएं',
    skills: ['Python', 'C++', 'TypeScript', 'JavaScript', 'SQL', 'HTML5 & CSS3'],
  },
  {
    title: 'Machine Learning & Data Science',
    titleHi: 'मशीन लर्निंग और डेटा साइंस',
    skills: ['Scikit-Learn', 'Pandas', 'NumPy', 'Predictive Modeling', 'Cosine Similarity', 'Vector Math'],
  },
  {
    title: 'Frameworks & Full-Stack Development',
    titleHi: 'फ्रेमवर्क और फुल-स्टैक डेवलपमेंट',
    skills: ['React 19', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express', 'Streamlit', 'Three.js / WebGL'],
  },
  {
    title: 'Cloud & Developer Tooling',
    titleHi: 'क्लाउड और डेवलपर टूल्स',
    skills: ['Git & GitHub', 'Google Cloud Firestore', 'PostgreSQL', 'Docker', 'Vercel', 'Hugging Face'],
  },
]

const projects = [
  {
    number: '01',
    title: 'Reflect AI: Your AI Companion',
    category: 'Serverless AI & Emotional Wellness',
    categoryHi: 'सर्वरलेस एआई और मेंटल वेलनेस',
    description:
      'A serverless mindful journaling web application powered by the Gemini API and Cloud Firestore. Built to provide an empathetic conversational companion for emotional reflection, paired with creative poetry and thought synthesizer tools.',
    descriptionHi:
      'जेमिनी एपीआई और क्लाउड फायरस्टोर द्वारा संचालित एक सर्वरलेस जर्नलिंग वेब एप्लिकेशन। तनाव मुक्ति और भावनात्मक चिंतन के लिए एक संवेदनशील एआई साथी प्रदान करता है।',
    image: '/project-reflect-ai.png',
    link: 'https://deepesh-45.github.io/Reflect-AI/',
    tags: ['Gemini API', 'Cloud Firestore', 'Serverless AI', 'JavaScript'],
  },
  {
    number: '02',
    title: 'Laptop Recommender System',
    category: 'Machine Learning & Interactive App',
    categoryHi: 'मशीन लर्निंग और इंटरएक्टिव ऐप',
    description:
      'An end-to-end laptop recommendation system featuring a Python data processing pipeline and an intuitive Streamlit interface. Evaluates multiple hardware vectors and budget parameters to deliver ranked recommendations.',
    descriptionHi:
      'पाइथन और स्ट्रीमलिट द्वारा निर्मित एक लैपटॉप अनुशंसा एप्लिकेशन। उपयोगकर्ता की आवश्यकताओं और बजट के अनुसार शीर्ष लैपटॉप को रैंक करने के लिए एमएल एल्गोरिदम का उपयोग करता है।',
    image: '/project-laptop-recommender.png',
    link: 'https://deepesh-45-my-laptop.hf.space/',
    tags: ['Python', 'Streamlit', 'Scikit-Learn', 'Hugging Face'],
  },
  {
    number: '03',
    title: 'Books Recommender System',
    category: 'Content-Based Vector Recommendation',
    categoryHi: 'कंटेंट-बेस्ड वेक्टर अनुशंसा प्रणाली',
    description:
      'A recommendation pipeline leveraging Cosine Similarity and vector space modeling across extensive Kaggle datasets. Implements statistical data cleaning, tokenization, and multi-dimensional preference matching.',
    descriptionHi:
      'कागल डेटासेट पर कोसाइन सिमिलैरिटी और वेक्टर स्पेस मॉडलिंग का उपयोग करके बनाई गई पुस्तक अनुशंसा प्रणाली। डेटा की सफाई और वेक्टर मिलान द्वारा सटीक सुझाव प्रस्तुत करती है।',
    image: '/project-books-recommender.png',
    link: 'https://github.com/deepesh-45',
    tags: ['Python', 'Pandas', 'NumPy', 'Cosine Similarity'],
  },
  {
    number: '04',
    title: 'Sortify: Sorting Visualizer',
    category: 'Algorithmic Architecture & Audio-Visuals',
    categoryHi: 'एल्गोरिदम और इंटरएक्टिव विजुअलाइज़र',
    description:
      'An interactive educational visualizer that renders classic sorting algorithms (Merge, Quick, Bubble, Insertion) in real time with dynamic speed controls and customizable array distributions.',
    descriptionHi:
      'शास्त्रीय सॉर्टिंग एल्गोरिदम (मर्ज, क्विक, बबल, इंसर्शन) को रीयल-टाइम में समझाने वाला एक इंटरएक्टिव वेब विजुअलाइज़र। गति नियंत्रण और कस्टम डेटा आकारों के साथ समृद्ध।',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: 'https://sortify-silk.vercel.app/',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Algorithms'],
  },
]

const certifications = [
  {
    title: 'Python for Data Science',
    titleHi: 'पाइथन फॉर डेटा साइंस',
    issuer: 'NPTEL — IIT Madras',
    date: "April '26",
    link: 'https://drive.google.com/file/d/129esc7_P75SsjB8D_p7F77VLrfqwu9gl/view?usp=drivesdk',
    badge: 'Course Topper (Top 2%)',
    badgeHi: 'कोर्स टॉपर (टॉप 2%)',
    score: '83% Elite Score',
    description:
      'Mastered dataset wrangling with Pandas, multi-dimensional array operations with NumPy, statistical visualizations with Matplotlib & Seaborn, and foundational machine learning classifiers with Scikit-Learn.',
  },
  {
    title: 'Programming in Python',
    titleHi: 'प्रोग्रामिंग इन पाइथन',
    issuer: 'NPTEL',
    date: 'Certified',
    link: 'https://drive.google.com/file/d/1faWANaSfdHVw-NuoBNUGa8uKIgCTwtzb/view?usp=drivesdk',
    badge: 'Verified Credential',
    badgeHi: 'सत्यापित प्रमाणपत्र',
    score: 'Certified Proficiency',
    description:
      'Demonstrated rigorous computational problem solving, data structures, algorithm design, recursion, and object-oriented architecture in Python.',
  },
  {
    title: 'Artificial Intelligence Foundation',
    titleHi: 'आर्टिफिशियल इंटेलिजेंस फाउंडेशन',
    issuer: 'Certified Training Program',
    date: 'Certified',
    link: 'https://drive.google.com/file/d/1ZXgpFm-6zOqmFNNEhPzyS7yEOvrnaNBO/view?usp=drivesdk',
    badge: 'Core AI Distinction',
    badgeHi: 'कोर एआई डिस्टिंक्शन',
    score: 'Advanced Grade',
    description:
      'In-depth training on neural network foundations, heuristic search algorithms, intelligent agent architectures, and machine learning methodologies.',
  },
]

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('editorial-theme') as 'light' | 'dark' | null
      if (savedTheme) return savedTheme
    }
    return 'light'
  })
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('editorial-lang') as 'en' | 'hi' | null
      if (savedLang) return savedLang
    }
    return 'en'
  })
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('editorial-theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('editorial-lang', lang)
    document.title =
      lang === 'hi'
        ? 'दीपेश पटेल — एआई & मशीन लर्निंग इंजीनियर'
        : 'Deepesh Patel — AI & Machine Learning Engineer'
  }, [lang])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleLang = () => setLang(lang === 'en' ? 'hi' : 'en')

  const currentTheme = themes[theme]

  return (
    <div
      style={{
        backgroundColor: currentTheme.bgCanvas,
        color: currentTheme.textColor,
        minHeight: '100vh',
        width: '100%',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* =========================================================================
          EDITORIAL HEADER & NAVIGATION
          ========================================================================= */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: `${currentTheme.bgCanvas}E6`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${currentTheme.hairlineBorder}`,
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 4rem)',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Brand Monogram & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="#home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                color: currentTheme.primary,
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.primary,
                  color: currentTheme.bgCanvas,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: `0 0 12px ${currentTheme.goldAccent}40`,
                }}
              >
                DP
              </div>
              <span
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: '1.28rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                Deepesh Patel
              </span>
            </a>

            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: currentTheme.surfaceVariant,
                color: currentTheme.secondary,
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
              className="md:flex"
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.goldAccent,
                }}
                className="animate-ping-subtle"
              />
              <span>{lang === 'hi' ? 'बी.टेक एआई & एमएल · एकोपोलिस' : 'B.Tech AI & ML · Acropolis'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="lg:flex"
          >
            {[
              { id: 'featured-works', labelEn: 'Selected Works', labelHi: 'परियोजनाएं' },
              { id: 'metrics', labelEn: 'Practicum & Metrics', labelHi: 'मेट्रिक्स' },
              { id: 'competencies', labelEn: 'Competencies', labelHi: 'कौशल' },
              { id: 'certifications', labelEn: 'Certifications', labelHi: 'प्रमाणपत्र' },
              { id: 'about', labelEn: 'About', labelHi: 'परिचय' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: currentTheme.secondary,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = currentTheme.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = currentTheme.secondary)}
              >
                {lang === 'hi' ? item.labelHi : item.labelEn}
              </a>
            ))}
          </nav>

          {/* Controls: Language, Theme & Let's Connect */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              aria-label="Toggle Language"
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: currentTheme.surface,
                border: `1px solid ${currentTheme.hairlineBorder}`,
                color: currentTheme.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Globe size={13} />
              <span>{lang === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: currentTheme.surface,
                border: `1px solid ${currentTheme.hairlineBorder}`,
                color: currentTheme.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Let's Connect CTA */}
            <a
              href="mailto:pateldeepesh1408@gmail.com"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '9px 18px',
                borderRadius: '8px',
                backgroundColor: currentTheme.primary,
                color: currentTheme.bgCanvas,
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
              }}
              className="sm:inline-flex"
            >
              {lang === 'hi' ? 'संपर्क करें' : "Let's Connect"}
            </a>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main style={{ paddingTop: '80px', width: '100%' }}>
        {/* =========================================================================
            SECTION 1: HERO & 3D INTERACTIVE CENTERPIECE
            ========================================================================= */}
        <section
          id="home"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 4rem) clamp(3rem, 6vw, 5rem)',
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(780px, 90vw)',
              height: '480px',
              backgroundColor: currentTheme.glowColor,
              borderRadius: '50%',
              filter: 'blur(120px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: currentTheme.surfaceHigh,
                color: currentTheme.subTextColor,
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                border: `1px solid ${currentTheme.hairlineBorder}`,
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.goldAccent,
                }}
                className="animate-ping-subtle"
              />
              <span>
                {lang === 'hi'
                  ? '✦ पोर्टफोलियो 2026 · एआई & मशीन लर्निंग इंजीनियर'
                  : '✦ PORTFOLIO 2026 · AI & MACHINE LEARNING ENGINEER'}
              </span>
            </div>

            {/* Monumental Typography */}
            <h1
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: 'clamp(3.5rem, 8vw, 6.2rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                textTransform: 'none',
                color: currentTheme.primary,
                margin: '0 0 1rem 0',
              }}
            >
              {lang === 'hi' ? 'नमस्कारम।' : 'Namaskaram.'}
            </h1>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                lineHeight: 1.5,
                color: currentTheme.subTextColor,
                maxWidth: '720px',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                margin: '0 0 2.5rem 0',
              }}
            >
              {lang === 'hi'
                ? 'इंटेलिजेंट एल्गोरिदम, मशीन लर्निंग आर्किटेक्चर और स्केलेबल प्रेडिक्टिव सिस्टम्स का निर्माण।'
                : 'Engineering intelligent algorithms, machine learning architectures, and scalable interactive systems.'}
            </p>

            {/* 3D INTERACTIVE SPATIAL CENTERPIECE */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1060px',
                borderRadius: '32px',
                backgroundColor: currentTheme.surface,
                padding: 'clamp(8px, 1.5vw, 14px)',
                boxShadow: '0 20px 45px -15px rgba(36, 33, 32, 0.12)',
                border: `1px solid ${currentTheme.hairlineBorder}`,
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(440px, 55vw, 600px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  backgroundColor: currentTheme.surfaceLow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Three.js 3D Namaskaram Avatar Canvas */}
                <NamaskaramAvatar theme={theme} />

                {/* Top Right Interaction Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: `${currentTheme.bgCanvas}E6`,
                    backdropFilter: 'blur(12px)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    border: `1px solid ${currentTheme.hairlineBorder}`,
                    color: currentTheme.primary,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <Sparkles size={14} style={{ color: currentTheme.goldAccent }} />
                  <span>{lang === 'hi' ? 'इंटरएक्टिव 3D · पॉइंटर-रिस्पॉन्सिव अवतार' : 'Interactive 3D · Drag to Orbit Posture'}</span>
                </div>

                {/* Bottom Left Spatial Coordinates Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    zIndex: 20,
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2px',
                    backgroundColor: `${currentTheme.bgCanvas}E6`,
                    backdropFilter: 'blur(12px)',
                    padding: '10px 18px',
                    borderRadius: '16px',
                    border: `1px solid ${currentTheme.hairlineBorder}`,
                    color: currentTheme.subTextColor,
                    textAlign: 'left',
                  }}
                  className="sm:flex"
                >
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: currentTheme.secondary,
                      fontWeight: 600,
                    }}
                  >
                    Spatial Coordinate Frame
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: currentTheme.primary,
                    }}
                  >
                    Acropolis Institute · Indore, India · 22.7196° N, 75.8577° E
                  </span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div
              style={{
                width: '100%',
                maxWidth: '960px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <a
                  href="#featured-works"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.bgCanvas,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{lang === 'hi' ? 'परियोजनाएं देखें' : 'Explore Selected Works'}</span>
                  <ArrowDown size={16} />
                </a>

                <a
                  href="/deepesh-patel-resume.pdf"
                  download="deepesh-patel-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    backgroundColor: currentTheme.surfaceHigh,
                    color: currentTheme.primary,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    border: `1px solid ${currentTheme.hairlineBorder}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{lang === 'hi' ? 'रेज़्यूमे / सीवी डाउनलोड करें' : 'Download Monograph / CV'}</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Status Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  backgroundColor: currentTheme.surfaceLow,
                  border: `1px solid ${currentTheme.hairlineBorder}`,
                  fontSize: '0.75rem',
                  color: currentTheme.subTextColor,
                  fontWeight: 500,
                }}
              >
                <MapPin size={14} style={{ color: currentTheme.goldAccent }} />
                <span>
                  {lang === 'hi'
                    ? 'इंदौर, भारत · ओपन फॉर सॉफ्टवेयर & एआई रोल्स'
                    : 'Indore, India · Available for Select Commissions & Roles'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CURATED METRICS & ARCHITECTURAL PRACTICUM
            ========================================================================= */}
        <section
          id="metrics"
          style={{
            width: '100%',
            backgroundColor: currentTheme.surfaceLow,
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
            borderTop: `1px solid ${currentTheme.hairlineBorder}`,
            borderBottom: `1px solid ${currentTheme.hairlineBorder}`,
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: currentTheme.secondary,
                }}
              >
                {lang === 'hi' ? 'अनुशासन और प्रदर्शन' : 'Disciplinary Footprint'}
              </span>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: currentTheme.primary,
                    margin: 0,
                  }}
                >
                  {lang === 'hi' ? 'क्यूरेटेड मेट्रिक्स & उपलब्धियां' : 'Curated Metric & Practicum'}
                </h2>
                <p
                  style={{
                    maxWidth: '460px',
                    margin: 0,
                    fontSize: '0.95rem',
                    color: currentTheme.subTextColor,
                    lineHeight: 1.6,
                  }}
                >
                  {lang === 'hi'
                    ? 'सैद्धांतिक गणितीय सटीकता और व्यवहार्य एआई सिस्टम्स का सामंजस्य।'
                    : 'A focused practice uniting algorithmic rigorousness with human-centered machine learning systems.'}
                </p>
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {/* Metric 1 */}
              <div
                style={{
                  backgroundColor: currentTheme.surface,
                  borderRadius: '24px',
                  padding: '2rem',
                  border: `1px solid ${currentTheme.hairlineBorder}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: currentTheme.secondary,
                  }}
                >
                  {lang === 'hi' ? 'आईआईटी मद्रास डिस्टिंक्शन' : 'Academic Distinction'}
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <span
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: 'clamp(3rem, 5vw, 4.2rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.03em',
                      color: currentTheme.primary,
                    }}
                  >
                    Top 2%
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: currentTheme.subTextColor, lineHeight: 1.55 }}>
                  {lang === 'hi'
                    ? "NPTEL IIT मद्रास 'Python for Data Science' कोर्स टॉपर 83% एलिट स्कोर के साथ।"
                    : 'NPTEL IIT Madras Course Topper in Python for Data Science with an 83% certified score.'}
                </p>
              </div>

              {/* Metric 2 */}
              <div
                style={{
                  backgroundColor: currentTheme.surface,
                  borderRadius: '24px',
                  padding: '2rem',
                  border: `1px solid ${currentTheme.hairlineBorder}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: currentTheme.secondary,
                  }}
                >
                  {lang === 'hi' ? 'परिनियोजित सिस्टम्स' : 'Intelligent Deployments'}
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <span
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: 'clamp(3rem, 5vw, 4.2rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.03em',
                      color: currentTheme.primary,
                    }}
                  >
                    4+
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: currentTheme.subTextColor, lineHeight: 1.55 }}>
                  {lang === 'hi'
                    ? 'हगिंग फेस, वेरसेल और गिटहब पर लाइव परिनियोजित अनुशंसा इंजन व जेनरेटिव एआई ऐप्स।'
                    : 'Deployed machine learning systems, recommender engines, and real-time interactive visualizers.'}
                </p>
              </div>

              {/* Metric 3 */}
              <div
                style={{
                  backgroundColor: currentTheme.surface,
                  borderRadius: '24px',
                  padding: '2rem',
                  border: `1px solid ${currentTheme.hairlineBorder}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: currentTheme.secondary,
                  }}
                >
                  {lang === 'hi' ? 'अकादमिक निरंतरता' : 'Academic Standing'}
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <span
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: 'clamp(3rem, 5vw, 4.2rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.03em',
                      color: currentTheme.primary,
                    }}
                  >
                    7.96
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: currentTheme.subTextColor, lineHeight: 1.55 }}>
                  {lang === 'hi'
                    ? 'एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में बी.टेक एआई & एमएल में स्थिर सीजीपीए।'
                    : 'Consistent CGPA in B.Tech Computer Science & AI/ML at Acropolis Institute of Technology & Research.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FEATURED WORKS / SELECTED SPATIAL & AI CANVASES
            ========================================================================= */}
        <section
          id="featured-works"
          style={{
            width: '100%',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: currentTheme.secondary,
                  }}
                >
                  Archive 2026
                </span>
                <h2
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: currentTheme.primary,
                    margin: '0.25rem 0 0 0',
                  }}
                >
                  {lang === 'hi' ? 'विशेष परियोजनाएं और सिस्टम' : 'Selected Spatial & AI Canvases'}
                </h2>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: currentTheme.secondary,
                }}
              >
                {lang === 'hi' ? '04 प्रमुख निर्माण' : '04 Works in Spotlight'}
              </span>
            </div>

            {/* Asymmetrical Editorial Project Showcase */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {projects.map((proj, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={proj.title}
                    style={{
                      borderRadius: '32px',
                      backgroundColor: currentTheme.surface,
                      border: `1px solid ${currentTheme.hairlineBorder}`,
                      padding: 'clamp(1rem, 2.5vw, 2rem)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                      alignItems: 'center',
                      boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {/* Media Frame */}
                    <div
                      style={{
                        gridColumn: isEven ? 'span 7' : 'span 7',
                        order: isEven ? 1 : 2,
                        borderRadius: '20px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: currentTheme.surfaceLow,
                        border: `1px solid ${currentTheme.hairlineBorder}`,
                      }}
                      className="col-span-12 lg:col-span-7"
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{
                          width: '100%',
                          height: 'clamp(280px, 32vw, 420px)',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '16px',
                          left: '16px',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          backgroundColor: `${currentTheme.bgCanvas}E6`,
                          backdropFilter: 'blur(10px)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: currentTheme.primary,
                        }}
                      >
                        {proj.tags[0]}
                      </div>
                    </div>

                    {/* Content Block */}
                    <div
                      style={{
                        gridColumn: isEven ? 'span 5' : 'span 5',
                        order: isEven ? 2 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                      }}
                      className="col-span-12 lg:col-span-5"
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: currentTheme.secondary,
                          }}
                        >
                          Project {proj.number} · {lang === 'hi' ? proj.categoryHi : proj.category}
                        </span>
                        <h3
                          style={{
                            fontFamily: "'Bodoni Moda', serif",
                            fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                            fontWeight: 500,
                            letterSpacing: '-0.02em',
                            color: currentTheme.primary,
                            margin: '0.35rem 0 0 0',
                          }}
                        >
                          {proj.title}
                        </h3>
                      </div>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.95rem',
                          color: currentTheme.subTextColor,
                          lineHeight: 1.65,
                        }}
                      >
                        {lang === 'hi' ? proj.descriptionHi : proj.description}
                      </p>

                      {/* Pill Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '9999px',
                              backgroundColor: currentTheme.surfaceHigh,
                              border: `1px solid ${currentTheme.hairlineBorder}`,
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              color: currentTheme.subTextColor,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Link */}
                      <div style={{ paddingTop: '0.25rem' }}>
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: currentTheme.primary,
                            borderBottom: `1px solid ${currentTheme.primary}`,
                            paddingBottom: '3px',
                            transition: 'opacity 0.2s ease',
                          }}
                        >
                          <span>{lang === 'hi' ? 'लाइव डेमो / कोड देखें' : 'View Comprehensive Case Study'}</span>
                          <ArrowUpRight size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TECHNICAL COMPETENCIES (EDITORIAL TAXONOMY)
            ========================================================================= */}
        <section
          id="competencies"
          style={{
            width: '100%',
            backgroundColor: currentTheme.surfaceLow,
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
            borderTop: `1px solid ${currentTheme.hairlineBorder}`,
            borderBottom: `1px solid ${currentTheme.hairlineBorder}`,
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: currentTheme.secondary,
                }}
              >
                Curated Skill Matrix
              </span>
              <h2
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: currentTheme.primary,
                  margin: '0.25rem 0 0 0',
                }}
              >
                {lang === 'hi' ? 'तकनीकी दक्षता और कौशल' : 'Technical Competencies'}
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {skillCategories.map((cat) => (
                <div
                  key={cat.title}
                  style={{
                    backgroundColor: currentTheme.surface,
                    borderRadius: '24px',
                    padding: '2rem',
                    border: `1px solid ${currentTheme.hairlineBorder}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: currentTheme.primary,
                      margin: 0,
                    }}
                  >
                    {lang === 'hi' ? cat.titleHi : cat.title}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          backgroundColor: currentTheme.surfaceHigh,
                          border: `1px solid ${currentTheme.hairlineBorder}`,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: currentTheme.textColor,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: CERTIFICATIONS & VERIFICATION
            ========================================================================= */}
        <section
          id="certifications"
          style={{
            width: '100%',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: currentTheme.secondary,
                  }}
                >
                  Verified Credentials
                </span>
                <h2
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: currentTheme.primary,
                    margin: '0.25rem 0 0 0',
                  }}
                >
                  {lang === 'hi' ? 'प्रमाणपत्र और विशिष्टताएं' : 'Certifications & Honors'}
                </h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {certifications.map((c) => (
                <div
                  key={c.title}
                  style={{
                    backgroundColor: currentTheme.surface,
                    borderRadius: '24px',
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    border: `1px solid ${currentTheme.hairlineBorder}`,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                  }}
                >
                  <div style={{ flex: '1 1 340px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: currentTheme.surfaceHigh,
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: currentTheme.goldAccent,
                        }}
                      >
                        {lang === 'hi' ? c.badgeHi : c.badge}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: currentTheme.secondary }}>{c.issuer}</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        color: currentTheme.primary,
                        margin: '0 0 8px 0',
                      }}
                    >
                      {lang === 'hi' ? c.titleHi : c.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: currentTheme.subTextColor, lineHeight: 1.55 }}>
                      {c.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontSize: '1.2rem',
                        color: currentTheme.primary,
                        fontWeight: 500,
                      }}
                    >
                      {c.score}
                    </span>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        backgroundColor: currentTheme.surfaceHigh,
                        color: currentTheme.primary,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        border: `1px solid ${currentTheme.hairlineBorder}`,
                      }}
                    >
                      <span>{lang === 'hi' ? 'सत्यापित करें' : 'Verify Certificate'}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: EDITORIAL MANIFESTO CALLOUT & ABOUT ME
            ========================================================================= */}
        <section
          id="about"
          style={{
            width: '100%',
            backgroundColor: currentTheme.surfaceHigh,
            padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1.25rem, 4vw, 4rem)',
            borderRadius: '36px',
            maxWidth: '1440px',
            margin: '0 auto clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '2rem',
            }}
          >
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: currentTheme.secondary,
              }}
            >
              {lang === 'hi' ? 'दर्शन और दृष्टिकोण' : 'Engineering Philosophy & Stance'}
            </span>

            <blockquote
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                lineHeight: 1.35,
                fontWeight: 400,
                fontStyle: 'italic',
                color: currentTheme.primary,
                margin: 0,
              }}
            >
              {lang === 'hi'
                ? '“इंजीनियरिंग में सच्ची बुद्धिमत्ता जटिलता में नहीं, बल्कि ऐसे एल्गोरिदम बनाने में है जो सहज, मानवीय और उपयोगी महसूस हों।”'
                : '“True intelligence in engineering is not complexity for its own sake, but crafting algorithms and systems that feel effortless, intuitive, and profoundly human.”'}
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.primary,
                  color: currentTheme.bgCanvas,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                DP
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: currentTheme.primary }}>
                  Deepesh Patel
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: currentTheme.secondary,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Acropolis Institute · AI & Machine Learning
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '1rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${currentTheme.hairlineBorder}`,
                fontSize: '1rem',
                color: currentTheme.subTextColor,
                lineHeight: 1.7,
                textAlign: 'center',
                maxWidth: '780px',
              }}
            >
              <p style={{ margin: '0 0 1rem 0' }}>
                {lang === 'hi'
                  ? 'मैं एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग का छात्र हूँ। कोडिंग और मॉडल आर्किटेक्चर के अलावा, मैं मानसिक दृढ़ता और अनुशासन विकसित करने के लिए लंबी दूरी की दौड़ का अभ्यास करता हूँ।'
                  : 'I am an AI & Machine Learning undergraduate at Acropolis Institute of Technology and Research. Beyond code, I practice regular long-distance running to build discipline, mental resilience, and steady focus.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: PRANA AI COPILOT WORKSPACE CONSOLE
            ========================================================================= */}
        <section
          id="ai-copilot"
          style={{
            width: '100%',
            backgroundColor: currentTheme.surfaceLow,
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
            borderTop: `1px solid ${currentTheme.hairlineBorder}`,
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Telemetry Bar */}
            <div
              style={{
                width: '100%',
                backgroundColor: currentTheme.surface,
                borderRadius: '20px',
                padding: '1.25rem 2rem',
                border: `1px solid ${currentTheme.hairlineBorder}`,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: currentTheme.surfaceHigh,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: currentTheme.primary,
                    position: 'relative',
                  }}
                >
                  <Bot size={22} />
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentTheme.goldAccent,
                    }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: currentTheme.primary,
                      }}
                    >
                      PRANA AI
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: currentTheme.surfaceVariant,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: currentTheme.secondary,
                      }}
                    >
                      v2.4 Core
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: currentTheme.secondary }}>
                    {lang === 'hi' ? 'दीपेश पटेल का डिजिटल कोपायलट' : 'Deepesh Patel’s Spatial Copilot & Computational Twin'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  fontSize: '0.75rem',
                  color: currentTheme.secondary,
                  alignItems: 'center',
                }}
              >
                <div>
                  Model: <strong style={{ color: currentTheme.primary }}>Gemini API Dual-Engine</strong>
                </div>
                <div>
                  Resonance: <strong style={{ color: currentTheme.primary }}>99.4% Synchronized</strong>
                </div>
                <button
                  onClick={() => setIsChatOpen(true)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.bgCanvas,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {lang === 'hi' ? 'कोपायलट खोलें' : 'Launch Copilot'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          EDITORIAL FOOTER
          ========================================================================= */}
      <footer
        style={{
          width: '100%',
          backgroundColor: currentTheme.surface,
          borderTop: `1px solid ${currentTheme.hairlineBorder}`,
          padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 4rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Column 1: Monogram & Bio */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.bgCanvas,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Bodoni Moda', serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  DP
                </div>
                <span
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: currentTheme.primary,
                  }}
                >
                  Deepesh Patel
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  color: currentTheme.subTextColor,
                  lineHeight: 1.6,
                  maxWidth: '340px',
                }}
              >
                {lang === 'hi'
                  ? 'एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में एआई & एमएल इंजीनियर छात्र। मशीन लर्निंग, प्रिडिक्टिव मॉडलिंग और इंटरएक्टिव सिस्टम्स में समर्पित।'
                  : 'AI & Machine Learning Engineering student at Acropolis Institute of Technology and Research. Dedicated to machine learning architectures, predictive pipelines, and human-centered design.'}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: currentTheme.secondary,
                  marginBottom: '14px',
                }}
              >
                Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="#home"
                  style={{ textDecoration: 'none', color: currentTheme.textColor, fontSize: '0.88rem' }}
                >
                  Home / Namaskaram
                </a>
                <a
                  href="#featured-works"
                  style={{ textDecoration: 'none', color: currentTheme.textColor, fontSize: '0.88rem' }}
                >
                  Selected Works
                </a>
                <a
                  href="#metrics"
                  style={{ textDecoration: 'none', color: currentTheme.textColor, fontSize: '0.88rem' }}
                >
                  Practicum & Metrics
                </a>
                <a
                  href="#competencies"
                  style={{ textDecoration: 'none', color: currentTheme.textColor, fontSize: '0.88rem' }}
                >
                  Competencies
                </a>
                <a
                  href="#certifications"
                  style={{ textDecoration: 'none', color: currentTheme.textColor, fontSize: '0.88rem' }}
                >
                  Certifications
                </a>
              </div>
            </div>

            {/* Column 3: Contact & Profiles */}
            <div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: currentTheme.secondary,
                  marginBottom: '14px',
                }}
              >
                Connect & Inquire
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="mailto:pateldeepesh1408@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    color: currentTheme.textColor,
                    fontSize: '0.88rem',
                  }}
                >
                  <Mail size={16} />
                  <span>pateldeepesh1408@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/deepesh-patel-564b35398"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    color: currentTheme.textColor,
                    fontSize: '0.88rem',
                  }}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/deepesh-45"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    color: currentTheme.textColor,
                    fontSize: '0.88rem',
                  }}
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingTop: '2rem',
              borderTop: `1px solid ${currentTheme.hairlineBorder}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.75rem',
              color: currentTheme.secondary,
            }}
          >
            <div>© 2026 Deepesh Patel. All rights reserved. Crafted with Warm Editorial Studio.</div>
            <div>B.Tech AI & Machine Learning · Acropolis Institute of Technology & Research</div>
          </div>
        </div>
      </footer>

      {/* PRANA AI Floating Chatbox Component */}
      <Chatbox
        currentTheme={currentTheme}
        lang={lang}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  )
}

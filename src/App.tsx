import { useState, useEffect } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
} from 'lucide-react'
import HeroBackgroundVideo from './components/HeroBackgroundVideo'
import MandalaWatermark from './components/MandalaWatermark'
import Chatbox from './components/Chatbox'

// Deep Oxblood Red & Dusky Rose Luxury Editorial Palette
const theme = {
  bgCanvas: '#260B0F',
  bgGradient: 'radial-gradient(ellipse at 75% 20%, #44171F 0%, #290C11 50%, #1A0609 100%)',
  surfaceLow: '#2F0E14',
  surface: '#39131B',
  surfaceHigh: '#481923',
  surfaceVariant: '#541F2B',
  primary: '#D49B9E', // Signature Dusky Rose for monumental headlines & badges
  primaryHover: '#E5ADB0',
  secondary: '#F5DBD5', // Warm champagne ivory for bold subtitles
  subTextColor: '#D1B5B8', // Soft dusty mauve for body paragraphs
  textColor: '#F5DBD5',
  hairlineBorder: 'rgba(212, 155, 158, 0.22)',
  cardBg: 'rgba(57, 19, 27, 0.65)',
  goldAccent: '#DFB088',
  ctaRose: '#B87277',
  ctaRoseHover: '#C88085',
  glowRose: 'rgba(212, 155, 158, 0.25)',
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
    title: 'Reflect AI — Mental Wellness Journal',
    category: 'AI Web Application',
    categoryHi: 'एआई वेब एप्लिकेशन',
    description:
      'An AI-powered mindful journaling application that provides empathetic conversational support and guided reflection. Built with the Gemini API and Google Cloud Firestore.',
    descriptionHi:
      'जेमिनी एपीआई और गूगल फायरस्टोर पर आधारित एक जर्नलिंग ऐप। आत्म-चिंतन और मानसिक स्वास्थ्य के लिए संवेदनशील एआई सहायता प्रदान करता है।',
    image: '/project-reflect-ai.jpg',
    link: 'https://deepesh-45.github.io/Reflect-AI/',
    tags: ['Gemini API', 'Cloud Firestore', 'JavaScript', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Laptop Recommender System',
    category: 'Machine Learning Web App',
    categoryHi: 'मशीन लर्निंग वेब ऐप',
    description:
      'A data-driven recommendation engine that suggests suitable laptops based on user specifications, budget, and performance needs. Deployed live on Hugging Face Spaces with Streamlit.',
    descriptionHi:
      'पाइथन और स्ट्रीमलिट से बना एक एमएल ऐप, जो उपयोगकर्ता के बजट और तकनीकी आवश्यकताओं के अनुसार सबसे अच्छे लैपटॉप की सिफारिश करता है।',
    image: '/project-laptop-recommender.jpg',
    link: 'https://deepesh-45-my-laptop.hf.space/',
    tags: ['Python', 'Streamlit', 'Scikit-Learn', 'Hugging Face'],
  },
  {
    number: '03',
    title: 'Book Recommendation Engine',
    category: 'Natural Language Processing',
    categoryHi: 'नेचुरल लैंग्वेज प्रोसेसिंग',
    description:
      'A content-based recommendation system that suggests books using cosine similarity and TF-IDF vectorization across a dataset of over 2,000 titles.',
    descriptionHi:
      'कोसाइन सिमिलैरिटी और टीएफ-आईडीएफ पर आधारित पुस्तक अनुशंसा प्रणाली, जो पाठकों की रुचि के अनुसार संबंधित पुस्तकों का सटीक सुझाव देती है।',
    image: '/project-books-recommender.jpg',
    link: 'https://github.com/deepesh-45',
    tags: ['Python', 'Pandas', 'NumPy', 'Cosine Similarity'],
  },
  {
    number: '04',
    title: 'Sortify — Algorithm Visualizer',
    category: 'Interactive Data Structures & Algorithms',
    categoryHi: 'इंटरएक्टिव डेटा स्ट्रक्चर्स & एल्गोरिदम',
    description:
      'An interactive tool that animates sorting algorithms (Bubble Sort, Merge Sort, Quick Sort) step by step with real-time speed adjustments.',
    descriptionHi:
      'बबल सॉर्ट, मर्ज सॉर्ट और क्विक सॉर्ट जैसे एल्गोरिदम को चरण-दर-चरण समझने के लिए एक इंटरएक्टिव विजुअलाइज़र वेब टूल।',
    image: '/project-sortify-visualizer.jpg',
    link: 'https://sortify-silk.vercel.app/',
    tags: ['JavaScript', 'Algorithms', 'CSS3', 'Data Structures'],
  },
]

const certifications = [
  {
    title: 'Python for Data Science',
    titleHi: 'पाइथन फॉर डेटा साइंस',
    issuer: 'NPTEL — IIT Madras',
    date: 'April 2024',
    link: 'https://drive.google.com/file/d/129esc7_P75SsjB8D_p7F77VLrfqwu9gl/view?usp=drivesdk',
    score: '83% (Elite Gold · Top 1%)',
    description:
      'Comprehensive data science coursework covering data manipulation with Pandas and NumPy, data visualization, and applied machine learning models.',
  },
  {
    title: 'Programming in Python',
    titleHi: 'प्रोग्रामिंग इन पाइथन',
    issuer: 'NPTEL',
    date: 'Certified',
    link: 'https://drive.google.com/file/d/1faWANaSfdHVw-NuoBNUGa8uKIgCTwtzb/view?usp=drivesdk',
    score: 'Certified Grade',
    description:
      'In-depth training in Python programming, fundamental data structures, algorithm design, and computational problem solving.',
  },
  {
    title: 'Artificial Intelligence Foundation',
    titleHi: 'आर्टिफिशियल इंटेलिजेंस फाउंडेशन',
    issuer: 'Certified Training Program',
    date: 'Certified',
    link: 'https://drive.google.com/file/d/1ZXgpFm-6zOqmFNNEhPzyS7yEOvrnaNBO/view?usp=drivesdk',
    score: 'Advanced Grade',
    description:
      'Foundational concepts of artificial intelligence, search algorithms, knowledge representation, and machine learning paradigms.',
  },
]

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('editorial-lang') as 'en' | 'hi' | null
      if (savedLang) return savedLang
    }
    return 'en'
  })
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('editorial-lang', lang)
    document.title =
      lang === 'hi'
        ? 'दीपेश पटेल — एआई & मशीन लर्निंग इंजीनियर'
        : 'Deepesh Patel — AI & Machine Learning Engineer'
  }, [lang])

  const toggleLang = () => setLang(lang === 'en' ? 'hi' : 'en')

  return (
    <div
      style={{
        backgroundColor: theme.bgCanvas,
        backgroundImage: theme.bgGradient,
        color: theme.textColor,
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Corner Traditional Mandala Watermarks */}
      <MandalaWatermark />

      {/* =========================================================================
          TOP NAVIGATION BAR (Matching Reference Image Header)
          ========================================================================= */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(38, 11, 15, 0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${theme.hairlineBorder}`,
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
            gap: '1.5rem',
          }}
        >
          {/* Logo & Brand matching Reference: [Icon] Portfolio | ... */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="#home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: theme.secondary,
              }}
            >
              {/* Monogram logo symbol */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: theme.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 12px ${theme.glowRose}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#260B0F',
                  }}
                >
                  DP
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: theme.secondary,
                }}
              >
                Portfolio
              </span>
            </a>

            {/* Vertical Divider Line */}
            <span
              style={{
                display: 'inline-block',
                width: '1px',
                height: '18px',
                backgroundColor: 'rgba(212, 155, 158, 0.35)',
              }}
              className="hidden sm:inline-block"
            />

            {/* Sub-Brand Name */}
            <span
              style={{
                fontSize: '0.85rem',
                color: theme.subTextColor,
                fontWeight: 500,
              }}
              className="hidden md:inline-block"
            >
              Deepesh Patel
            </span>
          </div>

          {/* Navigation Links: About · Projects · Contact */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="md:flex"
          >
            {[
              { id: 'about', labelEn: 'About', labelHi: 'परिचय' },
              { id: 'projects', labelEn: 'Projects', labelHi: 'परियोजनाएं' },
              { id: 'metrics', labelEn: 'Metrics', labelHi: 'मेट्रिक्स' },
              { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: theme.secondary,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.secondary)}
              >
                {lang === 'hi' ? item.labelHi : item.labelEn}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle Language"
              style={{
                padding: '7px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(57, 19, 27, 0.75)',
                border: `1px solid ${theme.hairlineBorder}`,
                color: theme.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Globe size={13} />
              <span>{lang === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            {/* Let's Connect CTA in header */}
            <a
              href="mailto:pateldeepesh1408@gmail.com"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '9px 20px',
                borderRadius: '9999px',
                backgroundColor: 'transparent',
                border: `1px solid ${theme.hairlineBorder}`,
                color: theme.secondary,
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="sm:inline-flex"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.ctaRose
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = theme.secondary
              }}
            >
              {lang === 'hi' ? 'संपर्क करें' : "Let's Connect"}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ width: '100%' }}>
        {/* =========================================================================
            SECTION 1: CINEMATIC BACKGROUND VIDEO HERO (3D AVATAR ON RIGHT, CRISP TEXT ON LEFT)
            ========================================================================= */
        <section
          id="home"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: '#260B0F',
            zIndex: 10,
          }}
        >
          {/* Glitch-Free Native Background Video with Directional Scrims */}
          <HeroBackgroundVideo videoSrc="/hero-avatar-namaskaram.mp4" lang={lang} />

          {/* Foreground Hero Content: Fixed on the Left */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              padding: 'clamp(5.5rem, 8vw, 6.5rem) clamp(1.25rem, 4vw, 4rem) 2rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Left Content Column (Clean, simple, no decorative legends) */}
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            >
              {/* Monumental Greeting */}
              <h1
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', 'Syne', serif",
                  fontSize: 'clamp(3.8rem, 8.5vw, 6.8rem)',
                  lineHeight: 1.0,
                  fontWeight: 800,
                  letterSpacing: lang === 'hi' ? '0.01em' : '-0.025em',
                  color: theme.primary,
                  margin: '0 0 0.85rem 0',
                  textShadow: '0 12px 42px rgba(212, 155, 158, 0.28)',
                  userSelect: 'none',
                }}
              >
                {lang === 'hi' ? 'नमस्कार.' : 'Namaskaram.'}
              </h1>

              {/* Role & Name (Clear & Concrete) */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.3rem)',
                  lineHeight: 1.25,
                  fontWeight: 800,
                  letterSpacing: '-0.015em',
                  color: theme.secondary,
                  margin: '0 0 1.25rem 0',
                }}
              >
                {lang === 'hi'
                  ? 'मैं दीपेश पटेल हूँ — एआई & मशीन लर्निंग इंजीनियर'
                  : "I'm Deepesh Patel — AI & Machine Learning Engineer"}
              </h2>

              {/* Clear, Concise, Courteous Intro (7 C's) */}
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                  lineHeight: 1.65,
                  color: theme.subTextColor,
                  maxWidth: '560px',
                  fontWeight: 400,
                  margin: '0 0 2.25rem 0',
                }}
              >
                {lang === 'hi'
                  ? 'मेरे पोर्टफोलियो में आपका स्वागत है। मैं व्यावहारिक मशीन लर्निंग मॉडल, आधुनिक वेब एप्लिकेशन्स और डेटा-संचालित समाधान विकसित करता हूँ।'
                  : 'Welcome to my portfolio! I build practical machine learning systems, smart web applications, and data-driven solutions.'}
              </p>

              {/* Clean Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '2rem',
                }}
              >
                <a
                  href="#projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    backgroundColor: theme.ctaRose,
                    color: '#FFFFFF',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 10px 28px rgba(184, 114, 119, 0.45)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.ctaRoseHover
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.ctaRose
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span>{lang === 'hi' ? 'प्रोजेक्ट्स देखें' : 'View Projects'}</span>
                  <ArrowDown size={17} />
                </a>

                <a
                  href="/deepesh-patel-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(57, 19, 27, 0.75)',
                    border: `1.5px solid ${theme.hairlineBorder}`,
                    color: theme.secondary,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.primary
                    e.currentTarget.style.backgroundColor = 'rgba(212, 155, 158, 0.18)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.hairlineBorder
                    e.currentTarget.style.backgroundColor = 'rgba(57, 19, 27, 0.75)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <FileText size={17} />
                  <span>{lang === 'hi' ? 'रिज्यूम डाउनलोड करें' : 'Download Resume'}</span>
                </a>
              </div>

              {/* Simple Location Note (Clear & Courteous) */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: theme.subTextColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                }}
              >
                <span style={{ color: theme.primary }}>📍</span>
                <span>
                  {lang === 'hi'
                    ? 'इंदौर, भारत · नए अवसरों और सहयोग के लिए उपलब्ध'
                    : 'Indore, India · Open to new roles and collaborations'}
                </span>
              </div>
            </div>
          </div>
        </section>

        /* =========================================================================
            SECTION 2: CURATED METRICS & PRACTICUM
            ========================================================================= */}
        <section
          id="metrics"
          style={{
            width: '100%',
            backgroundColor: theme.surfaceLow,
            padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1.25rem, 4vw, 4rem)',
            borderTop: `1px solid ${theme.hairlineBorder}`,
            borderBottom: `1px solid ${theme.hairlineBorder}`,
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
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <h2
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: theme.secondary,
                  margin: 0,
                }}
              >
                {lang === 'hi' ? 'प्रमुख उपलब्धियां' : 'Key Highlights'}
              </h2>
              <p
                style={{
                  maxWidth: '460px',
                  margin: 0,
                  fontSize: '1rem',
                  color: theme.subTextColor,
                  lineHeight: 1.6,
                }}
              >
                {lang === 'hi'
                  ? 'मेरी शैक्षणिक पृष्ठभूमि और तकनीकी कार्यों का संक्षिप्त विवरण।'
                  : 'A brief overview of my academic achievements and deployed projects.'}
              </p>
            </div>

            {/* Metric Cards Grid (Clean cards without decorative legends) */}
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
                  backgroundColor: theme.surface,
                  borderRadius: '24px',
                  padding: '2.25rem',
                  border: `1px solid ${theme.hairlineBorder}`,
                  boxShadow: '0 12px 30px rgba(10, 2, 4, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '210px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Oswald', 'Syne', sans-serif",
                    fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: theme.primary,
                    lineHeight: 1,
                  }}
                >
                  Top 1%
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: theme.secondary,
                      margin: '0.75rem 0 0.5rem 0',
                    }}
                  >
                    {lang === 'hi' ? 'NPTEL IIT मद्रास टॉपर' : 'NPTEL IIT Madras Topper'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                    {lang === 'hi'
                      ? "'Python for Data Science' कोर्स में 83% एलिट गोल्ड स्कोर के साथ टॉप 1% में।"
                      : 'Achieved an 83% Elite Gold score in the Python for Data Science certification.'}
                  </p>
                </div>
              </div>

              {/* Metric 2 */}
              <div
                style={{
                  backgroundColor: theme.surface,
                  borderRadius: '24px',
                  padding: '2.25rem',
                  border: `1px solid ${theme.hairlineBorder}`,
                  boxShadow: '0 12px 30px rgba(10, 2, 4, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '210px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Oswald', 'Syne', sans-serif",
                    fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: theme.primary,
                    lineHeight: 1,
                  }}
                >
                  4+
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: theme.secondary,
                      margin: '0.75rem 0 0.5rem 0',
                    }}
                  >
                    {lang === 'hi' ? 'लाइव एमएल प्रोजेक्ट्स' : 'Live ML Projects'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                    {lang === 'hi'
                      ? 'हगिंग फेस, गिटहब और स्ट्रीमलिट पर लाइव परिनियोजित एंड-टू-एंड वेब ऐप्स।'
                      : 'End-to-end applications deployed on Hugging Face Spaces, GitHub, and Streamlit.'}
                  </p>
                </div>
              </div>

              {/* Metric 3 */}
              <div
                style={{
                  backgroundColor: theme.surface,
                  borderRadius: '24px',
                  padding: '2.25rem',
                  border: `1px solid ${theme.hairlineBorder}`,
                  boxShadow: '0 12px 30px rgba(10, 2, 4, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '210px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Oswald', 'Syne', sans-serif",
                    fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: theme.primary,
                    lineHeight: 1,
                  }}
                >
                  7.64
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: theme.secondary,
                      margin: '0.75rem 0 0.5rem 0',
                    }}
                  >
                    {lang === 'hi' ? 'बी.टेक सीजीपीए' : 'B.Tech CGPA'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                    {lang === 'hi'
                      ? 'एक्रोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में एआई & एमएल ब्रांच।'
                      : 'B.Tech in Artificial Intelligence & Machine Learning at Acropolis Institute (2022–2026).'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: SELECTED WORKS / PROJECTS (WITH GENERATED EDITORIAL ARTWORKS)
            ========================================================================= */}
        <section
          id="projects"
          style={{
            width: '100%',
            padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1.25rem, 4vw, 4rem)',
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
            }}
          >
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
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: theme.secondary,
                  margin: 0,
                }}
              >
                {lang === 'hi' ? 'प्रमुख प्रोजेक्ट्स' : 'Featured Projects'}
              </h2>
              <p
                style={{
                  maxWidth: '460px',
                  margin: 0,
                  fontSize: '1rem',
                  color: theme.subTextColor,
                  lineHeight: 1.6,
                }}
              >
                {lang === 'hi'
                  ? 'मशीन लर्निंग, एनएलपी और वेब डेवलपमेंट पर आधारित मेरे प्रोजेक्ट्स।'
                  : 'Practical projects in machine learning, NLP, and interactive web tools.'}
              </p>
            </div>

            {/* Asymmetrical Editorial Project Showcase */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {projects.map((proj, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={proj.title}
                    style={{
                      borderRadius: '32px',
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.hairlineBorder}`,
                      padding: 'clamp(1.25rem, 3vw, 2.25rem)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, 1fr)',
                      gap: 'clamp(1.75rem, 3.5vw, 3rem)',
                      alignItems: 'center',
                      boxShadow: '0 20px 50px -15px rgba(10, 2, 4, 0.65)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    {/* Media Frame with Generated Artwork */}
                    <div
                      style={{
                        gridColumn: 'span 12',
                        order: isEven ? 1 : 2,
                        borderRadius: '22px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#1E070B',
                        border: `1px solid ${theme.hairlineBorder}`,
                      }}
                      className="lg:col-span-7"
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{
                          width: '100%',
                          height: 'clamp(280px, 34vw, 440px)',
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
                          backgroundColor: 'rgba(38, 11, 15, 0.85)',
                          backdropFilter: 'blur(10px)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: theme.primary,
                          border: `1px solid ${theme.hairlineBorder}`,
                        }}
                      >
                        {proj.tags[0]}
                      </div>
                    </div>

                    {/* Content Block */}
                    <div
                      style={{
                        gridColumn: 'span 12',
                        order: isEven ? 2 : 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                      }}
                      className="lg:col-span-5"
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: theme.primary,
                            marginBottom: '0.35rem',
                          }}
                        >
                          {lang === 'hi' ? proj.categoryHi : proj.category}
                        </div>
                        <h3
                          style={{
                            fontFamily: lang === 'hi' ? "'Rozha One', serif" : "'Playfair Display', serif",
                            fontSize: 'clamp(1.85rem, 3.2vw, 2.45rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: theme.secondary,
                            margin: 0,
                          }}
                        >
                          {proj.title}
                        </h3>
                      </div>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.98rem',
                          color: theme.subTextColor,
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
                              padding: '5px 14px',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(72, 25, 35, 0.6)',
                              border: `1px solid ${theme.hairlineBorder}`,
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              color: theme.secondary,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Link */}
                      <div style={{ paddingTop: '0.5rem' }}>
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: theme.primary,
                            borderBottom: `1.5px solid ${theme.primary}`,
                            paddingBottom: '4px',
                            transition: 'opacity 0.2s ease',
                          }}
                        >
                          <span>{lang === 'hi' ? 'लाइव डेमो / कोड देखें' : 'View Live Project'}</span>
                          <ArrowUpRight size={16} />
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
            SECTION 4: TECHNICAL COMPETENCIES
            ========================================================================= */}
        <section
          id="competencies"
          style={{
            width: '100%',
            backgroundColor: theme.surfaceLow,
            padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1.25rem, 4vw, 4rem)',
            borderTop: `1px solid ${theme.hairlineBorder}`,
            borderBottom: `1px solid ${theme.hairlineBorder}`,
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
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <h2
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: theme.secondary,
                  margin: 0,
                }}
              >
                {lang === 'hi' ? 'तकनीकी कौशल' : 'Skills & Technologies'}
              </h2>
              <p
                style={{
                  maxWidth: '460px',
                  margin: 0,
                  fontSize: '1rem',
                  color: theme.subTextColor,
                  lineHeight: 1.6,
                }}
              >
                {lang === 'hi'
                  ? 'प्रोग्रामिंग भाषाएं, फ्रेमवर्क और टूल्स जिनका उपयोग मैं करता हूँ।'
                  : 'Tools, libraries, and programming languages I use to build systems.'}
              </p>
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
                    backgroundColor: theme.surface,
                    borderRadius: '24px',
                    padding: '2.25rem',
                    border: `1px solid ${theme.hairlineBorder}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    boxShadow: '0 10px 30px rgba(10, 2, 4, 0.4)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: lang === 'hi' ? "'Rozha One', serif" : "'Playfair Display', serif",
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: theme.secondary,
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
                          padding: '7px 16px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(72, 25, 35, 0.65)',
                          border: `1px solid ${theme.hairlineBorder}`,
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: theme.secondary,
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
            padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1.25rem, 4vw, 4rem)',
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
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <h2
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: theme.secondary,
                  margin: 0,
                }}
              >
                {lang === 'hi' ? 'प्रमाणपत्र' : 'Certifications'}
              </h2>
              <p
                style={{
                  maxWidth: '460px',
                  margin: 0,
                  fontSize: '1rem',
                  color: theme.subTextColor,
                  lineHeight: 1.6,
                }}
              >
                {lang === 'hi'
                  ? 'आईआईटी मद्रास और प्रमाणित संस्थानों से प्राप्त प्रमाणपत्र।'
                  : 'Verified coursework from IIT Madras and accredited programs.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {certifications.map((c) => (
                <div
                  key={c.title}
                  style={{
                    backgroundColor: theme.surface,
                    borderRadius: '24px',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    border: `1px solid ${theme.hairlineBorder}`,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    boxShadow: '0 12px 30px rgba(10, 2, 4, 0.4)',
                  }}
                >
                  <div style={{ flex: '1 1 340px' }}>
                    <div style={{ fontSize: '0.88rem', color: theme.primary, fontWeight: 600, marginBottom: '6px' }}>
                      {c.issuer} · {c.date}
                    </div>

                    <h3
                      style={{
                        fontFamily: lang === 'hi' ? "'Rozha One', serif" : "'Playfair Display', serif",
                        fontSize: '1.55rem',
                        fontWeight: 800,
                        color: theme.secondary,
                        margin: '0 0 8px 0',
                      }}
                    >
                      {lang === 'hi' ? c.titleHi : c.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                      {c.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.35rem',
                        color: theme.primary,
                        fontWeight: 700,
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
                        padding: '11px 22px',
                        borderRadius: '9999px',
                        backgroundColor: theme.ctaRose,
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        boxShadow: '0 8px 20px rgba(184, 114, 119, 0.4)',
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
            SECTION 6: ABOUT & ENGINEERING PHILOSOPHY
            ========================================================================= */}
        <section
          id="about"
          style={{
            width: '100%',
            backgroundColor: theme.surfaceLow,
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.25rem, 4vw, 4rem)',
            borderRadius: '36px',
            maxWidth: '1440px',
            margin: '0 auto clamp(3.5rem, 6vw, 5.5rem)',
            border: `1px solid ${theme.hairlineBorder}`,
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
              gap: '2.25rem',
            }}
          >
            <h2
              style={{
                fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: theme.secondary,
                margin: 0,
              }}
            >
              {lang === 'hi' ? 'मेरे बारे में' : 'About Me'}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: theme.primary,
                  color: '#260B0F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: `0 0 16px ${theme.glowRose}`,
                }}
              >
                DP
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: theme.secondary }}>
                  Deepesh Patel
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: theme.subTextColor,
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
                borderTop: `1px solid ${theme.hairlineBorder}`,
                fontSize: '1.02rem',
                color: theme.subTextColor,
                lineHeight: 1.7,
                textAlign: 'center',
                maxWidth: '780px',
              }}
            >
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.75 }}>
                {lang === 'hi'
                  ? 'मैं एक्रोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च, इंदौर में आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग का बी.टेक छात्र हूँ (2022–2026)। मैं मशीन लर्निंग मॉडल्स, अनुशंसा प्रणालियों और आधुनिक वेब एप्लिकेशन्स को विकसित करने में रुचि रखता हूँ। कोडिंग के अतिरिक्त, मैं मानसिक दृढ़ता और एकाग्रता के लिए नियमित लंबी दूरी की दौड़ का अभ्यास करता हूँ।'
                  : 'I am a B.Tech student in Artificial Intelligence and Machine Learning at Acropolis Institute of Technology and Research, Indore (2022–2026). I build predictive machine learning models, recommender systems, and responsive web applications. Outside of technology, I regularly practice long-distance running to cultivate discipline, consistency, and focus.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: PRANA AI COPILOT WORKSPACE CONSOLE
            ========================================================================= */}
        <section
          id="contact"
          style={{
            width: '100%',
            backgroundColor: theme.surfaceLow,
            padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1.25rem, 4vw, 4rem)',
            borderTop: `1px solid ${theme.hairlineBorder}`,
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
                backgroundColor: theme.surface,
                borderRadius: '24px',
                padding: '1.5rem 2.25rem',
                border: `1px solid ${theme.hairlineBorder}`,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.25rem',
                boxShadow: '0 12px 30px rgba(10, 2, 4, 0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(184, 114, 119, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.primary,
                    position: 'relative',
                  }}
                >
                  <Bot size={24} />
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: theme.primary,
                      boxShadow: `0 0 10px ${theme.primary}`,
                    }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: theme.secondary,
                      }}
                    >
                      PRANA AI
                    </span>

                  </div>
                  <div style={{ fontSize: '0.82rem', color: theme.subTextColor }}>
                    {lang === 'hi' ? 'दीपेश पटेल का इंटरएक्टिव एआई असिस्टेंट' : 'Deepesh Patel’s Interactive AI Assistant'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  fontSize: '0.85rem',
                  color: theme.subTextColor,
                  alignItems: 'center',
                }}
              >
                <div>
                  Powered by <strong style={{ color: theme.secondary }}>Gemini API</strong>
                </div>
                <button
                  onClick={() => setIsChatOpen(true)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    backgroundColor: theme.ctaRose,
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(184, 114, 119, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {lang === 'hi' ? 'चैट शुरू करें' : 'Start Chat'}
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
          backgroundColor: '#1E070B',
          borderTop: `1px solid ${theme.hairlineBorder}`,
          padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: theme.primary,
                    color: '#260B0F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  DP
                </div>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: theme.secondary,
                  }}
                >
                  Deepesh Patel
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: theme.subTextColor,
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
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.primary,
                  marginBottom: '14px',
                }}
              >
                Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="#home"
                  style={{ textDecoration: 'none', color: theme.secondary, fontSize: '0.9rem' }}
                >
                  Home / Namaskaram
                </a>
                <a
                  href="#projects"
                  style={{ textDecoration: 'none', color: theme.secondary, fontSize: '0.9rem' }}
                >
                  Selected Works
                </a>
                <a
                  href="#metrics"
                  style={{ textDecoration: 'none', color: theme.secondary, fontSize: '0.9rem' }}
                >
                  Practicum & Metrics
                </a>
                <a
                  href="#competencies"
                  style={{ textDecoration: 'none', color: theme.secondary, fontSize: '0.9rem' }}
                >
                  Competencies
                </a>
                <a
                  href="#certifications"
                  style={{ textDecoration: 'none', color: theme.secondary, fontSize: '0.9rem' }}
                >
                  Certifications
                </a>
              </div>
            </div>

            {/* Column 3: Contact & Profiles */}
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.primary,
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
                    color: theme.secondary,
                    fontSize: '0.9rem',
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
                    color: theme.secondary,
                    fontSize: '0.9rem',
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
                    color: theme.secondary,
                    fontSize: '0.9rem',
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
              borderTop: `1px solid ${theme.hairlineBorder}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.78rem',
              color: theme.subTextColor,
            }}
          >
            <div>© 2026 Deepesh Patel. All rights reserved. Crafted in Oxblood Red & Dusky Rose.</div>
            <div>B.Tech AI & Machine Learning · Acropolis Institute of Technology & Research</div>
          </div>
        </div>
      </footer>

      {/* PRANA AI Floating Chatbox Component */}
      <Chatbox
        currentTheme={{
          bgCanvas: theme.bgCanvas,
          surfaceLow: theme.surfaceLow,
          surface: theme.surface,
          surfaceHigh: theme.surfaceHigh,
          surfaceVariant: theme.surfaceVariant,
          primary: theme.ctaRose,
          secondary: theme.primary,
          textColor: theme.secondary,
          subTextColor: theme.subTextColor,
          hairlineBorder: theme.hairlineBorder,
          goldAccent: theme.goldAccent,
        }}
        lang={lang}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  )
}

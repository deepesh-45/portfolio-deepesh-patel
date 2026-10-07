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
    title: 'Reflect AI: Your AI Companion',
    category: 'Serverless AI & Emotional Wellness',
    categoryHi: 'सर्वरलेस एआई और मेंटल वेलनेस',
    description:
      'A serverless mindful journaling web application powered by the Gemini API and Cloud Firestore. Built to provide an empathetic conversational companion for emotional reflection, paired with creative thought synthesis tools.',
    descriptionHi:
      'जेमिनी एपीआई और क्लाउड फायरस्टोर द्वारा संचालित एक सर्वरलेस जर्नलिंग वेब एप्लिकेशन। तनाव मुक्ति और भावनात्मक चिंतन के लिए एक संवेदनशील एआई साथी प्रदान करता है।',
    image: '/project-reflect-ai.jpg',
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
    image: '/project-laptop-recommender.jpg',
    link: 'https://deepesh-45-my-laptop.hf.space/',
    tags: ['Python', 'Streamlit', 'Scikit-Learn', 'Hugging Face'],
  },
  {
    number: '03',
    title: 'Books Recommender System',
    category: 'Content-Based Vector Recommendation',
    categoryHi: 'कंटेंट-बेस्ड वेक्टर अनुशंसा प्रणाली',
    description:
      'A recommendation pipeline leveraging Cosine Similarity and vector space modeling across extensive literary datasets. Implements statistical data cleaning, tokenization, and multi-dimensional preference matching.',
    descriptionHi:
      'कागल डेटासेट पर कोसाइन सिमिलैरिटी और वेक्टर स्पेस मॉडलिंग का उपयोग करके बनाई गई पुस्तक अनुशंसा प्रणाली। डेटा की सफाई और वेक्टर मिलान द्वारा सटीक सुझाव प्रस्तुत करती है।',
    image: '/project-books-recommender.jpg',
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
    image: '/project-sortify-visualizer.jpg',
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
      <main style={{ paddingTop: '80px', width: '100%' }}>
        {/* =========================================================================
            SECTION 1: CINEMATIC BACKGROUND VIDEO HERO (3D AVATAR ON RIGHT, CRISP TEXT ON LEFT)
            ========================================================================= */
        <section
          id="home"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'calc(100vh - 80px)',
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
              padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 4rem)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Left Content Column (Keeps clear of avatar on the right) */}
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
              {/* Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '7px 20px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(57, 19, 27, 0.85)',
                  border: `1px solid ${theme.hairlineBorder}`,
                  color: theme.primary,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.45)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#E86F76',
                    boxShadow: '0 0 10px #E86F76',
                  }}
                  className="animate-ping-subtle"
                />
                <span>
                  {lang === 'hi'
                    ? '✦ पोर्टफोलियो 2026 · एआई और मशीन लर्निंग इंजीनियर'
                    : '✦ PORTFOLIO 2026 · AI & MACHINE LEARNING ENGINEER'}
                </span>
              </div>

              {/* Monumental Condensed Headline: Namaskaram */}
              <h1
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', 'Syne', serif",
                  fontSize: 'clamp(3.8rem, 8.5vw, 6.8rem)',
                  lineHeight: 0.98,
                  fontWeight: 800,
                  letterSpacing: lang === 'hi' ? '0.01em' : '-0.025em',
                  color: theme.primary,
                  margin: '0 0 1rem 0',
                  textShadow: '0 12px 42px rgba(212, 155, 158, 0.28)',
                  userSelect: 'none',
                }}
              >
                {lang === 'hi' ? 'नमस्कार.' : 'Namaskaram.'}
              </h1>

              {/* Secondary Headline: Role & Specialization */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)',
                  lineHeight: 1.2,
                  fontWeight: 800,
                  letterSpacing: '-0.015em',
                  textTransform: 'uppercase',
                  color: theme.secondary,
                  margin: '0 0 1.25rem 0',
                }}
              >
                {lang === 'hi'
                  ? 'मैं एक एआई और मशीन लर्निंग इंजीनियर हूँ'
                  : "I'M AN AI & MACHINE LEARNING ENGINEER"}
              </h2>

              {/* Subtitle / Narrative Copy */}
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 'clamp(1.02rem, 1.8vw, 1.2rem)',
                  lineHeight: 1.68,
                  color: theme.subTextColor,
                  maxWidth: '560px',
                  fontWeight: 400,
                  margin: '0 0 2.25rem 0',
                }}
              >
                {lang === 'hi'
                  ? 'मेरी डिजिटल दुनिया में आपका स्वागत है। बुद्धिमान प्रेडिक्टिव सिस्टम्स, वास्तविक समय के एल्गोरिदम और डिजिटल अनुभवों का निर्माण।'
                  : "Welcome to my digital space. Crafting intelligent predictive systems, real-time algorithms & spatial digital architectures."}
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '2.25rem',
                }}
              >
                <a
                  href="#projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px 32px',
                    borderRadius: '12px',
                    backgroundColor: theme.ctaRose,
                    color: '#FFFFFF',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
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
                  <span>{lang === 'hi' ? 'चुनिंदा प्रोजेक्ट्स देखें' : 'Explore Selected Works'}</span>
                  <ArrowDown size={17} />
                </a>

                <a
                  href="/deepesh-patel-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px 30px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(57, 19, 27, 0.75)',
                    border: `1.5px solid ${theme.hairlineBorder}`,
                    color: theme.secondary,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
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
                  <span>{lang === 'hi' ? 'बायोडाटा / सीवी डाउनलोड करें' : 'Download Monograph / CV'}</span>
                </a>
              </div>

              {/* Location Pill & Coordinates Overlay */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(47, 14, 20, 0.82)',
                  border: `1px solid ${theme.hairlineBorder}`,
                  color: theme.subTextColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                <span style={{ color: theme.primary, fontSize: '0.95rem' }}>📍</span>
                <span>
                  {lang === 'hi'
                    ? 'इंदौर और बेंगलुरु · अवसरों व सहयोग के लिए उपलब्ध'
                    : 'Indore & Bengaluru · Open for ML & Software Roles'}
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
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.primary,
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
                  marginTop: '0.35rem',
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
                  {lang === 'hi' ? 'क्यूरेटेड मेट्रिक्स & उपलब्धियां' : 'Curated Metric & Practicum'}
                </h2>
                <p
                  style={{
                    maxWidth: '460px',
                    margin: 0,
                    fontSize: '0.98rem',
                    color: theme.subTextColor,
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
                  backgroundColor: theme.surface,
                  borderRadius: '24px',
                  padding: '2.25rem',
                  border: `1px solid ${theme.hairlineBorder}`,
                  boxShadow: '0 12px 30px rgba(10, 2, 4, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '230px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: theme.primary,
                  }}
                >
                  {lang === 'hi' ? 'आईआईटी मद्रास डिस्टिंक्शन' : 'Academic Distinction'}
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <span
                    style={{
                      fontFamily: "'Oswald', 'Syne', sans-serif",
                      fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: theme.primary,
                    }}
                  >
                    Top 2%
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                  {lang === 'hi'
                    ? "NPTEL IIT मद्रास 'Python for Data Science' कोर्स टॉपर 83% एलिट स्कोर के साथ।"
                    : 'NPTEL IIT Madras Course Topper in Python for Data Science with an 83% certified score.'}
                </p>
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
                  minHeight: '230px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: theme.primary,
                  }}
                >
                  {lang === 'hi' ? 'परिनियोजित सिस्टम्स' : 'Intelligent Deployments'}
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <span
                    style={{
                      fontFamily: "'Oswald', 'Syne', sans-serif",
                      fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: theme.primary,
                    }}
                  >
                    4+
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                  {lang === 'hi'
                    ? 'हगिंग फेस, वेरसेल और गिटहब पर लाइव परिनियोजित अनुशंसा इंजन व जेनरेटिव एआई ऐप्स।'
                    : 'Deployed machine learning systems, recommender engines, and real-time interactive visualizers.'}
                </p>
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
                  minHeight: '230px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: theme.primary,
                  }}
                >
                  {lang === 'hi' ? 'अकादमिक निरंतरता' : 'Academic Standing'}
                </span>
                <div style={{ margin: '1rem 0' }}>
                  <span
                    style={{
                      fontFamily: "'Oswald', 'Syne', sans-serif",
                      fontSize: 'clamp(3.4rem, 6vw, 4.8rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: theme.primary,
                    }}
                  >
                    7.96
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: theme.subTextColor, lineHeight: 1.55 }}>
                  {lang === 'hi'
                    ? 'एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में बी.टेक एआई & एमएल में स्थिर सीजीपीए।'
                    : 'Consistent CGPA in B.Tech Computer Science & AI/ML at Acropolis Institute of Technology & Research.'}
                </p>
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
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: theme.primary,
                  }}
                >
                  Archive 2026
                </span>
                <h2
                  style={{
                    fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: theme.secondary,
                    margin: '0.35rem 0 0 0',
                  }}
                >
                  {lang === 'hi' ? 'विशेष परियोजनाएं और सिस्टम' : 'Selected Spatial & AI Canvases'}
                </h2>
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: theme.primary,
                }}
              >
                {lang === 'hi' ? '04 प्रमुख निर्माण' : '04 Works in Spotlight'}
              </span>
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
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: theme.primary,
                          }}
                        >
                          Project {proj.number} · {lang === 'hi' ? proj.categoryHi : proj.category}
                        </span>
                        <h3
                          style={{
                            fontFamily: lang === 'hi' ? "'Rozha One', serif" : "'Playfair Display', serif",
                            fontSize: 'clamp(1.85rem, 3.2vw, 2.45rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            color: theme.secondary,
                            margin: '0.4rem 0 0 0',
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
                          <span>{lang === 'hi' ? 'लाइव डेमो / कोड देखें' : 'View Comprehensive Case Study'}</span>
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
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.primary,
                }}
              >
                Curated Skill Matrix
              </span>
              <h2
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: theme.secondary,
                  margin: '0.35rem 0 0 0',
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
            <div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.primary,
                }}
              >
                Verified Credentials
              </span>
              <h2
                style={{
                  fontFamily: lang === 'hi' ? "'Rozha One', 'Yatra One', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: theme.secondary,
                  margin: '0.35rem 0 0 0',
                }}
              >
                {lang === 'hi' ? 'प्रमाणपत्र और विशिष्टताएं' : 'Certifications & Honors'}
              </h2>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(184, 114, 119, 0.35)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: theme.primary,
                        }}
                      >
                        {lang === 'hi' ? c.badgeHi : c.badge}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: theme.subTextColor }}>{c.issuer}</span>
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
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: theme.primary,
              }}
            >
              {lang === 'hi' ? 'दर्शन और दृष्टिकोण' : 'Engineering Philosophy & Stance'}
            </span>

            <blockquote
              style={{
                fontFamily: lang === 'hi' ? "'Rozha One', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)',
                lineHeight: 1.35,
                fontWeight: 700,
                fontStyle: 'italic',
                color: theme.secondary,
                margin: 0,
              }}
            >
              {lang === 'hi'
                ? '“इंजीनियरिंग में सच्ची बुद्धिमत्ता जटिलता में नहीं, बल्कि ऐसे एल्गोरिदम बनाने में है जो सहज, मानवीय और उपयोगी महसूस हों।”'
                : '“True intelligence in engineering is not complexity for its own sake, but crafting algorithms and systems that feel effortless, intuitive, and profoundly human.”'}
            </blockquote>

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
              <p style={{ margin: '0 0 1rem 0' }}>
                {lang === 'hi'
                  ? 'मैं एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग का छात्र हूँ। कोडिंग और मॉडल आर्किटेक्चर के अलावा, मैं मानसिक दृढ़ता और अनुशासन विकसित करने के लिए नियमित लंबी दूरी की दौड़ का अभ्यास करता हूँ।'
                  : 'I am an AI & Machine Learning undergraduate at Acropolis Institute of Technology and Research. Beyond code, I practice regular long-distance running to build discipline, mental resilience, and steady focus.'}
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
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(72, 25, 35, 0.65)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: theme.primary,
                      }}
                    >
                      v2.4 Core
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: theme.subTextColor }}>
                    {lang === 'hi' ? 'दीपेश पटेल का डिजिटल कोपायलट' : 'Deepesh Patel’s Spatial Copilot & Computational Twin'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  fontSize: '0.78rem',
                  color: theme.subTextColor,
                  alignItems: 'center',
                }}
              >
                <div>
                  Model: <strong style={{ color: theme.primary }}>Gemini Dual-Engine</strong>
                </div>
                <div>
                  Resonance: <strong style={{ color: theme.primary }}>99.4% Sync</strong>
                </div>
                <button
                  onClick={() => setIsChatOpen(true)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '9999px',
                    backgroundColor: theme.ctaRose,
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(184, 114, 119, 0.4)',
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

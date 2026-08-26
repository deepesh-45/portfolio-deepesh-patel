import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  ChevronUp,
  Code2,
  Download,
  ExternalLink,
  FolderGit2,
  Globe,
  GraduationCap,
  Home,
  Mail,
  Moon,
  Sparkles,
  Sun,
  User,
} from 'lucide-react'
import GradientWaves from './components/GradientWaves'
import ShinyText from './components/ShinyText'
import SpotlightCard from './components/SpotlightCard'
import Dock from './components/Dock'
import type { DockItem } from './components/Dock'
import Chatbox from './components/Chatbox'

type ThemeMode = 'dark' | 'light'
type LanguageMode = 'hi' | 'en'

const themes = {
  dark: {
    horizonColor: '#273338',
    waveColor: '#2b5748',
    crestColor: '#618764',
    metaColor: '#273338',
    cardBg: 'rgba(39, 51, 56, 0.92)',
    cardBorder: 'rgba(156, 176, 128, 0.25)',
    textColor: '#f1f5ee',
    subTextColor: '#9cb080',
    pillBg: 'rgba(156, 176, 128, 0.14)',
    pillBorder: 'rgba(156, 176, 128, 0.3)',
    shinyColor: '#9cb080',
    shinyShine: '#ffffff',
    badgeBg: 'rgba(97, 135, 100, 0.25)',
    badgeBorder: 'rgba(156, 176, 128, 0.5)',
    badgeText: '#9cb080',
    accent: '#9cb080',
    spotlight: 'rgba(156, 176, 128, 0.25)',
    borderGradient: 'linear-gradient(135deg, #9cb080, #618764, #2b5748, #9cb080)',
  },
  light: {
    horizonColor: '#f4f7f2',
    waveColor: '#618764',
    crestColor: '#9cb080',
    metaColor: '#f4f7f2',
    cardBg: 'rgba(255, 255, 255, 0.94)',
    cardBorder: 'rgba(43, 87, 72, 0.16)',
    textColor: '#273338',
    subTextColor: '#2b5748',
    pillBg: 'rgba(156, 176, 128, 0.18)',
    pillBorder: 'rgba(97, 135, 100, 0.3)',
    shinyColor: '#273338',
    shinyShine: '#2b5748',
    badgeBg: 'rgba(156, 176, 128, 0.22)',
    badgeBorder: 'rgba(43, 87, 72, 0.35)',
    badgeText: '#2b5748',
    accent: '#2b5748',
    spotlight: 'rgba(156, 176, 128, 0.22)',
    borderGradient: 'linear-gradient(135deg, #2b5748, #618764, #9cb080, #2b5748)',
  },
}

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Tools & DBs',
    skills: ['Git', 'GitHub', 'Docker', 'PostgreSQL', 'Firestore'],
  },
  {
    title: 'Core Competencies',
    skills: ['Machine Learning', 'Data Analysis', 'Adaptive Learning', 'Time Management', 'Problem Solving'],
  },
]

const projects = [
  {
    title: 'Reflect AI: Your AI Companion',
    category: 'AI, Full-Stack Journaling & Gemini Integration',
    description:
      'Vibe-coded a serverless journaling web app using JavaScript frameworks and Firestore. Integrated the Gemini API to build a supportive AI companion for stress relief, alongside poetry generation tools.',
    image: '/project_reflect.png',
    link: 'https://deepesh-45.github.io/Reflect-AI/',
    date: 'June 2026',
    tags: ['Gemini API', 'Firestore', 'JavaScript', 'Serverless AI'],
  },
  {
    title: 'Sortify: Sorting Visualizer',
    category: 'Algorithms & Interactive Web Development',
    description:
      'Developed a web-based visualizer using vanilla HTML, CSS, and JavaScript to show how classic sorting algorithms (like Bubble, Merge, and Quick Sort) work in real time. Added a custom UI for speeds and array sizes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: 'https://sortify-silk.vercel.app/',
    date: 'May 2026',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Algorithms'],
  },
  {
    title: 'Laptop Recommender System',
    category: 'Machine Learning & Web Deployment',
    description:
      'Created a laptop recommendation application with a Python backend and an interactive Streamlit frontend. Built filtering logic to rank laptops based on user specs and deployed live on Hugging Face.',
    image: '/project_laptop.png',
    link: 'https://deepesh-45-my-laptop.hf.space/',
    date: 'Feb 2026',
    tags: ['Python', 'Streamlit', 'Scikit-Learn', 'Hugging Face'],
  },
  {
    title: 'Books Recommender System',
    category: 'Machine Learning & Data Analysis',
    description:
      'Built a Python-based book recommendation tool using a Kaggle dataset. Used Pandas and NumPy to clean data, and applied Cosine Similarity to calculate text vectors and match user preferences.',
    image: '/project_books.png',
    link: 'https://github.com/deepesh-45',
    date: 'Jan 2026',
    tags: ['Python', 'Pandas', 'NumPy', 'Cosine Similarity'],
  },
]

const certs = [
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL — IIT Madras',
    date: "April '26",
    link: 'https://drive.google.com/file/d/129esc7_P75SsjB8D_p7F77VLrfqwu9gl/view?usp=drivesdk',
    achievement: 'Course Topper (Top 2%)',
    score: '83%',
    description:
      'Demonstrated proficiency in core data engineering tasks including advanced dataset manipulation with Pandas, statistical plotting with Matplotlib & Seaborn, and baseline predictive modeling with Scikit-Learn.',
  },
  {
    title: 'Python Foundation Certification',
    issuer: 'Infosys',
    date: "January '26",
    link: 'https://drive.google.com/file/d/1faWANaSfdHVw-NuoBNUGa8uKIgCTwtzb/view?usp=drivesdk',
    achievement: 'Verified Certificate',
    score: '',
    description:
      'Mastered foundational language syntax, control structures, and OOP principles. Applied algorithmic thinking and debugging practices to optimize script performance.',
  },
  {
    title: 'Artificial Intelligence Foundation',
    issuer: 'Infosys',
    date: "January '26",
    link: 'https://drive.google.com/file/d/1ZXgpFm-6zOqmFNNEhPzyS7yEOvrnaNBO/view?usp=drivesdk',
    achievement: 'Verified Certificate',
    score: '',
    description:
      'Gained a foundational understanding of machine learning branches, covering regression models, supervised classification workflows, neural network architectures, and NLP.',
  },
]

const timeline = [
  {
    role: 'Technical Team Member & Visual Designer',
    organization: 'IEEE International Conference on Innovate for Humanitarian (ICIH)',
    date: 'November 2025',
    location: 'Indore, India',
    details: [
      'Managed presentation setups, oversaw technical logistics for international tracks, and streamlined research paper workflows for presenting delegates.',
      'Designed the end-to-end visual assets for the conference, including official backdrops, promotional posters, speaker slide templates, and participant certificates.',
    ],
  },
  {
    role: 'B.Tech - Artificial Intelligence and Machine Learning',
    organization: 'Acropolis Institute of Technology and Research',
    date: 'Aug 2024 – Aug 2028',
    location: 'Indore, India',
    details: [
      'CGPA: 7.96',
      'Courses: Operating Systems, Data Structures, Analysis Of Algorithms, Artificial Intelligence, Machine Learning, Networking, Databases',
    ],
  },
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [lang, setLang] = useState<LanguageMode>(() => {
    const savedLang = localStorage.getItem('lang-mode')
    if (savedLang === 'hi' || savedLang === 'en') return savedLang
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('theme-mode', theme)
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', themes[theme].metaColor)
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('lang-mode', lang)
  }, [lang])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))
  }

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentTheme = themes[theme]

  const dockItems: DockItem[] = [
    {
      id: 'home',
      label: lang === 'hi' ? 'होम' : 'Home',
      icon: <Home size={18} />,
      onClick: () => scrollToSection('home'),
    },
    {
      id: 'about',
      label: lang === 'hi' ? 'परिचय' : 'About',
      icon: <User size={18} />,
      onClick: () => scrollToSection('about'),
    },
    {
      id: 'skills',
      label: lang === 'hi' ? 'कौशल' : 'Skills',
      icon: <Code2 size={18} />,
      onClick: () => scrollToSection('skills'),
    },
    {
      id: 'projects',
      label: lang === 'hi' ? 'परियोजनाएं' : 'Projects',
      icon: <FolderGit2 size={18} />,
      onClick: () => scrollToSection('projects'),
    },
    {
      id: 'certifications',
      label: lang === 'hi' ? 'प्रमाणपत्र' : 'Certifications',
      icon: <Award size={18} />,
      onClick: () => scrollToSection('certifications'),
    },
    {
      id: 'experience',
      label: lang === 'hi' ? 'अनुभव' : 'Experience',
      icon: <Building2 size={18} />,
      onClick: () => scrollToSection('experience'),
    },
    {
      id: 'contact',
      label: lang === 'hi' ? 'संपर्क' : 'Contact',
      icon: <Mail size={18} />,
      onClick: () => scrollToSection('contact'),
    },
    {
      id: 'lang',
      label: lang === 'hi' ? 'English' : 'हिंदी',
      icon: <Globe size={18} />,
      onClick: toggleLanguage,
    },
    {
      id: 'theme',
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: theme === 'dark' ? <Sun size={18} style={{ color: '#facc15' }} /> : <Moon size={18} style={{ color: currentTheme.accent }} />,
      onClick: toggleTheme,
    },
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: currentTheme.textColor, paddingTop: '70px' }}>
      {/* Fixed WebGL Gradient Waves Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <GradientWaves
          horizonColor={currentTheme.horizonColor}
          waveColor={currentTheme.waveColor}
          crestColor={currentTheme.crestColor}
          speed={0.3}
          brightness={theme === 'dark' ? 1.0 : 1.1}
        />
      </div>

      {/* Full-Width Sticky Top React Bits Dock Navbar */}
      <Dock
        items={dockItems}
        currentTheme={currentTheme}
        brandName="Deepesh Patel"
        brandSub={lang === 'hi' ? 'एआई & एमएल इंजीनियर' : 'AI & ML Engineer'}
      />

      {/* Main Multi-Section Content Container */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        {/* HERO SECTION */}
        <section
          id="home"
          style={{
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px 0 40px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: currentTheme.badgeBg,
              border: `1px solid ${currentTheme.badgeBorder}`,
              color: currentTheme.badgeText,
              fontSize: '0.9rem',
              fontWeight: 700,
              marginBottom: '24px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: currentTheme.badgeText, boxShadow: `0 0 12px ${currentTheme.badgeText}` }} />
            <span>{lang === 'hi' ? '🏆 NPTEL IIT मद्रास कोर्स टॉपर (Top 2%)' : '🏆 NPTEL IIT Madras Course Topper (Top 2%)'}</span>
          </div>

          <ShinyText
            text={lang === 'hi' ? 'नमस्कारम!' : 'Namaskaram!'}
            speed={2.5}
            color={currentTheme.shinyColor}
            shineColor={currentTheme.shinyShine}
            spread={145}
            style={{
              fontSize: 'clamp(3.2rem, 14vw, 6.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          />

          <p style={{ marginTop: '24px', fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)', color: currentTheme.subTextColor, fontWeight: 500, maxWidth: '780px', lineHeight: 1.6 }}>
            {lang === 'hi'
              ? 'मैं दीपेश पटेल हूँ — एआई & एमएल इंजीनियर। इंटेलिजेंट सिस्टम, प्रिडिक्टिव एनालिटिक्स और सहज एआई एकीकरण के माध्यम से भविष्य का निर्माण कर रहा हूँ।'
              : 'Architecting the future through intelligent systems and data-driven insights. Specializing in machine learning models, predictive analytics, and seamless AI integrations.'}
          </p>

          <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => scrollToSection('projects')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                minHeight: '52px',
                borderRadius: '9999px',
                backgroundColor: currentTheme.accent,
                color: '#ffffff',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 12px 30px -6px rgba(244, 63, 94, 0.45)',
              }}
            >
              <span>{lang === 'hi' ? 'परियोजनाएं देखें ↓' : 'Explore Projects ↓'}</span>
            </button>

            <a
              href="/Deepesh_Resume.pdf"
              download="Deepesh_Patel_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                minHeight: '52px',
                borderRadius: '9999px',
                backgroundColor: currentTheme.cardBg,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${currentTheme.cardBorder}`,
                color: currentTheme.textColor,
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Download size={18} />
              <span>{lang === 'hi' ? 'रेज़्यूमे डाउनलोड करें' : 'Download Resume'}</span>
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" style={{ padding: '60px 0' }}>
          <SpotlightCard
            spotlightColor={currentTheme.spotlight}
            gradientBorder={currentTheme.borderGradient}
            style={{
              width: '100%',
              padding: 'clamp(28px, 5vw, 48px)',
              backgroundColor: currentTheme.cardBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${currentTheme.cardBorder}`,
              borderRadius: '32px',
              boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <User size={28} style={{ color: currentTheme.accent }} />
              <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
                {lang === 'hi' ? 'मेरे बारे में' : 'About Me'}
              </h2>
            </div>

            <div style={{ fontSize: '1.08rem', color: currentTheme.textColor, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: 0 }}>
                {lang === 'hi'
                  ? 'मैं एकोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च में आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग का छात्र हूँ, जो नई तकनीकी अवधारणाओं और सहज शोध प्रश्नों की खोज के लिए गहराई से प्रेरित है।'
                  : 'I am a passionate AI & Machine Learning student at Acropolis Institute of Technology and Research, driven by curiosity to deep-dive into new tech concepts and explore spontaneous research questions.'}
              </p>
              <p style={{ margin: 0 }}>
                {lang === 'hi'
                  ? 'मेरा इंजीनियरिंग दृष्टिकोण रचनात्मक समस्या निवारण के साथ विश्लेषणात्मक रणनीति को जोड़ता है। चाहे मैं अनुशंसा इंजन बना रहा हूँ, बड़े भाषा मॉडल को एकीकृत कर रहा हूँ, या विजुअल एसेट डिजाइन कर रहा हूँ, मैं उच्च गुणवत्ता वाले प्रभाव प्रदान करने पर ध्यान केंद्रित करता हूँ।'
                  : "My approach to engineering combines analytical strategy with creative problem solving. Whether I'm building recommendation engines, integrating large language models, or designing visual assets, I focus on delivering high-quality, impactful solutions."}
              </p>
              <p style={{ margin: 0 }}>
                {lang === 'hi'
                  ? 'कोडिंग के अलावा, मैं अनुशासन, निरंतरता और लचीलापन विकसित करने के लिए लंबी दूरी की दौड़ का अभ्यास करता हूँ, और अपनी महत्वपूर्ण सोच को तेज रखने के लिए रणनीति-आधारित खेलों में व्यस्त रहता हूँ।'
                  : 'Beyond code, I practice regular long-distance running to build discipline, consistency, and resilience, and engage in strategy-based games to keep my critical thinking sharp.'}
              </p>
            </div>
          </SpotlightCard>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" style={{ padding: '60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <Sparkles size={28} style={{ color: currentTheme.accent }} />
            <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
              {lang === 'hi' ? 'तकनीकी कौशल' : 'Technical Skills'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {skillCategories.map((cat, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor={currentTheme.spotlight}
                gradientBorder={currentTheme.borderGradient}
                style={{
                  width: '100%',
                  padding: '28px',
                  backgroundColor: currentTheme.cardBg,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${currentTheme.cardBorder}`,
                  borderRadius: '32px',
                }}
              >
                <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem', fontWeight: 700, color: currentTheme.accent }}>
                  {cat.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        backgroundColor: currentTheme.pillBg,
                        border: `1px solid ${currentTheme.pillBorder}`,
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        color: currentTheme.textColor,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" style={{ padding: '60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <FolderGit2 size={28} style={{ color: currentTheme.accent }} />
            <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
              {lang === 'hi' ? 'प्रमुख परियोजनाएं' : 'Featured Projects'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
            {projects.map((proj, idx) => (
              <SpotlightCard
                key={idx}
                href={proj.link}
                spotlightColor={currentTheme.spotlight}
                gradientBorder={currentTheme.borderGradient}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(24px, 4vw, 36px)',
                  backgroundColor: currentTheme.cardBg,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${currentTheme.cardBorder}`,
                  borderRadius: '32px',
                  color: currentTheme.textColor,
                  boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.12)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: currentTheme.accent, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {proj.category}
                    </span>
                    <h3 style={{ margin: '8px 0 4px', fontSize: '1.5rem', fontWeight: 800 }}>{proj.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: currentTheme.subTextColor, fontWeight: 600 }}>{proj.date}</span>
                    <ExternalLink size={20} style={{ color: currentTheme.accent }} />
                  </div>
                </div>

                <p style={{ margin: '16px 0', fontSize: '1.02rem', color: currentTheme.subTextColor, lineHeight: 1.65 }}>
                  {proj.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '12px' }}>
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        backgroundColor: currentTheme.pillBg,
                        border: `1px solid ${currentTheme.pillBorder}`,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" style={{ padding: '60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <Award size={28} style={{ color: currentTheme.accent }} />
            <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
              {lang === 'hi' ? 'प्रमाणपत्र एवं उपलब्धियां' : 'Certifications & Achievements'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            {certs.map((cert, idx) => (
              <SpotlightCard
                key={idx}
                href={cert.link}
                spotlightColor={currentTheme.spotlight}
                gradientBorder={currentTheme.borderGradient}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(24px, 4vw, 36px)',
                  backgroundColor: currentTheme.cardBg,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${currentTheme.cardBorder}`,
                  borderRadius: '32px',
                  color: currentTheme.textColor,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>{cert.title}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: currentTheme.subTextColor, fontWeight: 600 }}>
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {cert.score && (
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: currentTheme.accent, padding: '4px 10px', borderRadius: '8px', backgroundColor: currentTheme.pillBg }}>
                        Score: {cert.score}
                      </span>
                    )}
                    <ArrowUpRight size={20} style={{ color: currentTheme.accent }} />
                  </div>
                </div>

                {cert.achievement && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      backgroundColor: currentTheme.badgeBg,
                      border: `1px solid ${currentTheme.badgeBorder}`,
                      color: currentTheme.badgeText,
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      margin: '12px 0',
                    }}
                  >
                    🏆 {cert.achievement}
                  </div>
                )}

                <p style={{ margin: '8px 0 0', fontSize: '1.02rem', color: currentTheme.subTextColor, lineHeight: 1.65 }}>
                  {cert.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" style={{ padding: '60px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <Briefcase size={28} style={{ color: currentTheme.accent }} />
            <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
              {lang === 'hi' ? 'अनुभव एवं शिक्षा' : 'Experience & Education'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            {timeline.map((item, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor={currentTheme.spotlight}
                gradientBorder={currentTheme.borderGradient}
                style={{
                  width: '100%',
                  padding: 'clamp(24px, 4vw, 36px)',
                  backgroundColor: currentTheme.cardBg,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${currentTheme.cardBorder}`,
                  borderRadius: '32px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  {idx === 0 ? <Briefcase size={22} style={{ color: currentTheme.accent }} /> : <GraduationCap size={22} style={{ color: currentTheme.accent }} />}
                  <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>{item.role}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: currentTheme.accent, fontWeight: 700 }}>
                  {item.organization} • {item.location} ({item.date})
                </p>
                <ul style={{ margin: '18px 0 0', paddingLeft: '22px', fontSize: '1rem', color: currentTheme.subTextColor, lineHeight: 1.7 }}>
                  {item.details.map((d, dIdx) => (
                    <li key={dIdx} style={{ marginBottom: '8px' }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" style={{ padding: '60px 0 100px' }}>
          <SpotlightCard
            spotlightColor={currentTheme.spotlight}
            gradientBorder={currentTheme.borderGradient}
            style={{
              width: '100%',
              padding: 'clamp(32px, 6vw, 64px)',
              backgroundColor: currentTheme.cardBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${currentTheme.cardBorder}`,
              borderRadius: '36px',
              boxShadow: '0 25px 50px -15px rgba(0,0,0,0.25)',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: currentTheme.pillBg, marginBottom: '20px' }}>
              <Mail size={32} style={{ color: currentTheme.accent }} />
            </div>
            <h2 style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800 }}>
              {lang === 'hi' ? 'आइए साथ मिलकर काम करें' : "Let's Connect"}
            </h2>
            <p style={{ margin: '16px auto 36px', fontSize: '1.08rem', color: currentTheme.subTextColor, maxWidth: '640px', lineHeight: 1.65 }}>
              {lang === 'hi'
                ? 'चाहे आपका कोई प्रश्न हो, प्रोजेक्ट आइडिया हो, या सिर्फ हैलो कहना चाहते हों, मेरा इनबॉक्स हमेशा खुला है। संपर्क करें!'
                : "Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!"}
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:pateldeepesh1408@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  backgroundColor: currentTheme.accent,
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  boxShadow: '0 10px 25px -5px rgba(244, 63, 94, 0.45)',
                }}
              >
                <Mail size={20} />
                <span>Email Me (pateldeepesh1408@gmail.com)</span>
              </a>

              <a
                href="https://www.linkedin.com/in/deepesh-patel-564b35398"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  backgroundColor: currentTheme.pillBg,
                  border: `1px solid ${currentTheme.pillBorder}`,
                  color: currentTheme.textColor,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                }}
              >
                <Globe size={20} style={{ color: '#0a66c2' }} />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/deepesh-45"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  backgroundColor: currentTheme.pillBg,
                  border: `1px solid ${currentTheme.pillBorder}`,
                  color: currentTheme.textColor,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                }}
              >
                <Globe size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </SpotlightCard>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            padding: '36px 0',
            borderTop: `1px solid ${currentTheme.cardBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            color: currentTheme.subTextColor,
            fontSize: '0.92rem',
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: currentTheme.textColor, fontSize: '1rem' }}>Deepesh Patel © 2026</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>AI & Machine Learning • Acropolis Institute of Technology & Research</p>
          </div>

          <button
            onClick={() => scrollToSection('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: currentTheme.pillBg,
              border: `1px solid ${currentTheme.pillBorder}`,
              color: currentTheme.textColor,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
            }}
          >
            <ChevronUp size={18} />
            <span>{lang === 'hi' ? 'ऊपर जाएं' : 'Back to Top'}</span>
          </button>
        </footer>
      </div>

      {/* Floating AI Chat Assistant */}
      <Chatbox currentTheme={currentTheme} lang={lang} />
    </div>
  )
}

export default App










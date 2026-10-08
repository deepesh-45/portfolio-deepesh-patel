import { useState, useRef, useEffect } from 'react'
import { Send, X } from 'lucide-react'

interface Message {
  role: 'assistant' | 'user'
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

interface KnowledgeTopic {
  id: string
  patterns: RegExp[]
  answerEn: (q: string) => string
  answerHi: (q: string) => string
}

const TOPICS: KnowledgeTopic[] = [
  // 1. Greetings
  {
    id: 'greeting',
    patterns: [
      /\b(hello|hi|hey|hiya|heyy|namaste|namaskar|namaskaram|pranam|greetings|good\s*(morning|afternoon|evening|day)|sup|yo|hola|ram\s*ram)\b/i,
    ],
    answerEn: () =>
      "Hello there! 👋 I am PRANA, Deepesh Patel's personal AI assistant.\n\nGreat to connect with you! I can tell you all about Deepesh's:\n• **Academic Background**: B.Tech in AI & ML at Acropolis Institute (7.96 CGPA)\n• **Distinctions**: NPTEL IIT Madras Course Topper (Top 2% · 83% score)\n• **Live ML Projects**: Reflect AI, Laptop Recommender, Books Recommender & Sortify\n• **Contact & Collaboration**: Direct email, phone, LinkedIn & resume\n\nWhat would you like to explore today?",
    answerHi: () =>
      "नमस्ते! 👋 मैं प्राण (PRANA AI) हूँ — दीपेश पटेल का पर्सनल एआई असिस्टेंट।\n\nआपसे मिलकर बहुत खुशी हुई! मैं आपको दीपेश के बारे में विस्तार से बता सकता हूँ:\n• **शैक्षणिक योग्यता**: एक्रोपोलिस इंस्टीट्यूट से बी.टेक एआई & एमएल (7.96 सीजीपीए)\n• **उपलब्धि**: NPTEL IIT मद्रास कोर्स टॉपर (Top 2% · 83% स्कोर)\n• **लाइव प्रोजेक्ट्स**: Reflect AI, Laptop Recommender, Books Recommender और Sortify\n• **संपर्क सूत्र**: ईमेल, फोन नंबर, लिंक्डइन और आधिकारिक रिज्यूमे\n\nआज आप क्या जानना चाहेंगे?",
  },

  // 2. How are you / Pleasantries
  {
    id: 'wellbeing',
    patterns: [
      /\b(how\s*are\s*you|how\s*r\s*u|how's\s*it\s*going|how\s*do\s*you\s*do|what's\s*up|whats\s*up|kya\s*haal|kaise\s*ho|sab\s*badhiya)\b/i,
    ],
    answerEn: () =>
      "I'm doing wonderful, thank you for asking! 😊 I'm right here in Deepesh's portfolio, ready to assist you. Are you interested in his machine learning projects, his academic journey at Acropolis Institute, or discussing a collaboration opportunity?",
    answerHi: () =>
      "मैं बहुत अच्छा हूँ, पूछने के लिए धन्यवाद! 😊 मैं दीपेश के पोर्टफोलियो में आपकी सहायता के लिए तैयार हूँ। क्या आप उनके मशीन लर्निंग प्रोजेक्ट्स, शैक्षणिक उपलब्धियों या सहयोग के बारे में चर्चा करना चाहते हैं?",
  },

  // 3. Who are you / Bot Identity / Help
  {
    id: 'bot_identity',
    patterns: [
      /\b(who\s*are\s*you|what\s*are\s*you|what\s*can\s*you\s*do|your\s*name|who\s*made\s*you|who\s*created\s*you|help|capabilities|aap\s*kaun\s*ho|kya\s*kar\s*sakte\s*ho)\b/i,
    ],
    answerEn: () =>
      "I am **PRANA AI** — Deepesh Patel's computational copilot and digital portfolio assistant! 🚀\n\nI have verified knowledge of Deepesh's background, including:\n1. **Academics**: B.Tech AI & ML at Acropolis Institute (2024–2028), 7.96 CGPA, and Class XII (85.4%).\n2. **Certifications**: NPTEL IIT Madras Topper (Top 2%), Infosys Python & AI Foundation Certifications.\n3. **Engineering Works**: Reflect AI (Gemini + Firestore), Laptop Recommender (Streamlit + Hugging Face), Books Recommender, and Sortify.\n4. **Profiles & Contact**: GitHub, LinkedIn, email (pateldeepesh1408@gmail.com), and direct phone (+91 8305756454).\n\nFeel free to ask me anything about his work!",
    answerHi: () =>
      "मैं **प्राण (PRANA AI)** हूँ — दीपेश पटेल का डिजिटल कोपायलट और पोर्टफोलियो असिस्टेंट! 🚀\n\nमुझे दीपेश के करियर और शैक्षणिक रिकॉर्ड की पूरी जानकारी है:\n1. **शिक्षा**: एक्रोपोलिस से बी.टेक एआई & एमएल (2024–2028, 7.96 सीजीपीए) और 12वीं (85.4%)।\n2. **प्रमाणपत्र**: NPTEL IIT मद्रास कोर्स टॉपर (Top 2%), इन्फोसिस पाइथन और एआई सर्टिफिकेशन्स।\n3. **प्रोजेक्ट्स**: Reflect AI, Laptop Recommender, Books Recommender और Sortify।\n4. **संपर्क**: ईमेल (pateldeepesh1408@gmail.com), फोन (+91 8305756454) और लिंक्डइन।\n\nआप मुझसे उनके काम के बारे में कोई भी प्रश्न पूछ सकते हैं!",
  },

  // 4. Who is Deepesh / Bio / Introduction
  {
    id: 'deepesh_bio',
    patterns: [
      /\b(who\s*is\s*deepesh|tell\s*me\s*about\s*deepesh|about\s*deepesh|introduce|introduction|bio|profile|deepesh\s*patel|deepesh\s*kaun\s*hai|parichay|background)\b/i,
    ],
    answerEn: () =>
      "**Deepesh Patel** is an AI & Machine Learning engineer and B.Tech student at **Acropolis Institute of Technology and Research**, Indore (August 2024 – August 2028), maintaining an impressive **7.96 CGPA**.\n\nHighlights of his journey:\n• **NPTEL IIT Madras Course Topper**: Scored 83% (Top 2%) in *Python for Data Science*.\n• **Proven Project Builder**: Created 4+ live ML and web systems including Reflect AI (with Gemini API) and Laptop Recommender (on Hugging Face).\n• **Leadership & Design**: Served as Technical Team Member & Visual Designer for IEEE ICIH 2025 international conference.\n• **Discipline**: Long-distance endurance runner and strategic problem solver.",
    answerHi: () =>
      "**दीपेश पटेल** एक्रोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च, इंदौर में आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग के बी.टेक छात्र हैं (अगस्त 2024 – अगस्त 2028), जिनका वर्तमान **सीजीपीए 7.96** है।\n\nउनकी मुख्य विशेषताएं:\n• **NPTEL IIT मद्रास टॉपर**: 'Python for Data Science' में 83% स्कोर के साथ टॉप 2% में।\n• **प्रोजेक्ट डेवलपर**: Reflect AI (Gemini API) और Laptop Recommender (Hugging Face) जैसे 4+ लाइव सिस्टम्स का निर्माण किया।\n• **नेतृत्व और डिज़ाइन**: IEEE ICIH 2025 में टेक्निकल टीम और विजुअल डिज़ाइनर के रूप में कार्य किया।\n• **अनुशासन**: लंबी दूरी की दौड़ और रणनीतिक समस्या-समाधान का नियमित अभ्यास।",
  },

  // 5. Education / Academics / CGPA / Grades
  {
    id: 'education',
    patterns: [
      /\b(education|college|acropolis|cgpa|gpa|degree|btech|b\.tech|school|12th|xii|percentage|marks|grades|academics|study|coursework|courses|dewas|vijay\s*jyoti)\b/i,
    ],
    answerEn: () =>
      "Here are Deepesh's verified academic credentials:\n\n🎓 **Bachelor of Technology — Artificial Intelligence & Machine Learning**\n• **Institution**: Acropolis Institute of Technology and Research, Indore, India\n• **Duration**: August 2024 – August 2028\n• **Current CGPA**: **7.96**\n• **Key Coursework**: Data Structures, Analysis of Algorithms, Operating Systems, Artificial Intelligence, Machine Learning, Networking, Databases.\n\n🏫 **Higher Secondary Education (Class XII)**\n• **Institution**: Vijay Jyoti Academy, Dewas, India (2024)\n• **Score**: **85.4%**",
    answerHi: () =>
      "दीपेश की सत्यापित शैक्षणिक पृष्ठभूमि:\n\n🎓 **बी.टेक — आर्टिफिशियल इंटेलिजेंस एंड मशीन लर्निंग**\n• **संस्थान**: एक्रोपोलिस इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड रिसर्च, इंदौर\n• **अवधि**: अगस्त 2024 – अगस्त 2028\n• **वर्तमान सीजीपीए**: **7.96**\n• **मुख्य विषय**: डेटा स्ट्रक्चर्स, एल्गोरिदम विश्लेषण, ऑपरेटिंग सिस्टम्स, एआई, मशीन लर्निंग, नेटवर्किंग, डेटाबेस।\n\n🏫 **हायर सेकेंडरी (कक्षा XII)**\n• **विद्यालय**: विजय ज्योति एकेडमी, देवास (2024)\n• **स्कोर**: **85.4%**",
  },

  // 6. Skills & Tech Stack
  {
    id: 'skills',
    patterns: [
      /\b(skills?|tech\s*stack|technologies|languages?|programming|tools?|frameworks?|libraries|python|c\+\+|java|machine\s*learning|data\s*science|scikit|pandas|numpy|docker|firestore|sql)\b/i,
    ],
    answerEn: () =>
      "Deepesh's technical capabilities include:\n\n💻 **Programming Languages**: Python, C, C++, Java, JavaScript, TypeScript, SQL, HTML5 & CSS3\n\n🧠 **Machine Learning & Data**: Scikit-Learn, Pandas, NumPy, Matplotlib, Seaborn, Cosine Similarity, Vector Embeddings, Predictive Modeling\n\n🛠️ **Cloud, Databases & Tooling**: Git & GitHub, Docker, Google Cloud Firestore, PostgreSQL, Streamlit, Hugging Face Spaces, Vercel\n\n⚡ **Core Strengths**: Fast learner, multitasking, technical documentation, analytical reasoning, and adaptive problem solving.",
    answerHi: () =>
      "दीपेश का तकनीकी कौशल संकलन:\n\n💻 **प्रोग्रामिंग भाषाएं**: Python, C, C++, Java, JavaScript, TypeScript, SQL, HTML5 & CSS3\n\n🧠 **मशीन लर्निंग & डेटा साइंस**: Scikit-Learn, Pandas, NumPy, Matplotlib, Seaborn, Cosine Similarity, प्रिडिक्टिव मॉडलिंग\n\n🛠️ **क्लाउड और टूल्स**: Git & GitHub, Docker, Google Cloud Firestore, PostgreSQL, Streamlit, Hugging Face, Vercel\n\n⚡ **सॉफ्ट स्किल्स**: त्वरित सीखने की क्षमता, समय प्रबंधन, विश्लेषणात्मक सोच और अनुकूलनीय समस्या समाधान।",
  },

  // 7. Reflect AI Project
  {
    id: 'project_reflect',
    patterns: [
      /\b(reflect|reflect\s*ai|journal|journaling|gemini|companion|wellness|mental)\b/i,
    ],
    answerEn: () =>
      "**Reflect AI: Your AI Companion** (June 2026)\n• **Domain**: Artificial Intelligence & Full-Stack Web Development\n• **Architecture**: Serverless journaling application built with JavaScript frameworks and Google Cloud Firestore.\n• **AI Capabilities**: Integrates the **Gemini API** to provide empathetic conversational support, guided reflection, stress relief, poetry generation, and prose refinement.\n• **Live Deployment**: [Open Reflect AI Web App](https://deepesh-45.github.io/Reflect-AI/)",
    answerHi: () =>
      "**Reflect AI: Your AI Companion** (जून 2026)\n• **फ़ील्ड**: आर्टिफिशियल इंटेलिजेंस और फुल-स्टैक वेब डेवलपमेंट\n• **तकनीक**: जावास्क्रिप्ट और गूगल क्लाउड फायरस्टोर पर आधारित सर्वरलेस जर्नलिंग ऐप।\n• **एआई क्षमता**: संवेदनशील मानसिक सहायता, तनाव राहत, कविता निर्माण और गद्य परिष्कार के लिए **Gemini API** का एकीकरण।\n• **लाइव लिंक**: [Reflect AI ऐप खोलें](https://deepesh-45.github.io/Reflect-AI/)",
  },

  // 8. Laptop Recommender Project
  {
    id: 'project_laptop',
    patterns: [
      /\b(laptop|laptop\s*recommender|streamlit|hugging\s*face|specs|specs\s*filter)\b/i,
    ],
    answerEn: () =>
      "**Laptop Recommender System** (February 2026)\n• **Domain**: Machine Learning & Web Deployment\n• **Tech Stack**: Python backend, Scikit-Learn, and an interactive Streamlit UI.\n• **Functionality**: Multi-criteria filtering logic that ranks and suggests laptops tailored to user budget, processing needs, and hardware specifications.\n• **Live Deployment**: [Hugging Face Space](https://deepesh-45-my-laptop.hf.space/)",
    answerHi: () =>
      "**Laptop Recommender System** (फ़रवरी 2026)\n• **फ़ील्ड**: मशीन लर्निंग और वेब डिप्लॉयमेंट\n• **तकनीक**: पाइथन, साइकिट-लर्न और स्ट्रीमलिट (Streamlit)।\n• **कार्यप्रणाली**: बजट, परफॉर्मेंस और हार्डवेयर स्पेसिफिकेशन्स के आधार पर उपयुक्त लैपटॉप की सिफारिश करने वाला एमएल मॉडल।\n• **लाइव लिंक**: [हगिंग फेस स्पेस पर देखें](https://deepesh-45-my-laptop.hf.space/)",
  },

  // 9. Books Recommender Project
  {
    id: 'project_books',
    patterns: [
      /\b(books?|book\s*recommender|cosine\s*similarity|reading|kaggle)\b/i,
    ],
    answerEn: () =>
      "**Books Recommender System** (January 2026)\n• **Domain**: Machine Learning & Data Analysis\n• **Tech Stack**: Python, Pandas, NumPy, and Scikit-Learn.\n• **Algorithm**: Content-based filtering trained on a Kaggle dataset. Employs text vectorization and **Cosine Similarity** to compute distance matrices and recommend books matching reader preferences.\n• **Repository**: [GitHub Repository](https://github.com/deepesh-45)",
    answerHi: () =>
      "**Books Recommender System** (जनवरी 2026)\n• **फ़ील्ड**: मशीन लर्निंग और डेटा विश्लेषण\n• **तकनीक**: पाइथन, पांडास, नम्पाय और कोसाइन सिमिलैरिटी।\n• **एल्गोरिदम**: कैगल डेटासेट पर ट्रेंड कंटेंट-बेस्ड फ़िल्टरिंग, जो पाठकों की रुचि के आधार पर संबंधित पुस्तकों का सटीक सुझाव देता है।\n• **गिटहब लिंक**: [गिटहब रिपॉजिटरी](https://github.com/deepesh-45)",
  },

  // 10. Sortify Project
  {
    id: 'project_sortify',
    patterns: [
      /\b(sortify|sorting|sorting\s*visualizer|algorithm\s*visualizer|bubble\s*sort|merge\s*sort|quick\s*sort)\b/i,
    ],
    answerEn: () =>
      "**Sortify: Sorting Visualizer** (May 2026)\n• **Domain**: Algorithms & Interactive Web Development\n• **Tech Stack**: Pure Vanilla HTML5, CSS3, and JavaScript.\n• **Features**: Real-time visual step-by-step rendering of classic sorting algorithms (Bubble Sort, Merge Sort, Quick Sort) with dynamic speed controls and array size adjustments.\n• **Live Deployment**: [Open Sortify Visualizer](https://sortify-silk.vercel.app/)",
    answerHi: () =>
      "**Sortify: Sorting Visualizer** (मई 2026)\n• **फ़ील्ड**: एल्गोरिदम और इंटरएक्टिव वेब डेवलपमेंट\n• **तकनीक**: शुद्ध HTML5, CSS3 और जावास्क्रिप्ट।\n• **फ़ीचर्स**: बबल सॉर्ट, मर्ज सॉर्ट और क्विक सॉर्ट का रीयल-टाइम विजुअलाइज़ेशन, डायनामिक स्पीड और ऐरे साइज़ नियंत्रण के साथ।\n• **लाइव लिंक**: [Sortify डेमो देखें](https://sortify-silk.vercel.app/)",
  },

  // 11. Projects Overview
  {
    id: 'projects_all',
    patterns: [
      /\b(projects?|portfolio|work|applications?|apps?|what\s*did\s*he\s*build|show\s*projects?|github\s*projects?)\b/i,
    ],
    answerEn: () =>
      "Deepesh has developed 4 featured projects spanning machine learning, NLP, and web engineering:\n\n1. **Reflect AI**: Mindful journaling app with Gemini API & Firestore ([Live](https://deepesh-45.github.io/Reflect-AI/))\n2. **Laptop Recommender**: Interactive ML hardware recommender on Hugging Face ([Live](https://deepesh-45-my-laptop.hf.space/))\n3. **Books Recommender**: Vector similarity matching using Pandas & Cosine Similarity ([GitHub](https://github.com/deepesh-45))\n4. **Sortify**: Interactive sorting algorithm visualizer with real-time controls ([Live](https://sortify-silk.vercel.app/))\n\nWould you like more details on any specific project?",
    answerHi: () =>
      "दीपेश ने मशीन लर्निंग, एनएलपी और वेब इंजीनियरिंग में 4 प्रमुख प्रोजेक्ट्स विकसित किए हैं:\n\n1. **Reflect AI**: जेमिनी एपीआई और फायरस्टोर आधारित जर्नलिंग ऐप ([लाइव](https://deepesh-45.github.io/Reflect-AI/))\n2. **Laptop Recommender**: स्ट्रीमलिट आधारित एमएल अनुशंसा ऐप ([हगिंग फेस](https://deepesh-45-my-laptop.hf.space/))\n3. **Books Recommender**: कोसाइन सिमिलैरिटी आधारित पुस्तक अनुशंसा सिस्टम ([गिटहब](https://github.com/deepesh-45))\n4. **Sortify**: रीयल-टाइम सॉर्टिंग एल्गोरिदम विजुअलाइज़र ([डेमो](https://sortify-silk.vercel.app/))\n\nक्या आप किसी विशेष प्रोजेक्ट के बारे में अधिक जानना चाहते हैं?",
  },

  // 12. Certifications / NPTEL / Infosys
  {
    id: 'certifications',
    patterns: [
      /\b(certifications?|certs?|nptel|iit|madras|topper|elite|top\s*2%|infosys|credentials?|awards?|achievement|achievements)\b/i,
    ],
    answerEn: () =>
      "Deepesh holds verified certifications in Data Science and AI:\n\n🏆 **Python for Data Science — NPTEL IIT Madras** (April 2026)\n• **Achievement**: **Course Topper (Top 2%)** with an **83% score** (Elite status).\n• **Key Skills**: Advanced Pandas manipulation, Matplotlib/Seaborn visualization, and Scikit-Learn predictive modeling.\n\n📜 **Python Foundation Certification — Infosys** (January 2026)\n• Mastered syntax, control flow, object-oriented programming (OOP), and algorithmic debugging.\n\n🧠 **Artificial Intelligence Foundation Certification — Infosys** (January 2026)\n• Covered regression models, supervised classification, neural network architectures, and industrial NLP.",
    answerHi: () =>
      "दीपेश के पास डेटा साइंस और एआई में सत्यापित प्रमाणपत्र हैं:\n\n🏆 **Python for Data Science — NPTEL IIT मद्रास** (अप्रैल 2026)\n• **उपलब्धि**: **कोर्स टॉपर (Top 2%)**, 83% स्कोर के साथ एलीट स्टेटस।\n• **कौशल**: पांडास डेटा मैनिपुलेशन, सीबॉर्न/मैटप्लॉटलिब विजुअलाइज़ेशन और साइकिट-लर्न मॉडलिंग।\n\n📜 **Python Foundation Certification — Infosys** (जनवरी 2026)\n• ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP), सिंटैक्स और एल्गोरिदम समस्या-समाधान।\n\n🧠 **Artificial Intelligence Foundation Certification — Infosys** (जनवरी 2026)\n• रिग्रेशन मॉडल्स, सुपरवाइज्ड क्लासिफिकेशन, न्यूरल नेटवर्क्स और एनएलपी।",
  },

  // 13. Volunteer Experience / IEEE ICIH
  {
    id: 'experience_volunteer',
    patterns: [
      /\b(experience|volunteer|volunteering|ieee|icih|conference|visual\s*designer|leadership|humanitarian)\b/i,
    ],
    answerEn: () =>
      "**IEEE International Conference on Innovate for Humanitarian (ICIH)**, Indore (November 2025)\n• **Role**: Technical Team Member & Visual Designer\n• **Technical Operations**: Managed presentation setups, oversaw international technical tracks, and streamlined research paper workflows for presenting delegates.\n• **Visual Design Identity**: Designed the complete visual identity, including official stage backdrops, promotional posters, speaker slide decks, and participant certificates.",
    answerHi: () =>
      "**IEEE International Conference on Innovate for Humanitarian (ICIH)**, इंदौर (नवंबर 2025)\n• **भूमिका**: टेक्निकल टीम मेंबर और विजुअल डिज़ाइनर\n• **तकनीकी संचालन**: प्रस्तुति संचालन, अंतर्राष्ट्रीय सत्रों के तकनीकी लॉजिस्टिक्स और शोध पत्र प्रस्तुतियों का प्रबंधन।\n• **विजुअल डिज़ाइन**: मुख्य बैकड्रॉप्स, प्रचार पोस्टर्स, स्पीकर प्रेजेंटेशन टेम्पलेट्स और प्रमाणपत्रों का संपूर्ण डिज़ाइन तैयार किया।",
  },

  // 14. Hobbies, Fitness & Interests
  {
    id: 'hobbies',
    patterns: [
      /\b(hobb(y|ies)|interests?|running|runner|marathon|fitness|endurance|games?|gaming|strategy|free\s*time|what\s*do\s*you\s*do\s*for\s*fun)\b/i,
    ],
    answerEn: () =>
      "Outside engineering, Deepesh pursues:\n• **Long-Distance Running**: Regular endurance training to cultivate discipline, consistency, and resilience outside academics.\n• **Analytical Strategy**: Engages in strategy-based gaming to hone real-time critical thinking and problem-solving skills.\n• **Independent Research**: Deep-dives into emerging AI architectures, open-source models, and computational research questions.",
    answerHi: () =>
      "इंजीनियरिंग के अतिरिक्त, दीपेश की गतिविधियां:\n• **लंबी दूरी की दौड़**: शारीरिक सहनशक्ति, निरंतरता और मानसिक अनुशासन के लिए नियमित अभ्यास।\n• **रणनीतिक खेल**: विश्लेषणात्मक तर्क और त्वरित समस्या-समाधान कौशल को निखारने के लिए।\n• **स्वतंत्र शोध**: नए एआई आर्किटेक्चर और ओपन-सोर्स मॉडल्स का निरंतर अन्वेषण।",
  },

  // 15. Contact / Hire / Links
  {
    id: 'contact',
    patterns: [
      /\b(contact|email|phone|mobile|call|hire|hiring|collaborat(e|ion)|linkedin|github|reach|mail|number|location|address|city|indore)\b/i,
    ],
    answerEn: () =>
      "You can get in touch with Deepesh directly through:\n\n📧 **Email**: [pateldeepesh1408@gmail.com](mailto:pateldeepesh1408@gmail.com)\n📱 **Phone**: +91 8305756454\n💼 **LinkedIn**: [linkedin.com/in/deepesh-patel-564b35398](https://www.linkedin.com/in/deepesh-patel-564b35398)\n🐙 **GitHub**: [github.com/deepesh-45](https://github.com/deepesh-45)\n📍 **Location**: Indore, Madhya Pradesh, India",
    answerHi: () =>
      "आप दीपेश से सीधे संपर्क कर सकते हैं:\n\n📧 **ई-मेल**: pateldeepesh1408@gmail.com\n📱 **फोन**: +91 8305756454\n💼 **लिंक्डइन**: [linkedin.com/in/deepesh-patel-564b35398](https://www.linkedin.com/in/deepesh-patel-564b35398)\n🐙 **गिटहब**: [github.com/deepesh-45](https://github.com/deepesh-45)\n📍 **स्थान**: इंदौर, मध्य प्रदेश, भारत",
  },

  // 16. Resume / CV
  {
    id: 'resume',
    patterns: [
      /\b(resume|cv|curriculum\s*vitae|pdf|download\s*resume|view\s*resume)\b/i,
    ],
    answerEn: () =>
      "You can view and download Deepesh's official resume here:\n\n📄 **[Download Deepesh Patel Resume (PDF)](/deepesh-patel-resume.pdf)**\n\nIt details his B.Tech in AI & ML (7.96 CGPA), NPTEL IIT Madras Topper credentials, 4+ live ML projects, Infosys certifications, and technical stack.",
    answerHi: () =>
      "आप दीपेश का आधिकारिक रिज्यूमे यहाँ देख और डाउनलोड कर सकते हैं:\n\n📄 **[दीपेश पटेल रिज्यूमे डाउनलोड करें (PDF)](/deepesh-patel-resume.pdf)**\n\nइसमें उनकी बी.टेक शिक्षा (7.96 सीजीपीए), NPTEL IIT मद्रास टॉपर उपलब्धि, लाइव एमएल प्रोजेक्ट्स और तकनीकी कौशल का पूरा विवरण है।",
  },

  // 17. Appreciation / Thanks
  {
    id: 'thanks',
    patterns: [
      /\b(thank\s*you|thanks|thx|appreciate|awesome|great|cool|nice|good\s*job|dhanyawad|shukriya)\b/i,
    ],
    answerEn: () =>
      "You're very welcome! 😊 It's my pleasure to help. Feel free to ask anything else about Deepesh's work, or connect directly with him at pateldeepesh1408@gmail.com!",
    answerHi: () =>
      "आपका बहुत-बहुत स्वागत है! 😊 सहायता करके मुझे प्रसन्नता हुई। दीपेश के प्रोजेक्ट्स या अनुभव के बारे में कोई अन्य जानकारी चाहिए तो बेझिझक पूछें!",
  },

  // 18. Farewell
  {
    id: 'farewell',
    patterns: [
      /\b(bye|goodbye|see\s*you|cya|take\s*care|alvida|tata|shubh\s*ratri)\b/i,
    ],
    answerEn: () =>
      "Goodbye! Have a fantastic day ahead! Feel free to return anytime or drop Deepesh a note at pateldeepesh1408@gmail.com. 👋",
    answerHi: () =>
      "अलविदा! आपका दिन बहुत शुभ हो। कभी भी वापस आकर चर्चा कर सकते हैं या दीपेश को pateldeepesh1408@gmail.com पर ईमेल लिख सकते हैं! 👋",
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
          ? 'नमस्ते! मैं प्राण (PRANA AI) हूँ — दीपेश पटेल का डिजिटल कोपायलट।\n\nआप मुझसे दीपेश की शिक्षा (7.96 सीजीपीए), आईआईटी मद्रास उपलब्धि, एमएल प्रोजेक्ट्स या संपर्क सूत्रों के बारे में कुछ भी पूछ सकते हैं।'
          : 'Namaskaram! I am PRANA AI — Deepesh Patel’s personal copilot.\n\nInquire freely about his machine learning projects, B.Tech studies (7.96 CGPA), NPTEL IIT Madras topper credentials, or how to collaborate!',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const findAnswer = (question: string): string => {
    const trimmed = question.trim()
    if (!trimmed) return ''

    // 1. Direct Pattern Matching across all topics
    for (const topic of TOPICS) {
      if (topic.patterns.some((pattern) => pattern.test(trimmed))) {
        return lang === 'hi' ? topic.answerHi(trimmed) : topic.answerEn(trimmed)
      }
    }

    // 2. Token Matching Fallback
    const words = trimmed.toLowerCase().split(/[\s,?!.]+/)
    for (const topic of TOPICS) {
      if (topic.patterns.some((p) => words.some((w) => w.length > 2 && p.test(w)))) {
        return lang === 'hi' ? topic.answerHi(trimmed) : topic.answerEn(trimmed)
      }
    }

    // 3. Intelligent, Natural Fallback with helpful suggestions
    return lang === 'hi'
      ? `धन्यवाद आपके प्रश्न के लिए! मैं दीपेश के बारे में सटीक जानकारी देने के लिए यहाँ हूँ।\n\nआप मुझसे निम्न विषयों के बारे में पूछ सकते हैं:\n• **शिक्षा और सीजीपीए**: एक्रोपोलिस इंस्टीट्यूट से बी.टेक एआई & एमएल (7.96 सीजीपीए)\n• **प्रमाणपत्र**: NPTEL IIT मद्रास टॉपर (Top 2% · 83%)\n• **प्रोजेक्ट्स**: Reflect AI, Laptop Recommender, Books Recommender, Sortify\n• **संपर्क**: pateldeepesh1408@gmail.com या +91 8305756454\n\nआप इनमें से क्या जानना चाहेंगे?`
      : `Thank you for your question! While I may not have exact details on that specific phrase, I can tell you all about Deepesh's verified background:\n\n• **Education & CGPA**: B.Tech AI & ML at Acropolis Institute (7.96 CGPA, 2024–2028)\n• **Certifications**: NPTEL IIT Madras Course Topper (Top 2% · 83%)\n• **Live ML Projects**: Reflect AI (Gemini API), Laptop Recommender (Hugging Face), Books Recommender & Sortify\n• **Direct Contact**: pateldeepesh1408@gmail.com or +91 8305756454\n\nFeel free to ask about any of these topics!`
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
      ? ['दीपेश का परिचय', 'प्रमुख प्रोजेक्ट्स', 'आईआईटी मद्रास उपलब्धि', 'बी.टेक सीजीपीए', 'संपर्क सूत्र']
      : ['Who is Deepesh?', 'Featured Projects', 'IIT Madras Distinction', 'B.Tech CGPA', 'Contact Details']

  return (
    <>
      {/* Standalone 3D AI Personal Assistant (Doubled size, sitting alone in the corner, animated saying hello) */}
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
          e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)'
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

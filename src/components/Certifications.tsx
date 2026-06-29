import React from 'react';

const certs = [
  {
    title: "Python for Data Science",
    issuer: "NPTEL — IIT Madras",
    date: "April '26",
    link: "https://drive.google.com/file/d/129esc7_P75SsjB8D_p7F77VLrfqwu9gl/view?usp=drivesdk",
    achievement: "Course Topper (Top 2%)",
    score: "83%",
    description: "Demonstrated proficiency in core data engineering tasks including advanced dataset manipulation with Pandas, statistical plotting with Matplotlib and Seaborn, and baseline predictive modeling with Scikit-Learn."
  },
  {
    title: "Python Foundation Certification",
    issuer: "Infosys",
    date: "January '26",
    link: "https://drive.google.com/file/d/1faWANaSfdHVw-NuoBNUGa8uKIgCTwtzb/view?usp=drivesdk",
    achievement: "",
    score: "",
    description: "Mastered foundational language syntax, control structures, and OOP principles. Applied algorithmic thinking and debugging practices to optimize script performance."
  },
  {
    title: "Artificial Intelligence Foundation",
    issuer: "Infosys",
    date: "January '26",
    link: "https://drive.google.com/file/d/1ZXgpFm-6zOqmFNNEhPzyS7yEOvrnaNBO/view?usp=drivesdk",
    achievement: "",
    score: "",
    description: "Gained a foundational understanding of machine learning branches, covering regression models, supervised classification workflows, neural network architectures, and NLP."
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-6 w-full max-w-4xl mx-auto relative z-10">
      <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3 justify-center">
        <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
        Certifications & Achievements
        <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <a 
            key={idx} 
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-[#06b6d4]/50 hover:-translate-y-2 transition-all"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-[#4cd7f6] transition-colors mb-2 leading-tight">
                {cert.title}
              </h3>
              <p className="text-sm font-semibold text-gray-400 mb-4">{cert.issuer} • {cert.date}</p>
              
              {cert.achievement && (
                <div className="inline-block px-3 py-1 bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  🏆 {cert.achievement}
                </div>
              )}
              
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {cert.description}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
              <span className="text-[#06b6d4] text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Certificate →
              </span>
              {cert.score && (
                <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">Score: {cert.score}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

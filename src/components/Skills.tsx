import React from 'react';

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C", "C++", "Java"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "React", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Tools & DBs",
    skills: ["Git", "GitHub", "Docker", "PostgreSQL", "Firestore"]
  },
  {
    title: "Core Competencies",
    skills: ["Machine Learning", "Data Analysis", "Adaptive Learning", "Time Management", "Problem Solving"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 w-full max-w-4xl mx-auto relative z-10">
      <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3 justify-center">
        <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
        Technical Skills
        <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-[#06b6d4]/30 transition-colors">
            <h3 className="text-xl font-semibold text-[#4cd7f6] mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-3 py-1 text-sm bg-[#031427] border border-white/10 text-gray-200 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

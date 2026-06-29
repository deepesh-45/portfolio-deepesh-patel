import React from 'react';

const timeline = [
  {
    role: "Technical Team Member & Visual Designer",
    organization: "IEEE International Conference on Innovate for Humanitarian (ICIH)",
    date: "November 2025",
    location: "Indore, India",
    details: [
      "Managed presentation setups, oversaw technical logistics for international tracks, and streamlined research paper workflows for presenting delegates.",
      "Designed the end-to-end visual assets for the conference, including official backdrops, promotional posters, speaker slide templates, and participant certificates."
    ]
  },
  {
    role: "B.Tech - Artificial Intelligence and Machine Learning",
    organization: "Acropolis Institute of Technology and Research",
    date: "Aug 2024 – Aug 2028",
    location: "Indore, India",
    details: [
      "CGPA: 7.96",
      "Courses: Operating Systems, Data Structures, Analysis Of Algorithms, Artificial Intelligence, Machine Learning, Networking, Databases"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 w-full max-w-4xl mx-auto relative z-10">
      <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
        Experience & Education
      </h2>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#06b6d4] before:via-white/10 before:to-transparent">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#031427] bg-[#06b6d4] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col mb-2">
                <span className="text-[#4cd7f6] font-semibold text-lg">{item.role}</span>
                <span className="text-gray-400 text-sm">{item.organization} | {item.location}</span>
                <span className="text-white/50 text-xs mt-1 bg-white/5 w-fit px-2 py-0.5 rounded">{item.date}</span>
              </div>
              <ul className="list-disc list-outside ml-4 mt-4 space-y-2 text-gray-300 text-sm">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

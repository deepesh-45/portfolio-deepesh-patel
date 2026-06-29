import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 w-full max-w-4xl mx-auto relative z-10">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
          About Me
        </h2>
        
        <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
          <p>
            I am a passionate AI & Machine Learning student at Acropolis Institute of Technology and Research, driven by curiosity to deep-dive into new tech concepts and explore spontaneous research questions.
          </p>
          <p>
            My approach to engineering combines analytical strategy with creative problem solving. Whether I'm building recommendation engines, integrating large language models, or designing visual assets, I focus on delivering high-quality, impactful solutions.
          </p>
          <p>
            Beyond code, I practice regular long-distance running to build discipline, consistency, and resilience, and engage in strategy-based games to keep my critical thinking sharp.
          </p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Mail, FileText } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 w-full max-w-4xl mx-auto relative z-10">
      <div className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_50%)] z-0"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a href="mailto:pateldeepesh1408@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white transition-all hover:border-[#06b6d4]/50">
              <Mail className="w-5 h-5 text-[#06b6d4]" />
              <span>Email Me</span>
            </a>
            <a href="https://linkedin.com/in/deepesh-patel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white transition-all hover:border-[#06b6d4]/50">
              <svg className="w-5 h-5 text-[#06b6d4] fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/deepesh-45" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white transition-all hover:border-[#06b6d4]/50">
              <svg className="w-5 h-5 text-[#06b6d4] fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
          </div>
          
          <div className="inline-block">
            <a href="/Deepesh_Resume.pdf" download className="group relative flex items-center gap-3 px-8 py-4 bg-[#06b6d4] hover:bg-[#4cd7f6] text-slate-900 font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <FileText className="w-6 h-6" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

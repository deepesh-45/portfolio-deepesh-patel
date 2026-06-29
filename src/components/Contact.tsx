import React from 'react';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';

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
              <Linkedin className="w-5 h-5 text-[#06b6d4]" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/deepesh-45" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white transition-all hover:border-[#06b6d4]/50">
              <Github className="w-5 h-5 text-[#06b6d4]" />
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

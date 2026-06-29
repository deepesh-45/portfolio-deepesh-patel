import React from 'react';
import Image from 'next/image';

const projects = [
  {
    title: "Books Recommender",
    category: "Machine Learning, Data Analysis",
    description: "Built a python-based book recommendation tool using a Kaggle dataset. Used Pandas and NumPy to clean the data, and used Cosine Similarity to calculate text vectors and match user preferences.",
    image: "/project_books.png",
    link: "https://github.com/deepesh-45", 
    date: "January '26"
  },
  {
    title: "Laptop Recommender System",
    category: "Machine Learning, Web Deployment",
    description: "Created a laptop recommendation application with a Python backend and an interactive Streamlit frontend. Built filtering logic to rank laptops based on user specs and deployed live on Hugging Face.",
    image: "/project_laptop.png", 
    link: "https://deepesh-45-my-laptop.hf.space/",
    date: "February '26"
  },
  {
    title: "Sortify: Sorting Visualizer",
    category: "Algorithms, Web Development",
    description: "Developed a web-based visualizer using vanilla HTML, CSS, and JavaScript to show how classic sorting algorithms (like Bubble, Merge, and Quick Sort) work in real time. Added a custom UI for speeds/sizes.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    link: "https://sortify-silk.vercel.app/",
    date: "May '26"
  },
  {
    title: "Reflect AI: Your AI Companion",
    category: "AI, Full-Stack",
    description: "Vibe-coded a serverless journaling web app using JavaScript frameworks and Firestore. Integrated the Gemini API to build a supportive AI companion for stress relief, alongside poetry generation tools.",
    image: "/project_reflect.png",
    link: "https://deepesh-45.github.io/Reflect-AI/",
    date: "June '26"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 w-full max-w-6xl mx-auto relative z-10">
      <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-[#06b6d4]"></span>
        Featured Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <a 
            key={idx} 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-[#06b6d4]/50 transition-all hover:-translate-y-1"
          >
            <div className="w-full h-48 relative bg-[#0a192f] flex items-center justify-center overflow-hidden">
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/20 to-[#031427] flex items-center justify-center">
                  <span className="text-[#06b6d4]/50 font-mono tracking-widest uppercase">{project.title}</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#4cd7f6] transition-colors">{project.title}</h3>
                <span className="text-xs text-gray-500 font-mono">{project.date}</span>
              </div>
              <p className="text-[#06b6d4] text-xs font-semibold mb-4 tracking-wider uppercase">{project.category}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

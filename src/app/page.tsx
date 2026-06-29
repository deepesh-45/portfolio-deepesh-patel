import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Chatbox from "@/components/Chatbox";
import Background3D from "@/components/Background3D";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-[#d3e4fe] font-sans selection:bg-[#06b6d4] selection:text-white pb-24">
      <Background3D />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Projects />
      <Contact />
      <Chatbox />
    </main>
  );
}

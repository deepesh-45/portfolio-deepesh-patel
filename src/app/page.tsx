import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#031427] text-[#d3e4fe] font-sans selection:bg-[#06b6d4] selection:text-white">
      <Hero />
      <About />
      <Skills />
      <Experience />
    </main>
  );
}

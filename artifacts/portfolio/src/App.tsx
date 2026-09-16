import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

// Apply dark class globally for dark-mode CSS variables
document.documentElement.classList.add("dark");

function App() {
  const [loading, setLoading] = useState(true);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll Progress Bar Animation
    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        }
      },
    });

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      scrollTrigger.kill();
    };
  }, [loading]);

  return (
    <div className="relative bg-background text-foreground min-h-screen">
      <div 
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-teal-500 via-yellow-500 to-red-500 z-[100] w-0"
      />
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="flex flex-col">
          <Navbar />
          <main>
            <div id="hero"><Hero /></div>
            <div id="about"><About /></div>
            <div id="skills"><Skills /></div>
            <div id="projects"><Projects /></div>
            <div id="journey"><Journey /></div>
            <div id="certifications"><Certifications /></div>
            <div id="contact"><Contact /></div>
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

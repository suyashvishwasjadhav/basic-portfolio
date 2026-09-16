import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SiPython, SiReact, SiDjango, SiFastapi, SiDocker, SiGooglecloud } from "react-icons/si";
import heroBg from "@assets/generated_videos/hero-bg-compressed.mp4";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });

      const words1 = line1Ref.current?.querySelectorAll(".word");
      const words2 = line2Ref.current?.querySelectorAll(".word");

      if (words1?.length) {
        tl.fromTo(
          words1,
          { y: 90, opacity: 0, rotateX: -50, skewY: 4 },
          { y: 0, opacity: 1, rotateX: 0, skewY: 0, duration: 1, stagger: 0.13, ease: "power4.out" },
          0
        );
      }
      if (words2?.length) {
        tl.fromTo(
          words2,
          { y: 90, opacity: 0, rotateX: -50, skewY: 4 },
          { y: 0, opacity: 1, rotateX: 0, skewY: 0, duration: 1, stagger: 0.13, ease: "power4.out" },
          0.3
        );
      }

      tl.fromTo(subRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        1.0
      );
      tl.fromTo(badgesRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        1.2
      );
      tl.fromTo(btnsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        1.35
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const badges = [
    { Icon: SiPython, name: "Python", color: "#3776AB" },
    { Icon: SiReact, name: "React", color: "#61DAFB" },
    { Icon: SiDjango, name: "Django", color: "#4CAF50" },
    { Icon: SiFastapi, name: "FastAPI", color: "#009688" },
    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
    { Icon: SiGooglecloud, name: "GCP", color: "#4285F4" },
  ];

  const makeLine = (text: string) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        className="word inline-block"
        style={{ marginRight: "0.3em" }}
      >
        {word}
      </span>
    ));

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroBg}
      />

      {/* Dark overlay so text pops */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />

      {/* Subtle teal vignette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(2,20,25,0.9), transparent)" }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-24">

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-display font-bold tracking-tight leading-[1.05] mb-6">
          <div ref={line1Ref} className="block text-white overflow-visible">
            {makeLine("FULL STACK DEVELOPER")}
          </div>
          <div
            ref={line2Ref}
            className="block overflow-visible"
            style={{
              background: "linear-gradient(90deg, #14b8a6 0%, #eab308 55%, #ef4444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {makeLine("& AI ENGINEER")}
          </div>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="text-base md:text-lg text-white/55 max-w-xl font-mono mb-8 opacity-0"
        >
          <span className="text-teal-400 mr-2">{">"}</span>
          Suyash Vishwas Jadhav &mdash; Building real-world systems powered by AI, cloud &amp; full stack engineering.
        </p>

        {/* Tech badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-2 mb-10 opacity-0">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-white/60 border border-white/10 bg-black/30 backdrop-blur-sm"
            >
              <badge.Icon style={{ color: badge.color }} />
              {badge.name}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={btnsRef} className="flex flex-col sm:flex-row items-center gap-4 opacity-0">
          <button
            onClick={() => scrollTo("#projects")}
            data-testid="button-view-projects"
            className="px-8 py-3.5 font-semibold text-sm rounded-sm border border-teal-500/60 text-teal-300 bg-teal-500/10 backdrop-blur-sm hover:bg-teal-500/25 transition-all hover:shadow-[0_0_28px_rgba(20,184,166,0.35)] flex items-center gap-2 group"
          >
            View Projects
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            data-testid="button-contact"
            className="px-8 py-3.5 text-sm font-semibold text-white/65 rounded-sm border border-white/15 backdrop-blur-sm hover:border-white/35 hover:bg-white/8 transition-all"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-mono">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 40] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-teal-400"
          />
        </div>
      </motion.div>
    </section>
  );
}

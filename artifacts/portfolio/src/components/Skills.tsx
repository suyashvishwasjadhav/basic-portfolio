import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { 
  SiPython, SiJavascript, SiReact, 
  SiDjango, SiFastapi, SiSpring, SiPostgresql, SiRedis, 
  SiDocker, SiGooglecloud, SiGithub, SiBlender 
} from "react-icons/si";

const SKILL_CATEGORIES = ["All", "Frontend", "Backend", "Databases", "AI/ML", "Cloud", "Tools"];

const SKILLS = [
  { name: "Python", category: "Backend", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", category: "Frontend", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML", category: "Frontend", icon: null, color: "#E34F26" },
  { name: "CSS", category: "Frontend", icon: null, color: "#1572B6" },
  { name: "React.js", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "Django", category: "Backend", icon: SiDjango, color: "#092E20" },
  { name: "FastAPI", category: "Backend", icon: SiFastapi, color: "#009688" },
  { name: "Spring Boot", category: "Backend", icon: SiSpring, color: "#6DB33F" },
  { name: "PostgreSQL", category: "Databases", icon: SiPostgresql, color: "#336791" },
  { name: "Redis", category: "Databases", icon: SiRedis, color: "#DC382D" },
  { name: "SQL", category: "Databases", icon: null, color: "#003B57" },
  { name: "Docker", category: "Cloud", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", category: "Cloud", icon: null, color: "#FF9900" },
  { name: "GCP", category: "Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "OCR", category: "AI/ML", icon: null, color: "#FF6F00" },
  { name: "LLMs", category: "AI/ML", icon: null, color: "#5B7FA6" },
  { name: "Computer Vision", category: "AI/ML", icon: null, color: "#D9572B" },
  { name: "GitHub", category: "Tools", icon: SiGithub, color: "#ffffff" },
  { name: "Blender", category: "Tools", icon: SiBlender, color: "#F5792A" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<gsap.core.Tween | null>(null);

  const filteredSkills = SKILLS.filter(
    skill => activeCategory === "All" || skill.category === activeCategory
  );

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block char-span">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useGSAP(() => {
    // Title character split animation
    gsap.fromTo(".char-span", 
      { rotateX: -90, opacity: 0, transformOrigin: "bottom center" },
      { 
        rotateX: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.03, 
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".skill-title",
          start: "top 80%",
        }
      }
    );

    // Reveal animation for other headers
    gsap.fromTo(".skill-reveal", 
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Skill cards entrance animation
    gsap.fromTo(".skill-card", 
      { y: 50, opacity: 0, scale: 0.92 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.06, 
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        }
      }
    );

    // Infinite Marquee
    marqueeRef.current = gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
    });
  }, { scope: containerRef });

  const handleMouseEnterCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector(".skill-icon");
    if (icon) {
      gsap.to(icon, { scale: 1.2, duration: 0.3 });
    }
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector(".skill-icon");
    if (icon) {
      gsap.to(icon, { scale: 1, duration: 0.3 });
    }
  };

  const handleMouseEnterMarquee = () => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, { timeScale: 0, duration: 0.5 });
    }
  };

  const handleMouseLeaveMarquee = () => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <section id="skills" ref={containerRef} className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <h2 className="skill-reveal text-sm font-mono text-secondary tracking-[0.2em] mb-4 uppercase">
          // Arsenal
        </h2>
        <h3 className="skill-title text-4xl md:text-5xl font-display font-bold mb-10 perspective-[1000px]">
          {splitText("Technical ")}
          <span className="text-gradient inline-block">
            {splitText("Capabilities")}
          </span>.
        </h3>

        {/* Category Tabs */}
        <div className="skill-reveal flex flex-wrap gap-3 mb-10">
          {SKILL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                activeCategory === category 
                ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(245,165,32,0.2)]" 
                : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]">
          {filteredSkills.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`}
              onMouseEnter={handleMouseEnterCard}
              onMouseLeave={handleMouseLeaveCard}
              className="skill-card glass-panel p-6 rounded-lg flex flex-col items-center justify-center gap-4 group hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
            >
              <div 
                className="skill-icon w-12 h-12 rounded-full bg-background flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors shadow-inner"
                style={{ boxShadow: `0 0 20px ${skill.color}20` }}
              >
                {skill.icon ? (
                  <skill.icon size={24} style={{ color: skill.color }} />
                ) : (
                  <span className="font-mono text-xs font-bold text-primary">TXT</span>
                )}
              </div>
              <div className="text-center">
                <h4 className="font-medium text-foreground">{skill.name}</h4>
                <p className="text-xs text-muted-foreground font-mono mt-1">{skill.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Marquee */}
      <div 
        className="absolute top-1/2 left-0 w-[200%] -translate-y-1/2 -rotate-3 opacity-5 pointer-events-auto z-[-1]"
        onMouseEnter={handleMouseEnterMarquee}
        onMouseLeave={handleMouseLeaveMarquee}
      >
        <div className="marquee-inner flex gap-8 whitespace-nowrap">
          {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-display font-bold uppercase text-transparent stroke-text" style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}>
              {skill.name} • 
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

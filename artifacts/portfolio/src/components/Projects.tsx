import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const PROJECTS = [
  {
    num: "01",
    title: "ALMS",
    subtitle: "Automated Learning Management System",
    description: "An AI-powered education platform that automates assignment evaluation. It uses OCR to extract handwritten text, evaluates answers against rubrics using LLMs, allows document Q&A via RAG, and proctors tests with face and gaze detection computer vision models.",
    tech: ["Django", "React.js", "PostgreSQL", "GCP", "OCR", "LLMs", "Docker"],
    link: "https://alms.vercel.app",
    color: "var(--primary)"
  },
  {
    num: "02",
    title: "ShieldSentinel",
    subtitle: "Security Scanning Dashboard",
    description: "A comprehensive vulnerability scanning orchestration platform. Integrates DAST, SAST, and Semgrep tools, processes scans via background workers (Redis/Celery), and provides a real-time WebSocket collaborative environment for security code review.",
    tech: ["FastAPI", "React.js", "PostgreSQL", "Redis", "Docker", "WebSockets"],
    link: "https://shield-sentinel.vercel.app",
    color: "var(--secondary)"
  },
  {
    num: "03",
    title: "TicketHub",
    subtitle: "Microservices Support Platform",
    description: "A scalable customer support ticket management system built on a microservices architecture. Features automated ticket routing, AI-assisted reply suggestions for executives, and a Spring Cloud API Gateway for seamless REST API routing.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Maven", "Microservices"],
    link: "#",
    color: "var(--accent)"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shimmerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(".projects-heading",
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      
      const isEven = i % 2 === 0;
      gsap.fromTo(card,
        { x: isEven ? -80 : 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );

      const number = numberRefs.current[i];
      if (number) {
        gsap.fromTo(number,
          { opacity: 0.05 },
          {
            opacity: 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    const inner = innerRefs.current[index];
    const shimmer = shimmerRefs.current[index];
    if (!card || !inner) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; // max 8deg
    const rotateY = ((x - centerX) / centerX) * 8; // max 8deg

    gsap.to(inner, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out"
    });

    if (shimmer) {
      const mx = (x / rect.width) * 100;
      const my = (y / rect.height) * 100;
      shimmer.style.setProperty("--mx", `${mx}%`);
      shimmer.style.setProperty("--my", `${my}%`);
      gsap.to(shimmer, { opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = (index: number) => {
    const inner = innerRefs.current[index];
    const shimmer = shimmerRefs.current[index];
    if (inner) {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    }
    if (shimmer) {
      gsap.to(shimmer, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <section id="projects" ref={containerRef} className="py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20">
          <h2 className="projects-heading text-sm font-mono text-primary tracking-[0.2em] mb-4 uppercase">
            // Selected Works
          </h2>
          <h3 className="projects-heading text-4xl md:text-6xl font-display font-bold max-w-2xl">
            Building the <span className="text-gradient">Future</span>, One System at a Time.
          </h3>
        </div>

        <div className="space-y-24">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.num}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="project-card relative w-full rounded-2xl glass-panel p-8 md:p-12 border-card-border overflow-hidden group"
              style={{ perspective: "1200px" }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Shimmer effect */}
              <div 
                ref={(el) => { shimmerRefs.current[index] = el; }}
                className="absolute inset-0 pointer-events-none opacity-0 z-0"
                style={{ 
                  background: "radial-gradient(circle 400px at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.06), transparent)" 
                }}
              ></div>

              {/* Animated background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-3xl rounded-full"
                style={{ background: `radial-gradient(circle at center, ${project.color}, transparent 60%)` }}
              ></div>

              <div 
                ref={(el) => { innerRefs.current[index] = el; }}
                className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Number & Title */}
                <div className="lg:col-span-5 flex flex-col items-start" style={{ transform: "translateZ(50px)" }}>
                  <span 
                    ref={(el) => { numberRefs.current[index] = el; }}
                    className="text-6xl md:text-8xl font-display font-bold text-muted/30 mb-2"
                  >
                    {project.num}
                  </span>
                  <h4 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm font-mono text-secondary uppercase tracking-widest mb-6">
                    {project.subtitle}
                  </p>
                  
                  <div className="flex gap-4 mt-auto">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(245,165,32,0.2)]"
                    >
                      Live Demo <FiExternalLink />
                    </a>
                    <a 
                      href="#"
                      className="flex items-center justify-center w-12 h-12 border border-border text-foreground hover:text-primary hover:border-primary rounded-sm transition-colors"
                    >
                      <FiGithub size={20} />
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 flex flex-col gap-6" style={{ transform: "translateZ(30px)" }}>
                  <div className="bg-background/50 p-6 rounded-lg border border-border backdrop-blur-md">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-mono text-muted-foreground mb-3">TECHNOLOGIES</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-card border border-border rounded-full text-xs font-mono text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

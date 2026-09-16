import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const EVENTS = [
  { year: "2020-21", title: "CBSE 10th", desc: "Lakshya School, Andhra Pradesh" },
  { year: "2022-23", title: "HSC (PCM+CS)", desc: "Dyanpuspa, Navi Mumbai" },
  { year: "2023-Present", title: "B.Tech Computer Technology", desc: "RATAN TATA MAHARASHTRA STATE SKILLS UNIVERSITY (CGPA: 7.5)" },
  { year: "July 2024", title: "HTML & CSS Certification", desc: "Foundation of web development" },
  { year: "Aug 2024", title: "Databases Certification", desc: "SQL, PostgreSQL, Redis" },
  { year: "Feb 2025", title: "Artificial Intelligence Cert.", desc: "Core AI concepts and algorithms" },
  { year: "April 2025", title: "Cloud Computing Cert.", desc: "AWS, GCP deployment and architecture" },
  { year: "Dec 2025", title: "Deep Learning Cert.", desc: "Neural networks, Computer Vision, NLP" },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [svgHeight, setSvgHeight] = useState(1000);

  useEffect(() => {
    const updateHeight = () => {
      if (timelineRef.current) {
        setSvgHeight(timelineRef.current.offsetHeight);
      }
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, []);

  useGSAP(() => {
    // Title animation
    gsap.fromTo(".journey-heading",
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );

    // SVG Line drawing
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1,
        }
      });
    }

    // Nodes animation
    const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
    nodes.forEach((node) => {
      const pingRing = node.querySelector(".ping-ring");
      const content = node.closest('.relative')?.querySelector('.content-box');
      const yearBadge = node.closest('.relative')?.querySelector('.year-badge');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top 80%",
        }
      });

      tl.fromTo(node,
        { scale: 0, opacity: 0, boxShadow: "0 0 0 rgba(139, 92, 246, 0)" },
        {
          scale: 1, opacity: 1, boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
          duration: 0.5,
          ease: "back.out(2)",
        }
      );
      
      if (pingRing) {
        tl.to(pingRing, {
          scale: 2.5,
          opacity: 0,
          repeat: -1,
          duration: 1.8,
          ease: "power2.out",
          startAt: { opacity: 0.8, scale: 1 }
        }, "-=0.2");
      }

      if (content) {
        tl.fromTo(content,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=1.5"
        );
      }

      if (yearBadge) {
        tl.fromTo(yearBadge,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.4"
        );
      }
    });

  }, { scope: containerRef, dependencies: [svgHeight] });

  return (
    <section id="journey" ref={containerRef} className="py-20 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="journey-heading text-sm font-mono text-secondary tracking-[0.2em] mb-4 uppercase">
            // Timeline
          </h2>
          <h3 className="journey-heading text-4xl md:text-5xl font-display font-bold">
            The <span className="text-gradient">Evolution</span>.
          </h3>
        </div>

        <div ref={timelineRef} className="timeline-container relative max-w-4xl mx-auto py-10">
          {/* Center line for desktop */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-[1px]"></div>
          
          {/* Animated SVG Path for glow effect */}
          <svg className="absolute left-6 md:left-1/2 top-0 bottom-0 w-4 h-full -translate-x-[8px] pointer-events-none z-10" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              d={`M 8 0 L 8 ${svgHeight}`} 
              stroke="url(#gradient)" 
              strokeWidth="4" 
              fill="none" 
              className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-12">
            {EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className={`timeline-node absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-secondary z-20 -translate-x-[7px] ${isEven ? 'left-node' : 'right-node'}`}>
                    <div className="ping-ring absolute rounded-full border-2 border-secondary inset-[-4px] opacity-0"></div>
                  </div>
                  
                  {/* Content Box */}
                  <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                    <div className="content-box glass-panel p-6 rounded-lg border-border hover:border-secondary/50 transition-colors">
                      <span className="year-badge inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-mono rounded-full mb-3">
                        {event.year}
                      </span>
                      <h4 className="text-xl font-display font-bold text-foreground mb-2">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.desc}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

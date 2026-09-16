import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Parallax background text
    gsap.to(".parallax-bg-text", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    tl.fromTo(".about-heading", 
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" }
    );

    // Individual ScrollTrigger for paragraphs
    gsap.utils.toArray<HTMLElement>(".about-text").forEach((text, i) => {
      gsap.fromTo(text, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.9, 
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stat cards with perspective and rotateY
    gsap.fromTo(".stat-card",
      { x: 60, opacity: 0, rotateY: 15 },
      { 
        x: 0, 
        opacity: 1, 
        rotateY: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stat-card-wrapper",
          start: "top 80%",
        }
      }
    );

    // Counter animation
    const stats = gsap.utils.toArray(".stat-num");
    stats.forEach((stat: any) => {
      const target = parseFloat(stat.getAttribute("data-target"));
      gsap.to(stat, {
        innerHTML: target,
        duration: 2.5,
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-32 relative z-10 overflow-hidden">
      {/* Parallax Ghost Text */}
      <div 
        className="parallax-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-[-1] whitespace-nowrap"
        style={{
          fontSize: "10vw",
          fontWeight: 900,
          opacity: 0.04,
          WebkitTextStroke: "1px currentColor",
          color: "transparent",
        }}
      >
        SUYASH JADHAV
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-7">
            <h2 className="about-heading text-sm font-mono text-primary tracking-[0.2em] mb-4 uppercase">
              // Identity
            </h2>
            <h3 className="about-heading text-4xl md:text-5xl font-display font-bold mb-8">
              Engineering the <span className="text-gradient">Intersection</span> of Code and Intelligence.
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p className="about-text">
                I am a Full Stack Developer & AI Engineer passionate about building systems that don't just work, but think. My expertise lies in bridging the gap between robust backend architectures, dynamic frontend interfaces, and applied artificial intelligence.
              </p>
              <p className="about-text">
                From integrating LLMs and OCR to deploying computer vision models on the cloud, I thrive on solving complex problems with rapid prototyping and scalable design. 
              </p>
              <div className="about-text glass-panel p-4 rounded-md inline-block mt-4">
                <p className="font-mono text-sm">
                  <span className="text-secondary mr-2">Location:</span> Navi Mumbai, India
                  <br/>
                  <span className="text-secondary mr-2">Education:</span> B.Tech Computer Technology
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center gap-6 stat-card-wrapper" style={{ perspective: "1000px" }}>
            <div className="stat-card glass-panel p-8 rounded-lg border-l-2 border-l-primary relative overflow-hidden group glow-hover">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/20 transition-all duration-500"></div>
              <h4 className="text-5xl font-display font-bold text-foreground mb-2 flex items-baseline">
                <span className="stat-num" data-target="3">0</span>
                <span className="text-primary text-2xl ml-1">+</span>
              </h4>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">Major Projects</p>
            </div>

            <div className="stat-card glass-panel p-8 rounded-lg border-l-2 border-l-secondary relative overflow-hidden group glow-hover">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] group-hover:bg-secondary/20 transition-all duration-500"></div>
              <h4 className="text-5xl font-display font-bold text-foreground mb-2 flex items-baseline">
                <span className="stat-num" data-target="5">0</span>
              </h4>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">Certifications</p>
            </div>

            <div className="stat-card glass-panel p-8 rounded-lg border-l-2 border-l-accent relative overflow-hidden group glow-hover">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] group-hover:bg-accent/20 transition-all duration-500"></div>
              <h4 className="text-5xl font-display font-bold text-foreground mb-2 flex items-baseline">
                <span className="stat-num" data-target="1">0</span>
                <span className="text-accent text-2xl ml-1">+</span>
              </h4>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">Years Experience</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

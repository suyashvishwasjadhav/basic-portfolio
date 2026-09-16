import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiAward } from "react-icons/fi";

const CERTS = [
  { title: "Deep Learning", date: "Dec 2025", color: "var(--primary)" },
  { title: "Cloud Computing", date: "April 2025", color: "var(--accent)" },
  { title: "Artificial Intelligence", date: "Feb 2025", color: "var(--secondary)" },
  { title: "Databases", date: "Aug 2024", color: "var(--primary)" },
  { title: "HTML & CSS", date: "July 2024", color: "var(--muted-foreground)" },
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".cert-heading",
      { y: 40, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );

    gsap.fromTo(".cert-card",
      { rotateX: -90, opacity: 0, transformOrigin: "top center" },
      {
        rotateX: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".certs-grid", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border pb-6">
          <div>
            <h2 className="cert-heading text-sm font-mono text-accent tracking-[0.2em] mb-4 uppercase">
              // Validation
            </h2>
            <h3 className="cert-heading text-4xl font-display font-bold">
              Certifications.
            </h3>
          </div>
        </div>

        <div className="certs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "800px" }}>
          {CERTS.map((cert, index) => (
            <div 
              key={index} 
              className="cert-card relative glass-panel p-6 rounded-lg overflow-hidden group hover:border-transparent transition-colors"
            >
              {/* Hover gradient border replacement */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
                style={{ padding: '1px', background: `linear-gradient(135deg, ${cert.color}, transparent)` }}
              >
                <div className="w-full h-full bg-card rounded-lg"></div>
              </div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="mt-1 p-3 rounded-full bg-background border border-border group-hover:border-transparent transition-colors">
                  <FiAward size={24} style={{ color: cert.color }} />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{cert.date}</p>
                  <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cert.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

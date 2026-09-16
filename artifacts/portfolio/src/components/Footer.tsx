import { useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".footer-content > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        }
      }
    );
  }, { scope: footerRef });

  const handleArrowEnter = () => {
    gsap.to(arrowRef.current, {
      y: -4,
      duration: 0.3,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  };

  const handleArrowLeave = () => {
    gsap.killTweensOf(arrowRef.current);
    gsap.to(arrowRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power1.out"
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative border-t border-border py-12 overflow-hidden">
      <div className="footer-content container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-2xl font-display font-bold tracking-tighter text-foreground"
          >
            SJ
          </motion.div>
          <div className="h-6 w-[1px] bg-border"></div>
          <span className="text-sm text-muted-foreground font-mono">
            Suyash Vishwas Jadhav
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <FiGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/suyashvishwasjadhav" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <FiLinkedin size={20} />
          </a>
          <a href="mailto:suyash.13kd@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <FiMail size={20} />
          </a>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Suyash Vishwas Jadhav. Built with passion.
          </p>
          <button 
            onClick={scrollToTop}
            onMouseEnter={handleArrowEnter}
            onMouseLeave={handleArrowLeave}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-all"
            aria-label="Scroll to top"
          >
            <div ref={arrowRef}>
              <FiArrowUp />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}

import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiMapPin, FiPhone, FiLinkedin, FiSend } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const underlineRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const magneticButtonRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const headingWords = "Let's Build Together.".split(" ");

  useGSAP(() => {
    // Word split animation
    gsap.fromTo(".contact-heading-word",
      { y: 60, opacity: 0, skewY: 3 },
      {
        y: 0, opacity: 1, skewY: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        }
      }
    );

    // Contact info items animation
    gsap.fromTo(".contact-info-item",
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info-container",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  const handleFieldFocus = (field: string) => {
    setIsFocused(field);
    const underline = underlineRefs.current[field];
    if (underline) {
      gsap.to(underline, { scaleX: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleFieldBlur = (field: string) => {
    setIsFocused(null);
    const underline = underlineRefs.current[field];
    if (underline) {
      gsap.to(underline, { scaleX: 0, duration: 0.3 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = magneticButtonRef.current;
    const btn = buttonRef.current;
    if (!wrapper || !btn) return;

    const rect = wrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * 0.35;
    const y = (e.clientY - centerY) * 0.35;

    gsap.to(btn, {
      x: gsap.utils.clamp(-10, 10, x),
      y: gsap.utils.clamp(-10, 10, y),
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    const btn = buttonRef.current;
    if (btn) {
      const originalContent = btn.innerHTML;
      btn.innerHTML = '<span class="flex items-center gap-2">Sent Successfully <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg></span>';
      setTimeout(() => {
        setFormState({ name: "", email: "", message: "" });
        btn.innerHTML = originalContent;
      }, 3000);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 relative z-10 overflow-hidden">
      {/* Abstract background */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-[-1]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3 z-[-1]"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h2 className="text-sm font-mono text-primary tracking-[0.2em] mb-4 uppercase">
              // Initiate Comm-Link
            </h2>
            <h3 ref={headingRef} className="text-5xl md:text-7xl font-display font-bold mb-8 flex flex-wrap gap-x-4">
              {headingWords.map((word, i) => (
                <span key={i} className="contact-heading-word inline-block">
                  {word === "Together." ? <span className="text-gradient">Together.</span> : word}
                </span>
              ))}
            </h3>
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              Whether you have a specific project in mind, need an AI integration, or just want to explore possibilities — my inbox is always open.
            </p>

            <div className="contact-info-container space-y-6">
              <a href="mailto:suyash.13kd@gmail.com" className="contact-info-item flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group w-fit">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                  <FiMail size={20} />
                </div>
                <span className="font-mono">suyash.13kd@gmail.com</span>
              </a>
              
              <a href="https://linkedin.com/in/suyashvishwasjadhav" target="_blank" rel="noopener noreferrer" className="contact-info-item flex items-center gap-4 text-muted-foreground hover:text-secondary transition-colors group w-fit">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/10 transition-all">
                  <FiLinkedin size={20} />
                </div>
                <span className="font-mono">linkedin.com/in/suyashvishwasjadhav</span>
              </a>

              <div className="contact-info-item flex items-center gap-4 text-muted-foreground w-fit">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                  <FiPhone size={20} />
                </div>
                <span className="font-mono">+91 9182081829</span>
              </div>

              <div className="contact-info-item flex items-center gap-4 text-muted-foreground w-fit">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                  <FiMapPin size={20} />
                </div>
                <span className="font-mono">Navi Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-2xl border-card-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              
              <div className="space-y-8">
                {/* Name */}
                <div className="relative">
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    onFocus={() => handleFieldFocus('name')}
                    onBlur={() => handleFieldBlur('name')}
                    className="w-full bg-transparent border-b-2 border-border py-3 outline-none text-foreground font-medium transition-colors focus:border-primary peer placeholder-transparent"
                    placeholder="Name"
                  />
                  <div 
                    ref={(el) => { underlineRefs.current['name'] = el; }}
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-primary scale-x-0 origin-left"
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-0 font-mono text-sm transition-all pointer-events-none ${
                      isFocused === 'name' || formState.name 
                      ? "-top-4 text-primary text-xs" 
                      : "top-3 text-muted-foreground"
                    }`}
                  >
                    NAME
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={() => handleFieldBlur('email')}
                    className="w-full bg-transparent border-b-2 border-border py-3 outline-none text-foreground font-medium transition-colors focus:border-secondary peer placeholder-transparent"
                    placeholder="Email"
                  />
                  <div 
                    ref={(el) => { underlineRefs.current['email'] = el; }}
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-secondary scale-x-0 origin-left"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-0 font-mono text-sm transition-all pointer-events-none ${
                      isFocused === 'email' || formState.email 
                      ? "-top-4 text-secondary text-xs" 
                      : "top-3 text-muted-foreground"
                    }`}
                  >
                    EMAIL ADDRESS
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    onFocus={() => handleFieldFocus('message')}
                    onBlur={() => handleFieldBlur('message')}
                    className="w-full bg-transparent border-b-2 border-border py-3 outline-none text-foreground font-medium transition-colors focus:border-accent peer placeholder-transparent resize-none"
                    placeholder="Message"
                  ></textarea>
                  <div 
                    ref={(el) => { underlineRefs.current['message'] = el; }}
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-accent scale-x-0 origin-left"
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 font-mono text-sm transition-all pointer-events-none ${
                      isFocused === 'message' || formState.message 
                      ? "-top-4 text-accent text-xs" 
                      : "top-3 text-muted-foreground"
                    }`}
                  >
                    MESSAGE
                  </label>
                </div>

                <div 
                  ref={magneticButtonRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="pt-4"
                >
                  <button 
                    ref={buttonRef}
                    type="submit"
                    className="submit-btn w-full py-4 bg-foreground text-background font-bold uppercase tracking-wider relative overflow-hidden group rounded-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <span className="flex items-center justify-center gap-2 relative z-10 group-hover:text-white transition-colors">
                      Send Message <FiSend />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

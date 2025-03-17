import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Parallax effect for image
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setMousePosition({ x, y });
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#1a2b4b]/10 rounded-full blur-[10rem] opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/6 w-[450px] h-[450px] bg-[#30175f]/5 rounded-full blur-[10rem] opacity-15"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/80 mb-4">
              About Me
            </h2>
            <div className="separator-line"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <div 
              ref={imageRef}
              className={`relative card-3d transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
              }}
            >
              <div className="neon-glow">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00e1d9]/30 via-[#a097c2]/20 to-[#30175f]/30 blur-md opacity-60"></div>
                <div className="crystal-card p-1 relative">
                  <div className="overflow-hidden rounded-lg h-full">
                    <img 
                      src="/about-image.jpg" 
                      alt="Sophie coding" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="absolute -bottom-3 -right-3 crystal-glass backdrop-blur-md rounded-full p-2 shadow-xl border border-white/10">
                <div className="flex space-x-2">
                  <a 
                    href="https://github.com/sophiemartin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crystal-button h-8 w-8 rounded-full flex items-center justify-center p-0"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/sophiemartin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crystal-button h-8 w-8 rounded-full flex items-center justify-center p-0"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a 
                    href="https://twitter.com/sophiemartin_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crystal-button h-8 w-8 rounded-full flex items-center justify-center p-0"
                    aria-label="Twitter"
                  >
                    <Twitter size={14} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className={`space-y-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="floating-element">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00e1d9]/20 via-[#a097c2]/20 to-[#30175f]/20 blur-md opacity-60"></div>
                <div className="crystal-card p-6 relative">
                  <p className="mb-4 text-white/80">
                    Hello! I'm <span className="text-white font-medium">Sophie Martin</span>, a passionate front-end developer and UI/UX designer with a keen eye for creating beautiful, intuitive digital experiences.
                  </p>
                  <p className="mb-4 text-white/80">
                    With over 5 years of experience in the industry, I specialize in building responsive web applications using modern frameworks like React, Next.js and Vue. I love working at the intersection of design and development, creating interfaces that are both aesthetically pleasing and highly functional.
                  </p>
                  <p className="text-white/80">
                    When I'm not coding, you'll find me exploring the latest design trends, contributing to open-source projects, or hiking in the mountains with my dog Max.
                  </p>
                </div>
              </div>
              
              <div className="floating-element">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#30175f]/20 via-[#a097c2]/20 to-[#00e1d9]/20 blur-md opacity-60"></div>
                <div className="crystal-card p-6 relative">
                  <h3 className="font-display font-semibold text-lg mb-4">Key Skills</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Languages & Frameworks</h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00e1d9] rounded-full mr-2"></span>
                          JavaScript / TypeScript
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#a097c2] rounded-full mr-2"></span>
                          React / Next.js
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#30175f] rounded-full mr-2"></span>
                          HTML5 / CSS3 / SASS
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Design & Tools</h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#00e1d9] rounded-full mr-2"></span>
                          Figma / Adobe XD
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#a097c2] rounded-full mr-2"></span>
                          Tailwind CSS
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-[#30175f] rounded-full mr-2"></span>
                          Git / GitHub
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      asChild
                      className="crystal-button relative group"
                    >
                      <a 
                        href="/resume.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Resume
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

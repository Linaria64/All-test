import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay for the animation to look better
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background very subtle */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ultra subtle orbs - barely visible but creating depth */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-[#1a2b4b]/10 rounded-full blur-[10rem] opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/6 w-[450px] h-[450px] bg-[#30175f]/5 rounded-full blur-[10rem] opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-[#0d1321]/10 rounded-full blur-[10rem] -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="relative crystal-glow">
            {/* Glow effect around profile image */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00e1d9]/30 via-[#a097c2]/20 to-[#30175f]/30 blur-md"></div>
            <div className="crystal-glass rounded-full p-0.5 relative border border-white/10">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-[#0d1321] overflow-hidden">
                <img 
                  src="/profile-image.jpg" 
                  alt="Sophie Martin" 
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
            </div>
          </div>
          
          <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
                Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a097c2] to-[#00e1d9]/80">Sophie Martin</span>
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-white/80">
              Front-end Developer & UI/UX Designer
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg">
              Creating beautiful, responsive, and user-friendly web experiences 
              with modern technologies and clean code.
            </p>
          </div>
          
          <div className={`flex flex-wrap gap-4 justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg" 
              className="crystal-glow relative group bg-[#30175f]/60 hover:bg-[#30175f]/80 transition-all duration-300"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="crystal-glass border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
          
          <button
            onClick={scrollToAbout}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors duration-300 animate-pulse"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="h-7 w-7" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

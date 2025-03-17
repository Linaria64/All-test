import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SectionNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Use useMemo to avoid recreating the arrays on each render
  const sections = useMemo(() => ["home", "about", "projects", "skills", "contact"], []);
  const sectionLabels = useMemo(() => ({
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    skills: "Compétences",
    contact: "Contact"
  }), []);

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentSectionIndex(i);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const navigateToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      const sectionId = sections[index];
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth"
        });
      }
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      <div className="glass py-4 px-6 rounded-xl flex flex-col items-center space-y-3 shadow-xl border border-white/30">
        {sections.map((section, index) => {
          const isActive = currentSectionIndex === index;
          const isLast = index === sections.length - 1;
          
          return (
            <div key={section} className="w-full">
              <button
                className={cn(
                  "w-56 py-3 px-5 rounded-lg relative overflow-hidden transition-all duration-300 text-left font-medium shadow-lg group",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-accent text-white translate-y-[-2px] scale-105"
                    : "bg-white/20 hover:bg-white/30 text-white/90 hover:text-white hover:translate-y-[-2px]"
                )}
                onClick={() => navigateToSection(index)}
                aria-label={`Go to ${section} section`}
              >
                <span className="relative z-10 flex items-center justify-between">
                  <span>{sectionLabels[section as keyof typeof sectionLabels]}</span>
                  {!isLast && (
                    <ChevronRight className={cn(
                      "h-5 w-5 transition-transform", 
                      isActive ? "text-white" : "text-white/70"
                    )} />
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className={cn(
                  "absolute bottom-0 left-0 h-[3px] bg-accent",
                  isActive ? "w-full" : "w-0 group-hover:w-full",
                  "transition-all duration-300"
                )}></span>
              </button>
              
              {!isLast && (
                <div className="h-2 w-1 mx-auto my-1 bg-white/30 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionNavigation;

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, User, FolderOpen, 
  BarChart2, Mail
} from "lucide-react";
import { motion } from "framer-motion";

const ModernNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");
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

  // Define section icons
  const sectionIcons = useMemo(() => ({
    home: <Home size={isMobile ? 18 : 20} />,
    about: <User size={isMobile ? 18 : 20} />,
    projects: <FolderOpen size={isMobile ? 18 : 20} />,
    skills: <BarChart2 size={isMobile ? 18 : 20} />,
    contact: <Mail size={isMobile ? 18 : 20} />
  }), [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={cn(
      "fixed z-50 left-0 right-0 mx-auto",
      isMobile ? "bottom-6" : "top-6",
      "w-fit"
    )}>
      <motion.div 
        className={cn(
          "flex items-center justify-center py-2 px-4 gap-4",
          "bg-gradient-to-r from-[#1a2b4b]/20 via-[#0d1321]/50 to-[#30175f]/20",
          "shadow-lg backdrop-blur-md rounded-full border border-white/5"
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {sections.map((section, index) => {
          const isActive = activeSection === section;
          
          return (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={cn(
                "relative p-2 rounded-full transition-all duration-200",
                "hover:bg-white/10 focus:outline-none",
                isActive 
                  ? "text-white" 
                  : "text-white/70 hover:text-white/90"
              )}
              title={sectionLabels[section as keyof typeof sectionLabels]}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect for active icon */}
              {isActive && (
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/30 to-[#1a2b4b]/30 rounded-full blur-sm"
                  layoutId="activeIconGlow"
                />
              )}
              
              {/* Active indicator ring */}
              {isActive && (
                <motion.span 
                  className="absolute inset-0 rounded-full border-2 border-[#a097c2]/50"
                  layoutId="activeIconRing"
                />
              )}
              
              {/* Icon */}
              <span className="relative z-10">
                {sectionIcons[section as keyof typeof sectionIcons]}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ModernNavigation; 
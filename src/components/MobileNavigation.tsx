
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, User, FolderOpen, BarChart2, Mail } from "lucide-react";

const MobileNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const sections = ["home", "about", "projects", "skills", "contact"];
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
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass shadow-lg">
      <div className="flex justify-around py-3">
        {[
          { id: "home", label: "Home", icon: <Home size={20} /> },
          { id: "about", label: "About", icon: <User size={20} /> },
          { id: "projects", label: "Projects", icon: <FolderOpen size={20} /> },
          { id: "skills", label: "Skills", icon: <BarChart2 size={20} /> },
          { id: "contact", label: "Contact", icon: <Mail size={20} /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "flex flex-col items-center space-y-1 px-2",
              activeSection === item.id ? "text-accent" : "text-white/70"
            )}
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;

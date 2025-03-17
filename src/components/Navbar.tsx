
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      setScrolled(window.scrollY > 20);
      
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
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
      scrolled ? "glass shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="text-2xl font-display font-bold text-white"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          Portfolio
        </a>
        
        <div className="hidden md:flex space-x-8">
          {["home", "about", "projects", "skills", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={cn(
                "nav-item",
                activeSection === section && "nav-item-active"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="glass-button">
            <span className="sr-only">Menu</span>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

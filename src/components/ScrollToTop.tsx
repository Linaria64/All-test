import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }
  
  return (
    <Button
      className={cn(
        "fixed z-40 shadow-lg flex items-center justify-center transition-all duration-300",
        isMobile 
          ? "bottom-20 right-4 h-10 w-10 rounded-full glass border border-white/20" // Position above mobile navigation
          : "bottom-28 right-10 h-12 w-12 rounded-xl bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b] hover:translate-y-[-2px]" // 3D look for desktop
      )}
      size="icon"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className={cn(
        "h-5 w-5",
        !isMobile && "text-white"
      )} />
      <span className={cn(
        "absolute inset-0 rounded-xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity",
        isMobile && "hidden"
      )}></span>
    </Button>
  );
};

export default ScrollToTop;

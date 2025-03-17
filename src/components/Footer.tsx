import { Github, Linkedin, Twitter, Camera, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-4 mt-12 border-t border-white/10 relative overflow-hidden">
      {/* Background harmonisé avec le reste du site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1321]/50 via-[#30175f]/10 to-transparent"></div>
        
        {/* Orbes subtiles */}
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-[#1a2b4b]/15 rounded-full blur-[6rem] opacity-30"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#30175f]/10 rounded-full blur-[8rem] opacity-20"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a 
              href="#home" 
              className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b]/80"
            >
              Sophie Martin
            </a>
            <p className="text-sm text-white/60 mt-1">
              Front-end Developer & UI Designer
            </p>
          </div>
          
          <div className="text-sm text-white/60 flex items-center">
            <span>
              &copy; {currentYear}
            </span>
            <span className="mx-1 inline-flex items-center">
              Made with <Heart size={14} className="mx-1 text-[#a097c2] animate-pulse" /> in Paris
            </span>
          </div>
          
          <div className="mt-6 md:mt-0 flex space-x-3">
            <a 
              href="https://github.com/sophiemartin"
              target="_blank"
              rel="noopener noreferrer"
              className="glass h-9 w-9 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://linkedin.com/in/sophiemartin"
              target="_blank"
              rel="noopener noreferrer"
              className="glass h-9 w-9 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="https://twitter.com/sophiemartin_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="glass h-9 w-9 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="https://instagram.com/sophiemartin.photo"
              target="_blank"
              rel="noopener noreferrer"
              className="glass h-9 w-9 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
              aria-label="Instagram"
            >
              <Camera size={16} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <div className="mb-4 md:mb-0">
            <nav className="flex space-x-6">
              <a href="#home" className="hover:text-[#a097c2] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#a097c2] transition-colors">About</a>
              <a href="#projects" className="hover:text-[#a097c2] transition-colors">Projects</a>
              <a href="#skills" className="hover:text-[#a097c2] transition-colors">Skills</a>
              <a href="#contact" className="hover:text-[#a097c2] transition-colors">Contact</a>
            </nav>
          </div>
          
          <div>
            <p>
              <a href="/privacy" className="hover:text-[#a097c2] transition-colors mr-4">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#a097c2] transition-colors">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Camera } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorative elements harmonisés avec le reste du site */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient harmonisé - plus subtil avec des tons bleu foncé et violet léger */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#0d1321]/50 via-[#30175f]/20 to-transparent"></div>
        
        {/* Colored orbs avec des couleurs plus douces */}
        <div className="absolute bottom-1/5 right-1/4 w-96 h-96 bg-[#1a2b4b]/20 rounded-full blur-[7rem] opacity-40"></div>
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-[#30175f]/15 rounded-full blur-[7rem] opacity-30"></div>
        <div className="absolute top-2/3 left-1/2 w-[30rem] h-[30rem] bg-[#0d1321]/25 rounded-full blur-[7rem] -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#30175f]/80 to-white/90 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b]/80 mx-auto rounded-full"></div>
          <p className="text-white/70 max-w-xl mx-auto mt-4">
            Have a project in mind or want to discuss a collaboration? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <div className={`relative transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/20 to-[#1a2b4b]/30 blur-md opacity-60"></div>
            <div className="glass p-6 rounded-xl backdrop-blur-md bg-[#0d1321]/30 border border-white/10 relative h-full flex flex-col">
              <h3 className="text-xl font-display mb-6 text-[#a097c2]">Contact Information</h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full glass flex items-center justify-center flex-shrink-0 bg-[#1a2b4b]/30">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <a 
                      href="mailto:contact@sophiemartin.dev" 
                      className="hover:text-[#a097c2] transition-colors"
                    >
                      contact@sophiemartin.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full glass flex items-center justify-center flex-shrink-0 bg-[#1a2b4b]/30">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Phone</p>
                    <p>+33 6 12 34 56 78</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full glass flex items-center justify-center flex-shrink-0 bg-[#1a2b4b]/30">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Location</p>
                    <p>Paris, France</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <h4 className="text-lg mb-4 font-medium">Connect With Me</h4>
                <div className="flex space-x-3">
                  <a 
                    href="https://github.com/sophiemartin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/sophiemartin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="https://twitter.com/sophiemartin_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                  <a 
                    href="https://instagram.com/sophiemartin.photo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#1a2b4b]/40 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Camera size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/20 to-[#1a2b4b]/30 blur-md opacity-60"></div>
            <div className="glass p-6 rounded-xl backdrop-blur-md bg-[#0d1321]/30 border border-white/10 relative">
              <h3 className="text-xl font-display mb-6 text-[#a097c2]">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    className="glass border-white/20 focus:border-[#a097c2]/60 bg-black/10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="glass border-white/20 focus:border-[#a097c2]/60 bg-black/10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    className="glass border-white/20 focus:border-[#a097c2]/60 bg-black/10 min-h-[140px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className={`relative w-full overflow-hidden group bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b] hover:from-[#30175f] hover:via-[#1a2b4b] hover:to-[#30175f] transition-all duration-500 ${isSubmitting ? 'opacity-80' : ''}`}
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

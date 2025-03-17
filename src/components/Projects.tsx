import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink?: string;
  repoLink?: string;
  featured: boolean;
}

const projectData: Project[] = [
  {
    id: 1,
    title: "Wavelength",
    description: "A music streaming platform with advanced audio visualizations and personalized recommendations using machine learning.",
    image: "/projects/wavelength.jpg",
    tags: ["React", "TypeScript", "Web Audio API", "TensorFlow.js"],
    liveLink: "https://wavelength-music.com",
    repoLink: "https://github.com/sophiemartin/wavelength",
    featured: true
  },
  {
    id: 2,
    title: "Nomad Navigator",
    description: "A digital nomad's companion app with location-based coworking spaces, cost of living data, and community features.",
    image: "/projects/nomad.jpg",
    tags: ["Next.js", "MongoDB", "MapBox", "Tailwind CSS"],
    liveLink: "https://nomad-navigator.vercel.app",
    repoLink: "https://github.com/sophiemartin/nomad-navigator",
    featured: true
  },
  {
    id: 3,
    title: "Moodboard AI",
    description: "An AI-powered design tool that generates color palettes and moodboards based on text descriptions and visual references.",
    image: "/projects/moodboard.jpg",
    tags: ["React", "OpenAI API", "Canvas API", "Firebase"],
    liveLink: "https://moodboard-ai.web.app",
    repoLink: "https://github.com/sophiemartin/moodboard-ai",
    featured: true
  },
  {
    id: 4,
    title: "Culinary Compass",
    description: "A recipe discovery app with ingredient tracking, meal planning features, and nutritional information.",
    image: "/projects/culinary.jpg",
    tags: ["Vue.js", "Supabase", "Vite", "Nutrition API"],
    liveLink: "https://culinary-compass.app",
    featured: false
  },
  {
    id: 5,
    title: "Dev Portfolio Template",
    description: "An open-source glass-morphism styled portfolio template for developers with customizable sections.",
    image: "/projects/portfolio.jpg",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    repoLink: "https://github.com/sophiemartin/dev-portfolio",
    featured: false
  },
  {
    id: 6,
    title: "Eco Tracker",
    description: "An environmental impact calculator to help users track and reduce their carbon footprint.",
    image: "/projects/eco.jpg",
    tags: ["React Native", "D3.js", "Firebase"],
    liveLink: "https://eco-tracker.io",
    repoLink: "https://github.com/sophiemartin/eco-tracker",
    featured: false
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 10;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div 
      ref={cardRef}
      className="group card-3d neon-glow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)` 
          : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
      }}
    >
      <div className="relative h-full transform-style">
        {/* Gradient background glow */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00e1d9]/40 via-[#a097c2]/20 to-[#30175f]/40 blur-md opacity-60 transition-all duration-500 group-hover:opacity-90 group-hover:scale-[1.02] animate-subtle-pulse"></div>
        
        <div className="crystal-card relative flex flex-col h-full overflow-hidden">
          <div className="relative overflow-hidden h-48">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1321]/60 z-10"></div>
            
            {/* Project image */}
            <img 
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 blur-[1px]' : 'scale-[1.02]'}`}
            />
            
            {/* Overlay with links on hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-b from-[#30175f]/70 to-[#0d1321]/80 flex items-center justify-center gap-4 transition-all duration-500 z-20 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {project.liveLink && (
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crystal-button flex items-center gap-1 px-3 py-2 rounded-md hover:bg-[#30175f]/70 transition-all duration-300"
                >
                  <Eye size={16} className="animate-pulse-slow" />
                  <span>Live Demo</span>
                </a>
              )}
              
              {project.repoLink && (
                <a 
                  href={project.repoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="crystal-button flex items-center gap-1 px-3 py-2 rounded-md hover:bg-[#30175f]/70 transition-all duration-300"
                >
                  <Github size={16} className="animate-pulse-slow" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">{project.title}</h3>
            <p className="text-white/75 text-sm mb-4 flex-grow">{project.description}</p>
            
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#1a2b4b]/40 to-[#30175f]/40 text-white/90 backdrop-blur-sm border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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
  
  const showMoreProjects = () => {
    setVisibleProjects(projectData.length);
  };
  
  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80">
              Projects
            </span>
          </h2>
          <div className="separator-line mb-8"></div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Exploring the intersection of design and functionality through these featured projects. Each one represents my passion for creating intuitive, beautiful digital experiences.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectData.slice(0, visibleProjects).map((project) => (
            <div 
              key={project.id} 
              className={`transform transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(project.id % 3) * 200}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {visibleProjects < projectData.length && (
          <div className="text-center mt-14">
            <Button
              onClick={showMoreProjects}
              className="crystal-button relative group neon-glow"
            >
              <span className="relative z-10">Show More Projects</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef, useState } from "react";
import { Laptop, Server, Paintbrush, Award } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  [category: string]: {
    icon: React.ReactNode;
    skills: Skill[];
  }
}

const skillsData: SkillGroup = {
  "Frontend Development": {
    icon: <Laptop size={24} className="text-primary" />,
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Next.js", level: 80 }
    ]
  },
  "Backend Development": {
    icon: <Server size={24} className="text-accent" />,
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "GraphQL", level: 65 },
      { name: "Firebase", level: 80 }
    ]
  },
  "Design & Tools": {
    icon: <Paintbrush size={24} className="text-[#8A2BE2]" />,
    skills: [
      { name: "Figma", level: 85 },
      { name: "Adobe XD", level: 75 },
      { name: "Git", level: 90 },
      { name: "Jest", level: 70 }
    ]
  }
};

// Define skill icons map for use throughout the component
const skillIconMap: Record<string, React.ReactNode> = {
  "React": <span className="text-[#61DBFB]">⚛️</span>,
  "TypeScript": <span className="text-[#3178C6]">TS</span>,
  "Tailwind CSS": <span className="text-[#38B2AC]">🌊</span>,
  "Next.js": <span>🔄</span>,
  "Node.js": <span className="text-[#68A063]">🟢</span>,
  "Express": <span>🚂</span>,
  "GraphQL": <span className="text-[#E535AB]">◼️</span>,
  "Firebase": <span className="text-[#FFCA28]">🔥</span>,
  "Figma": <span className="text-[#F24E1E]">🎨</span>,
  "Adobe XD": <span className="text-[#FF61F6]">✏️</span>,
  "Git": <span className="text-[#F05032]">📂</span>,
  "Jest": <span className="text-[#C21325]">✓</span>
};

// Simple skill item with icon and name
const SimpleSkillItem = ({ name, icon }: { name: string; icon: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1a2b4b]/20 transition-colors">
      <div className="h-8 w-8 rounded-full glass flex items-center justify-center bg-[#1a2b4b]/20">
        {icon}
      </div>
      <span className="text-white/80">{name}</span>
    </div>
  );
};

const SkillCard = ({ 
  category, 
  skillsData, 
  isVisible, 
  delay 
}: { 
  category: string; 
  skillsData: { icon: React.ReactNode; skills: Skill[] }; 
  isVisible: boolean;
  delay: number;
}) => {
  return (
    <div 
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/20 to-[#1a2b4b]/30 blur-md opacity-60"></div>
      <div className="glass p-6 rounded-xl backdrop-blur-md bg-[#0d1321]/30 border border-white/10 relative h-full">
        <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/10">
          <div className="glass h-10 w-10 rounded-full flex items-center justify-center bg-[#1a2b4b]/30">
            {skillsData.icon}
          </div>
          <h3 className="text-xl font-display">{category}</h3>
        </div>
        <div className="space-y-2">
          {skillsData.skills.map((skill) => (
            <SimpleSkillItem 
              key={skill.name} 
              name={skill.name} 
              icon={skillIconMap[skill.name] || skillsData.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
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

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background très sobre */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbes ultra subtils - à peine visibles mais créant une profondeur */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-[#1a2b4b]/10 rounded-full blur-[10rem] opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/6 w-[450px] h-[450px] bg-[#30175f]/5 rounded-full blur-[10rem] opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-[#0d1321]/10 rounded-full blur-[10rem] -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/80 mb-4">
            My Skills
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b]/80 mx-auto rounded-full"></div>
          <p className="text-white/70 max-w-xl mx-auto mt-4">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(skillsData).map(([category, data], index) => (
            <SkillCard 
              key={category} 
              category={category} 
              skillsData={data} 
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
        
        {/* Additional skill highlights */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/20 to-[#1a2b4b]/30 blur-md opacity-60"></div>
            <div className="glass p-6 rounded-xl backdrop-blur-md bg-[#0d1321]/30 border border-white/10 relative">
              <h3 className="text-xl font-display mb-4 text-[#a097c2]">Additional Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Responsive Design', 'UI/UX Principles', 'Performance Optimization', 
                  'Accessibility', 'SEO', 'Progressive Web Apps', 'Git/GitHub', 
                  'Webpack', 'Vite', 'Jest', 'REST APIs', 'GraphQL'
                ].map(skill => (
                  <span 
                    key={skill} 
                    className="glass px-3 py-1 rounded-full text-sm bg-[#1a2b4b]/20 border border-white/10 text-white/80 hover:bg-[#30175f]/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

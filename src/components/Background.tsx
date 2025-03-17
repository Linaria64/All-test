import { useEffect, useState } from 'react';

interface BackgroundProps {
  children?: React.ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = '/images/crystal-background.jpg';
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background image with gradient overlay */}
      <div 
        className={`fixed inset-0 z-[-2] bg-background transition-opacity duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(13, 19, 33, 0.75), rgba(13, 19, 33, 0.65)), 
            url('/images/crystal-background.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Complex patterns and floating elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.5
          }}
        />
        
        {/* Floating crystal elements */}
        <div className="absolute top-1/4 left-1/5 w-56 h-56 bg-[#00e1d9]/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[3px] animate-float opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#30175f]/10 rounded-[30%_70%_50%_50%/50%_50%_70%_30%] blur-[3px] animate-float-slow opacity-20"></div>
        <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-[#a097c2]/10 rounded-[50%_50%_70%_30%/30%_50%_50%_70%] blur-[3px] animate-float-medium opacity-20"></div>
        
        {/* Glowing dots */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, index) => (
            <div 
              key={index}
              className="absolute w-2 h-2 rounded-full bg-white/30 animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
};

export default Background; 

import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Eclipse shape - dark circle with glowing ring */}
      <div className="absolute inset-0 rounded-full bg-eclipse-900 border-2 border-eclipse-400 shadow-[0_0_15px_rgba(155,135,245,0.6)] animate-pulse-glow"></div>
      
      {/* Corona effect */}
      <div className="absolute inset-[-15%] opacity-20 bg-gradient-radial from-eclipse-orange to-transparent rounded-full"></div>
      
      {/* Small stars */}
      <div className="star h-[2px] w-[2px] top-[20%] left-[25%] opacity-80"></div>
      <div className="star h-[1px] w-[1px] top-[30%] right-[20%] opacity-60"></div>
      <div className="star h-[1px] w-[1px] bottom-[25%] left-[35%] opacity-70"></div>
      <div className="star h-[2px] w-[2px] bottom-[15%] right-[30%] opacity-90"></div>
    </div>
  );
};

export default Logo;

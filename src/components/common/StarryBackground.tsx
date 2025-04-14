
import React, { useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkDuration: number;
}

const StarryBackground: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector('.stars-container');
    if (!container) return;
    
    // Clear existing stars
    container.innerHTML = '';
    
    // Create stars
    const numberOfStars = 150;
    const stars: Star[] = [];
    
    for (let i = 0; i < numberOfStars; i++) {
      const star: Star = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3, // Between 0.3 and 1
        blinkDuration: Math.random() * 5 + 3, // Between 3s and 8s
      };
      
      stars.push(star);
      
      // Create the star element
      const starElement = document.createElement('div');
      starElement.className = 'star';
      starElement.style.left = `${star.x}%`;
      starElement.style.top = `${star.y}%`;
      starElement.style.width = `${star.size}px`;
      starElement.style.height = `${star.size}px`;
      starElement.style.opacity = star.opacity.toString();
      starElement.style.animation = `pulse-glow ${star.blinkDuration}s infinite ease-in-out`;
      starElement.style.animationDelay = `${Math.random() * 5}s`; // Random delay
      
      container.appendChild(starElement);
    }
    
    // Simulate shooting stars occasionally
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'absolute bg-white';
      
      // Random position from top-left quarter
      const startX = Math.random() * 30;
      const startY = Math.random() * 30;
      
      shootingStar.style.left = `${startX}%`;
      shootingStar.style.top = `${startY}%`;
      shootingStar.style.width = '1px';
      shootingStar.style.height = '1px';
      shootingStar.style.boxShadow = '0 0 3px 2px rgba(255, 255, 255, 0.4)';
      
      // Animate diagonally across
      shootingStar.animate([
        { 
          left: `${startX}%`, 
          top: `${startY}%`,
          opacity: 0,
          width: '1px',
          height: '1px'
        },
        { 
          opacity: 1,
          width: '2px',
          height: '2px',
          offset: 0.1
        },
        { 
          left: `${startX + 50}%`, 
          top: `${startY + 50}%`,
          opacity: 0,
          width: '1px',
          height: '1px'
        }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      }).onfinish = () => {
        shootingStar.remove();
      };
      
      container.appendChild(shootingStar);
    };
    
    // Create a shooting star randomly
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to create one
        createShootingStar();
      }
    }, 4000);
    
    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);
  
  return <div className="stars-container"></div>;
};

export default StarryBackground;

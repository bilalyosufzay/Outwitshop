
import { useEffect, useState } from 'react';

export const Confetti = () => {
  const [confetti, setConfetti] = useState<{ x: number; y: number; color: string; size: number; angle: number }[]>([]);

  useEffect(() => {
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    const particleCount = 150;
    const newConfetti = [];
    
    for (let i = 0; i < particleCount; i++) {
      newConfetti.push({
        x: Math.random() * 100,
        y: Math.random() * -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        angle: Math.random() * 360
      });
    }
    
    setConfetti(newConfetti);
    
    const interval = setInterval(() => {
      setConfetti(prev => prev.map(particle => ({
        ...particle,
        y: particle.y + 2 + Math.random() * 3,
        angle: particle.angle + Math.random() * 10
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((particle, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size / 2}px`,
            transform: `rotate(${particle.angle}deg)`,
            opacity: (100 - particle.y) / 100,
            transition: 'top 0.5s linear'
          }}
        />
      ))}
    </div>
  );
};

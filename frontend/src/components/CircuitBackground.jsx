import React, { useEffect, useRef } from 'react';
import './CircuitBackground.css';

const CircuitBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#00d4ff' : '#a855f7',
      };
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
      }
    };

    const drawCircuit = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 0, 0,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(0.5, 'transparent');
      gradient.addColorStop(1, 'rgba(168, 85, 247, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circuit lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let i = 0; i < 8; i++) {
        const y = (canvas.height / 8) * i + (Date.now() * 0.0005 + i * 100) % (canvas.height / 4);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let i = 0; i < 6; i++) {
        const x = (canvas.width / 6) * i + Math.sin(Date.now() * 0.001 + i) * 20;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw connection nodes
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
          const x = (canvas.width / 6) * i + Math.sin(Date.now() * 0.001 + i) * 20;
          const y = (canvas.height / 8) * j + (Date.now() * 0.0005 + j * 100) % (canvas.height / 4);
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
          ctx.fill();
          
          // Glow effect
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
          glowGradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      }

      // Draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connections to nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw glowing orbs
      const time = Date.now() * 0.001;
      const orb1 = {
        x: canvas.width * 0.2 + Math.sin(time * 0.5) * 50,
        y: canvas.height * 0.3 + Math.cos(time * 0.3) * 30,
      };
      const orb2 = {
        x: canvas.width * 0.8 + Math.cos(time * 0.4) * 40,
        y: canvas.height * 0.6 + Math.sin(time * 0.6) * 40,
      };

      // Orb 1
      const orb1Gradient = ctx.createRadialGradient(orb1.x, orb1.y, 0, orb1.x, orb1.y, 150);
      orb1Gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      orb1Gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.1)');
      orb1Gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = orb1Gradient;
      ctx.beginPath();
      ctx.arc(orb1.x, orb1.y, 150, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2
      const orb2Gradient = ctx.createRadialGradient(orb2.x, orb2.y, 0, orb2.x, orb2.y, 120);
      orb2Gradient.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
      orb2Gradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.1)');
      orb2Gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = orb2Gradient;
      ctx.beginPath();
      ctx.arc(orb2.x, orb2.y, 120, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(drawCircuit);
    };

    resize();
    initParticles();
    drawCircuit();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="circuit-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default CircuitBackground;

import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
  effect: 'particles' | 'petals' | 'sparkles' | 'none';
  accentColor: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  fadeSpeed: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ effect, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (effect === 'none') return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isHidden = false;

    const handleVisibility = () => {
      isHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = effect === 'petals' ? 24 : 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: effect === 'petals' ? Math.random() * 8 + 6 : Math.random() * 3 + 1,
        speedX: effect === 'petals' ? Math.random() * 1 - 0.5 : Math.random() * 0.4 - 0.2,
        speedY: effect === 'petals' ? Math.random() * 1 + 0.8 : -(Math.random() * 0.4 + 0.2),
        opacity: Math.random() * 0.6 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        fadeSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    const render = () => {
      if (!isHidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;
          p.opacity += p.fadeSpeed;

          if (p.opacity > 0.8 || p.opacity < 0.15) {
            p.fadeSpeed = -p.fadeSpeed;
          }

          // Loop boundaries
          if (effect === 'petals') {
            if (p.y > canvas.height + 20) {
              p.y = -20;
              p.x = Math.random() * canvas.width;
            }
          } else {
            if (p.y < -20) {
              p.y = canvas.height + 20;
              p.x = Math.random() * canvas.width;
            }
          }

          if (p.x < -20) p.x = canvas.width + 20;
          if (p.x > canvas.width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.opacity));

          if (effect === 'petals') {
            // Draw delicate petal shape
            ctx.fillStyle = '#fda4af';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 1.6, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (effect === 'sparkles') {
            // Draw four-point sparkle star
            ctx.fillStyle = accentColor || '#fbbf24';
            const s = p.size * 1.8;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.3, -s * 0.3);
            ctx.lineTo(s, 0);
            ctx.lineTo(s * 0.3, s * 0.3);
            ctx.lineTo(0, s);
            ctx.lineTo(-s * 0.3, s * 0.3);
            ctx.lineTo(-s, 0);
            ctx.lineTo(-s * 0.3, -s * 0.3);
            ctx.closePath();
            ctx.fill();
          } else {
            // Gold particle dot with soft glow
            ctx.fillStyle = accentColor || '#f59e0b';
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [effect, accentColor]);

  if (effect === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
};

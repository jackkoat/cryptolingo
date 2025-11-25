import React, { useEffect, useRef } from 'react';

// --- GAMIFIED LEARNING CONFIGURATION ---
// Theme colors from your tailwind config
const THEME_COLORS = [
  'rgba(139, 92, 246, 0.4)',  // Primary Purple (Learning)
  'rgba(16, 185, 129, 0.4)',  // Success Green (Correct Answer)
  'rgba(249, 115, 22, 0.4)',  // Orange (Streak/XP)
  'rgba(59, 130, 246, 0.4)',  // Blue (Info)
];

const LINE_COLOR = 'rgba(160, 174, 192, 0.15)'; // Subtle connection lines
const BG_COLOR = '#FAFAFA'; // Neutral-50 (Soft white)

const PARTICLE_COUNT_DIVISOR = 8000; // Density of shapes
const CONNECTION_DISTANCE = 140; 
const MOUSE_RADIUS = 250;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'circle' | 'square'; // Gamified shapes
  angle: number;
  spinSpeed: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / PARTICLE_COUNT_DIVISOR);
      particles.current = [];
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Gentle float speed
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 8 + 4, // Varied sizes
          color: THEME_COLORS[Math.floor(Math.random() * THEME_COLORS.length)],
          shape: Math.random() > 0.5 ? 'circle' : 'square',
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Base Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Optional: Subtle Grid Pattern (Notebook feel)
      drawGrid(ctx, canvas);

      const pList = particles.current;

      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spinSpeed;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse Interaction (Playful repulsion)
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const pushX = Math.cos(angle) * force * 1.5; 
          const pushY = Math.sin(angle) * force * 1.5;
          p.x -= pushX;
          p.y -= pushY;
        }

        // Draw Shapes
        ctx.fillStyle = p.color;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.shape === 'square') {
          // Rounded Square (Block)
          const r = 2;
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(-s/2 + r, -s/2);
          ctx.lineTo(s/2 - r, -s/2);
          ctx.quadraticCurveTo(s/2, -s/2, s/2, -s/2 + r);
          ctx.lineTo(s/2, s/2 - r);
          ctx.quadraticCurveTo(s/2, s/2, s/2 - r, s/2);
          ctx.lineTo(-s/2 + r, s/2);
          ctx.quadraticCurveTo(-s/2, s/2, -s/2, s/2 - r);
          ctx.lineTo(-s/2, -s/2 + r);
          ctx.quadraticCurveTo(-s/2, -s/2, -s/2 + r, -s/2);
          ctx.fill();
        } else {
          // Circle (Coin/Token)
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        // Draw Connections (Learning Paths)
        for (let j = i + 1; j < pList.length; j++) {
          const p2 = pList[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 2 - (dist2 / CONNECTION_DISTANCE) * 2;
            ctx.lineCap = 'round';
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.15)';
      ctx.lineWidth = 1;
      // Dot grid pattern
      for (let x = 0; x <= canvas.width; x += 40) {
        for (let y = 0; y <= canvas.height; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,0.03)';
          ctx.fill();
        }
      }
    };

    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
'use client';

import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import type { Engine } from "tsparticles-engine";

// Define proper interface for particles props
interface ParticlesProps {
  id: string;
  options: Record<string, unknown>;
  [key: string]: unknown;
}

const ParticleBackground: React.FC = () => {
  const [ParticlesComponent, setParticlesComponent] = useState<React.ComponentType<ParticlesProps> | null>(null);

  useEffect(() => {
    // Dynamic import to prevent SSR issues and ensure proper React 19 compatibility
    const loadParticles = async () => {
      try {
        // Import dynamically to fix compatibility issues
        const { default: Particles } = await import('react-tsparticles');
        const { loadSlim } = await import('tsparticles-slim');
        
        const ParticlesWithInit = (props: ParticlesProps) => {
          const particlesInit = useCallback(async (engine: Engine) => {
            return await loadSlim(engine);
          }, []);
          
          return <Particles init={particlesInit} {...props} />;
        };
        
        setParticlesComponent(ParticlesWithInit);
      } catch (error) {
        console.error("Failed to load particles:", error);
      }
    };
    
    loadParticles();
  }, []);

  if (!ParticlesComponent) {
    // Return a simple placeholder until particles load
    return <div className="absolute inset-0 z-0 bg-transparent"></div>;
  }

  return (
    <div className="absolute inset-0 z-0">
      <ParticlesComponent
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#10b981",
            },
            links: {
              color: "#10b981",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
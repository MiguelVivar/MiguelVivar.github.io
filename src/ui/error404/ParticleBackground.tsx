'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { Engine } from "tsparticles-engine";

// Import the correct types from react-tsparticles
import type { IParticlesProps } from "react-tsparticles";

const ParticleBackground: React.FC = () => {
  // State for dynamic components
  const [Particles, setParticles] = useState<React.ComponentType<IParticlesProps> | null>(null);
  const [particlesInitializer, setParticlesInitializer] = useState<((engine: Engine) => Promise<void>) | null>(null);
  
  // Define particlesInit at the top level
  const particlesInit = useCallback(async (engine: Engine) => {
    if (particlesInitializer) {
      return await particlesInitializer(engine);
    }
  }, [particlesInitializer]);

  // Load particles dynamically
  useEffect(() => {
    const loadParticles = async () => {
      try {
        // Import dynamically to fix compatibility issues
        const { default: ReactParticles } = await import('react-tsparticles');
        const { loadSlim } = await import('tsparticles-slim');
        
        setParticles(() => ReactParticles);
        setParticlesInitializer(async (engine: Engine) => await loadSlim(engine));
      } catch (error) {
        console.error("Failed to load particles:", error);
      }
    };
    
    loadParticles();
  }, []);

  if (!Particles) {
    // Return a simple placeholder until particles load
    return <div className="absolute inset-0 z-0 bg-transparent"></div>;
  }

  // Use the imported component correctly
  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
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
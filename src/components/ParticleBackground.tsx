'use client'

import { useState, useEffect, useMemo, memo } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('Particles loaded:', container);
  };

  const particleOptions = useMemo((): ISourceOptions => {
    return {
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'attract',
          },
          onClick: {
            enable: true,
            mode: 'push',
          },
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            factor: 1,
          },
          push: {
            particles_nb: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#3b82f6',
        },
        links: {
          color: '#3b82f6',
          distance: 120,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 20,
        },
        opacity: {
          value: 0.4,
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
      },
      detectRetina: true,
    };
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles-hero"
      particlesLoaded={particlesLoaded}
      options={particleOptions}
      style={{ position: 'absolute' }}
      className="absolute inset-0 -z-0"
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export { ParticleBackground };
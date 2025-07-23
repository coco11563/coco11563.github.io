'use client'

import { useState, useEffect, useMemo, memo } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = memo(() => {
  const [init, setInit] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // 当滚动超过视窗高度的80%时隐藏粒子
      setIsVisible(scrollY < windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            particles_nb: 1,
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
          distance: 130,
          enable: true,
          opacity: 0.3,
          width: 1.5,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 1.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 18,
        },
        opacity: {
          value: 0.6,
          animation: {
            enable: true,
            speed: 1.5,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 2, max: 5 },
          animation: {
            enable: true,
            speed: 3,
            sync: false,
          },
        },
      },
      detectRetina: true,
    };
  }, []);

  if (!init || !isVisible) {
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
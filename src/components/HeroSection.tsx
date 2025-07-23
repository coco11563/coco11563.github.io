'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, MapPin, Mail, ExternalLink } from 'lucide-react'
import { ScholarProfile } from '@/types/scholar'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface HeroSectionProps {
  profile: ScholarProfile
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [init, setInit] = useState(false);
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  useEffect(() => {
    const texts = [
      "Data-centric AI Researcher",
      "AI4LifeScience Expert", 
      "Scientific Data Mining Specialist",
      "Machine Learning Engineer",
      "Code 4 Fun!",
      "Good Beer Brewer",
      "Rock Star",
      "Cocktail Expert"
    ]
    const currentText = texts[currentIndex]
    const shouldDelete = isDeleting
    const timeout = shouldDelete ? 50 : 150

    const timer = setTimeout(() => {
      if (!shouldDelete && typedText === currentText) {
        setIsTyping(false)
        setTimeout(() => {
          setIsDeleting(true)
          setIsTyping(true)
        }, 2000)
      } else if (shouldDelete && typedText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      } else {
        setIsTyping(true)
        setTypedText(prev => 
          shouldDelete 
            ? prev.slice(0, -1)
            : currentText.slice(0, prev.length + 1)
        )
      }
    }, timeout)

    return () => clearTimeout(timer)
  }, [typedText, currentIndex, isDeleting])

  const scrollToNext = () => {
    const nextSection = document.getElementById('about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            enable: true, // 启用鼠标悬停交互
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 背景动画 */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particleOptions}
          style={{ position: 'absolute' }}
          className="absolute inset-0 -z-0"
        />
      )}


      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：个人信息 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* 姓名 */}
            <div className="space-y-2">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="gradient-text">{profile.name}</span>
              </motion.h1>
              {profile.nameZh && (
                <motion.p 
                  className="text-xl md:text-2xl text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {profile.nameZh}
                </motion.p>
              )}
            </div>

            {/* 打字机效果职位 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-8"
            >
              <p className="text-lg md:text-xl text-gray-700">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>

            {/* 机构信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              {profile.affiliation.map((aff, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={16} className="text-primary-500 flex-shrink-0" />
                  <span className="text-sm md:text-base">{aff}</span>
                </div>
              ))}
            </motion.div>

            {/* 联系方式 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {Array.isArray(profile.email) 
                ? profile.email.map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email.replace('.at.', '@')}`}
                      className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Mail size={16} />
                      <span>{email}</span>
                    </a>
                  ))
                : (
                    <a
                      href={`mailto:${profile.email.replace('.at.', '@')}`}
                      className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Mail size={16} />
                      <span>{profile.email}</span>
                    </a>
                  )
              }
            </motion.div>

            {/* 快速链接 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://scholar.google.com/citations?user=YGwukbUAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={16} className="mr-2" />
                Google Scholar
              </a>
              <a
                href="https://github.com/coco11563"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={16} className="mr-2" />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* 右侧：个人照片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* 背景装饰 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 blur-xl" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full opacity-30 blur-lg" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* 头像 */}
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={profile.image}
                    alt={`${profile.name} Profile Photo`}
                    fill                    /* 让 Image 绝对定位填满父容器 */
                    className="rounded-full object-cover shadow-2xl"
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                
                {/* 验证徽章 */}
                {profile.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 滚动提示 */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={24} className="text-primary-600" />
      </motion.button>
    </section>
  )
}
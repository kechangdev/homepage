"use client";
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Mouse follower effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    cursorX.set(mousePosition.x - 16);
    cursorY.set(mousePosition.y - 16);
  }, [mousePosition]);

  // Sample services data
  const services = [
    {
      id: 1,
      title: "AI Service",
      description: "Artificial Intelligence Solutions",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      link: "/ai"
    },
    {
      id: 2,
      title: "Data Analytics",
      description: "Data Insights & Visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      link: "/analytics"
    },
    {
      id: 3,
      title: "Cloud Platform",
      description: "Cloud Computing Solutions",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "/cloud"
    }
  ];

  return (
      <>
        <Head>
          <title>Your Name | Personal Service Hub</title>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>

        {/* Custom Cursor */}
        <motion.div
            ref={cursorRef}
            className="fixed w-8 h-8 rounded-full border border-white/30 pointer-events-none z-50 mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              transition: 'transform 0.1s ease-in-out',
            }}
        />

        {/* Progress Bar */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-50"
            style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed w-full z-40 mix-blend-difference">
          <div className="max-w-[1800px] mx-auto px-8 py-8">
            <div className="flex justify-between items-center">
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-xl tracking-[0.2em] font-light"
              >
                YOUR NAME
              </motion.div>
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="hidden md:flex space-x-12 text-sm tracking-[0.2em]"
              >
                <a href="#services" className="hover:opacity-50 transition-opacity duration-300">SERVICES</a>
                <a href="#about" className="hover:opacity-50 transition-opacity duration-300">ABOUT</a>
                <a href="#contact" className="hover:opacity-50 transition-opacity duration-300">CONTACT</a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity duration-300">GITHUB</a>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="h-screen relative flex items-center justify-center overflow-hidden">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-black"
          />
          <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')]
          bg-cover bg-center"
              style={{ opacity: 0.4 }}
          />
          <div className="relative z-10 text-center px-4">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="font-['Cormorant_Garamond'] text-7xl md:text-9xl font-light mb-8"
            >
              Digital Solutions
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-lg md:text-xl tracking-[0.2em] font-light"
            >
              CRAFTING DIGITAL EXPERIENCES
            </motion.p>
          </div>
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-[1px] h-24 bg-white/30 mx-auto" />
            <p className="mt-4 text-sm tracking-[0.2em] text-white/70">EXPLORE</p>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-4 bg-[#0a0a0a]">
          <div className="max-w-[1800px] mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="font-['Cormorant_Garamond'] text-5xl md:text-7xl text-center mb-24"
            >
              Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {services.map((service) => (
                  <motion.a
                      href={service.link}
                      key={service.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: service.id * 0.2 }}
                      viewport={{ once: true }}
                      className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:opacity-0" />
                    <img
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
                      <h3 className="font-['Cormorant_Garamond'] text-3xl mb-4">{service.title}</h3>
                      <p className="text-sm tracking-[0.2em] opacity-0 transform translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        {service.description}
                      </p>
                    </div>
                  </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative overflow-hidden">
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')]
          bg-cover bg-fixed bg-center"
          />
          <div className="relative z-10 max-w-[1800px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-24 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
              >
                <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl mb-8">
                  About Me
                </h2>
                <p className="text-lg leading-relaxed text-white/80 mb-12">
                  As a technology enthusiast and solution architect, I specialize in creating
                  innovative digital solutions that help businesses and individuals achieve their goals.
                  With expertise in AI, data analytics, and cloud computing, I deliver robust and
                  scalable services tailored to your needs.
                </p>
                <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-[0.2em] border border-white/30 px-12 py-4 hover:bg-white hover:text-black transition-all duration-300 inline-block"
                >
                  VIEW MY WORK
                </a>
              </motion.div>
              <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="aspect-square relative"
              >
                <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                    alt="Technology workspace"
                    className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-24 bg-black">
          <div className="max-w-[1800px] mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-2xl tracking-[0.2em] font-light mb-8">GET IN TOUCH</div>
              <div className="flex justify-center space-x-12 text-sm tracking-[0.2em] text-white/70">
                <a href="mailto:your.email@example.com" className="hover:text-white transition-colors duration-300">EMAIL</a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GITHUB</a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LINKEDIN</a>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <p className="text-center text-sm text-white/50">
                © {new Date().getFullYear()} YOUR NAME. ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </footer>
      </>
  );
}
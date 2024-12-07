"use client";
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
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
    // Add more services as needed
  ];

  return (
      <>
        <Head>
          <title>Kechang | This is my homepage</title>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>

        {/* Custom Cursor */}
        <motion.div
            ref={cursorRef}
            className="fixed w-8 h-8 rounded-full border border-yellow-500 pointer-events-none z-50 mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              transition: 'transform 0.1s ease-in-out',
              backgroundColor: 'transparent',
            }}
        />

        {/* Progress Bar */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-yellow-500 origin-left z-50"
            style={{ scaleX: smoothProgress }}
        />

        {/* Navigation */}
        <nav className="fixed w-full z-40 mix-blend-difference bg-black/50 backdrop-blur-sm">
          <div className="max-w-[1800px] mx-auto px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl tracking-[0.2em] font-medium text-yellow-500"
              >
                Kechang
              </motion.div>
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="hidden md:flex space-x-8 text-sm tracking-[0.2em] text-yellow-500"
              >
                <a href="#services" className="hover:text-white transition-colors duration-300">SERVICES</a>
                <a href="#about" className="hover:text-white transition-colors duration-300">ABOUT</a>
                <a href="#contact" className="hover:text-white transition-colors duration-300">CONTACT</a>
                <a href="https://github.com/kechangdev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GITHUB</a>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="h-screen relative flex items-center justify-center bg-gradient-to-br from-black to-gray-800">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-opacity-70"
          />
          <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, type: "spring", stiffness: 60, damping: 20 }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1623039925698-1f96229b1a51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
              style={{ opacity: 0.4 }}
          />
          <div className="relative z-10 text-center px-4">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-['Cormorant_Garamond'] text-6xl md:text-8xl font-thin text-yellow-500 mb-8"
            >
              Digital Solutions
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-lg md:text-xl tracking-[0.2em] font-light text-yellow-500"
            >
              CRAFTING DIGITAL EXPERIENCES
            </motion.p>
          </div>
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-[1px] h-24 bg-yellow-500 mx-auto" />
            <p className="mt-4 text-sm tracking-[0.2em] text-yellow-300">EXPLORE</p>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="max-w-[1500px] mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="font-['Cormorant_Garamond'] text-4xl md:text-6xl text-center text-yellow-500 mb-20"
            >
              Services
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                  <motion.a
                      href={service.link}
                      key={service.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: service.id * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden cursor-pointer rounded-lg shadow-lg"
                  >
                    <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:bg-opacity-0" />
                    <img
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-[180px] transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-gray-900 to-transparent transition-opacity duration-500 group-hover:bg-opacity-0">
                      <h3 className="font-['Cormorant_Garamond'] text-2xl mb-2 text-yellow-500">{service.title}</h3>
                      <p className="text-sm tracking-[0.2em] opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                        {service.description}
                      </p>
                    </div>
                  </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1623039925698-1f96229b1a51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-fixed bg-center"
          />
          <div className="relative z-10 max-w-[1500px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
              >
                <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl mb-6 text-yellow-500">
                  About Me
                </h2>
                <p className="text-lg leading-relaxed text-white/80 mb-6">
                  A Student!!!
                </p>
                <a
                    href="https://github.com/kechangdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-[0.2em] border border-yellow-500 px-8 py-3 hover:bg-yellow-500 hover:text-black transition-all duration-300 inline-block"
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
        <footer id="contact" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="max-w-[1500px] mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-2xl tracking-[0.2em] font-light mb-4 text-yellow-500">GET IN TOUCH</div>
              <div className="flex justify-center space-x-8 text-sm tracking-[0.2em] text-yellow-500">
                <a href="mailto:kechang.dev@gmail.com" className="hover:text-white transition-colors duration-300">EMAIL</a>
                <a href="https://github.com/kechangdev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GITHUB</a>
                {/*<a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LINKEDIN</a>*/}
              </div>
            </div>
            <div className="border-t border-yellow-500 pt-4">
              <p className="text-center text-sm text-yellow-500">
                © {new Date().getFullYear()} Kechang. ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </footer>
      </>
  );
}
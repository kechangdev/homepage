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
  const [isVisible, setIsVisible] = useState(true);
  const [blockSize, setBlockSize] = useState(0); // Size of each service block
  const servicesContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolledToMiddle, setHasScrolledToMiddle] = useState(false);

  const services = [
    {
      id: 1,
      title: "kechang's blog",
      description: "My musings and ramblings.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      link: "https://blog.kechang.uk",
    },
    {
      id: 2,
      title: "kechang's Alist",
      description: "Where my files hang out.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      link: "https://pan.kechang.uk",
    },
    {
      id: 3,
      title: "kechang's Status",
      description: "How are my servers doing?",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "https://status.kechang.uk",
    },
    {
      id: 4,
      title: "kechang's Qinglong",
      description: "Automate all the things!",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "https://qinglong.kechang.uk",
    },
    {
      id: 5,
      title: "kechang's Chat",
      description: "Chat with AI for help and fun!",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "https://chat.kechang.uk",
    },
    {
      id: 6,
      title: "kechang's API",
      description: "AI-powered API for Kechang's Chat.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "https://api.kechang.uk",
    },
    {
      id: 7,
      title: "kechang's Bark",
      description: "Notifications that bark.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "https://bark.kechang.uk",
    },
    {
      id: 8,
      title: "kechang's YOURLS",
      description: "Shrink those URLs!",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      link: "https://url.kechang.uk/admin",
    },
  ];

  const calculateBlockSize = () => {
    const windowWidth = window.innerWidth;
    const numberOfServices = services.length;
    const newSize = Math.min(windowWidth / (numberOfServices + 1), 300); // Max size of 300px
    setBlockSize(newSize);
  };

  useEffect(() => {
    calculateBlockSize();
    window.addEventListener('resize', calculateBlockSize);
    return () => {
      window.removeEventListener('resize', calculateBlockSize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasScrolledToMiddle(true);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5, // Trigger when section is 50% visible
        }
    );

    if (servicesContainerRef.current) {
      observer.observe(servicesContainerRef.current);
    }

    return () => {
      if (servicesContainerRef.current) {
        observer.unobserve(servicesContainerRef.current);
      }
    };
  }, []);

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
  }, [mousePosition, cursorX, cursorY]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <>
        <Head>
          <title>kechang | A brief homepage</title>
          <link
              href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
              rel="stylesheet"/>
        </Head>

        {/* Custom Cursor */}
        <motion.div
            ref={cursorRef}
            className="fixed w-10 h-10 rounded-full border border-[#bf1b15] pointer-events-none z-50"
            style={{
              x: cursorX,
              y: cursorY,
              transition: 'transform 0.05s ease-in-out',
              backgroundColor: 'transparent',
              boxShadow: '0 0 10px rgba(191, 27, 21, 0.5)', // Optional: red shadow for better visibility
            }}
        />

        {/* Progress Bar */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-[#bf1b15] origin-left z-50"
            style={{scaleX: smoothProgress}}
        />

        {/* Navigation */}
        <motion.nav
            className={`fixed w-full z-40 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="max-w-[1800px] mx-auto px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="text-xl tracking-[0.2em] font-medium text-white">
                kechang
              </div>
              <div className="hidden md:flex space-x-8 text-sm tracking-[0.2em] text-white">
                <a href="#services" className="hover:text-[#bf1b15] transition-colors duration-300">SERVICES</a>
                <a href="#about" className="hover:text-[#bf1b15] transition-colors duration-300">ABOUT</a>
                <a href="#contact" className="hover:text-[#bf1b15] transition-colors duration-300">CONTACT</a>
                <a href="https://github.com/kechangdev" target="_blank" rel="noopener noreferrer"
                   className="hover:text-[#bf1b15] transition-colors duration-300">GITHUB</a>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section
            className="h-screen relative flex items-center justify-center bg-gradient-to-br from-black to-gray-800">
          <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 0.6}}
              transition={{duration: 1.5, ease: "easeOut"}}
              className="absolute inset-0 bg-opacity-70"
          />
          <motion.div
              initial={{opacity: 0, scale: 1.1}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 1.5, delay: 0.5, type: "spring", stiffness: 50, damping: 15}}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1623039925698-1f96229b1a51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
              style={{opacity: 0.4}}
          />
          <div className="relative z-10 text-center px-4">
            <motion.h1
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.8, ease: "easeOut"}}
                className="font-['Cormorant_Garamond'] text-6xl md:text-8xl font-thin text-yellow-500 mb-8"
            >
              Digital Solutions
            </motion.h1>
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 1, ease: "easeOut"}}
                className="text-lg md:text-xl tracking-[0.2em] font-light text-yellow-500"
            >
              CRAFTING DIGITAL EXPERIENCES
            </motion.p>
          </div>
          <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, delay: 1.2, ease: "easeOut"}}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-[1px] h-24 bg-yellow-500 mx-auto"/>
            <p className="mt-4 text-sm tracking-[0.2em] text-yellow-300">EXPLORE</p>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-gray-200">
          <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 0.1}}
              transition={{duration: 0.7, ease: "easeOut"}}
              viewport={{once: true}}
              className="absolute inset-0"
          />
          <div className="relative z-10 max-w-[1500px] mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                  initial={{opacity: 0, x: -40}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{duration: 0.8, ease: "easeOut"}}
                  viewport={{once: true}}
              >
                <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl mb-6 text-black">
                  About Me
                </h2>
                <p className="text-lg leading-relaxed text-black/80 mb-6">
                  A Student!!!
                </p>
              </motion.div>
              <motion.div
                  initial={{opacity: 0, x: 40}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{duration: 0.8, ease: "easeOut"}}
                  viewport={{once: true}}
                  className="relative"
              >
                <img
                    src="https://raw.githubusercontent.com/kechangdev/homepage.old/f5875fd248b0f7ac14ed74acc2ae020230c6c09c/src/assets/github-contribution-grid-snake.svg"
                    alt="GitHub Contributions"
                    className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-4 bg-gradient-to-br from-white to-gray-200"
                 ref={servicesContainerRef}>
          <div className="max-w-[1500px] mx-auto">
            <motion.h2
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.7, ease: "easeOut"}}
                viewport={{once: true}}
                className="font-['Cormorant_Garamond'] text-4xl md:text-6xl text-center text-black mb-20"
            >
              Services
            </motion.h2>
            <div className="relative overflow-hidden">
              <div className="flex flex-nowrap justify-center transition-transform duration-300"
                   style={{transform: `translateX(${hasScrolledToMiddle ? 0 : blockSize + 20}px)`}}>
                {services.map((service, index) => (
                    <motion.a
                        href={service.link}
                        key={service.id}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: hasScrolledToMiddle ? 1 : 0, y: hasScrolledToMiddle ? 0 : 20}}
                        transition={{duration: 0.5, ease: "easeOut", delay: index * 0.1}}
                        className="group relative overflow-hidden cursor-pointer rounded-lg shadow-lg m-2 flex flex-col justify-center items-center text-center"
                        style={{width: `${blockSize}px`, height: '200px'}}
                    >
                      <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                      />
                      <div
                          className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:bg-opacity-0"></div>
                      <div className="relative z-20 p-6 transition-transform duration-500">
                        <h3 className="font-['Cormorant_Garamond'] text-xl mb-2 text-white transition-transform duration-500 transform group-hover:translate-y-[-20%]">{service.title}</h3>
                        <p className="text-sm tracking-[0.2em] opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                          {service.description}
                        </p>
                      </div>
                    </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-24 bg-gradient-to-br from-white to-gray-200">
          <div className="max-w-[1500px] mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-2xl tracking-[0.2em] font-light mb-4 text-black">GET IN TOUCH</div>
              <div className="flex justify-center space-x-8 text-sm tracking-[0.2em] text-black">
                <a href="mailto:kechang.dev@gmail.com"
                   className="hover:text-[#bf1b15] transition-colors duration-300">EMAIL</a>
                <a href="https://github.com/kechangdev" target="_blank" rel="noopener noreferrer"
                   className="hover:text-[#bf1b15] transition-colors duration-300">GITHUB</a>
              </div>
            </div>
            <div className="border-t border-black pt-4">
              <p className="text-center text-sm text-black">
                © {new Date().getFullYear()} KECHANG. ALL RIGHTS RESERVED
              </p>
              <p className="text-center text-sm text-black">
                <a href="https://github.com/kechangdev/homepage" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 3c-4.97 0-9 4.03-9 9a9 9 0 0016.26 5.32c.45-.73.74-1.54.74-2.32 0-2.22-2.02-4-4.5-4h-1.5V9h1.5c2.48 0 4.5 1.78 4.5 4a4.5 4.5 0 01-4.5 4.5H12v-3h2.5a1.5 1.5 0 000-3H12V9h1.5C17.67 9 21 12.33 21 16.5c0 1.78-.61 3.42-1.62 4.73A9 9 0 0012 21z"/>
                  </svg>
                  <span>View Project</span>
                </a>
              </p>
            </div>
          </div>
        </footer>
      </>
  );
}
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroImages = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <motion.div 
      ref={containerRef}
      className="lg:w-1/2 h-[450px] md:h-[500px] relative flex items-center justify-center mt-8 lg:mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Decorative elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#9945FF]/10 blur-2xl" />
        <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-[#14F195]/30 blur-xl" />
        <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-[#9945FF]/30 blur-xl" />
      </div>
      
      {/* Card backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[380px] h-[280px] md:h-[380px] rounded-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 shadow-xl" />
      
      {/* Profile cards with floating effect */}
      <motion.div 
        className="absolute z-20 left-0 md:left-4 lg:left-10 top-1/2 transform -translate-y-1/2"
        style={{ y: y1 }}
        animate={{
          y: [0, -15, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="relative w-[160px] md:w-[220px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-sm bg-black/40">
          <Image
            src="/kash(1).png"
            alt="Creator profile"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
              <p className="text-white/70 text-xs">Available</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute z-30"
        style={{ y: y2 }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
      >
        <div className="relative w-[180px] md:w-[240px] h-[240px] md:h-[300px] rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.4)] border border-white/20 backdrop-blur-sm bg-black/40">
          <Image
            src="/shek.png"
            alt="Creator profile"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
              <p className="text-white/70 text-xs">Live now</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute z-10 right-0 md:right-4 lg:right-10 top-1/2 transform -translate-y-1/2"
        style={{ y: y3 }}
        animate={{
          y: [0, -12, 0],
          rotate: [1, -1, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.2,
        }}
      >
        <div className="relative w-[160px] md:w-[220px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-sm bg-black/40">
          <Image
            src="/pic3.png"
            alt="Creator profile"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></div>
              <p className="text-white/70 text-xs">Busy</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Status indicators */}
      <div className="absolute top-10 right-10 md:right-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs text-white/80">24 live creators</span>
      </div>
    </motion.div>
  );
};

export default HeroImages;
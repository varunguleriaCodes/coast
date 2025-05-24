"use client";
import React from "react";
import HeroContent from "./heroContent";
import HeroImages from "./heroImages";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="fixed w-full h-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-80 z-0" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-[#9945FF]/20 blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-[#14F195]/20 blur-[80px] animate-pulse" 
           style={{ animationDuration: '7s', animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 md:py-20 gap-8">
          <HeroContent />
          <HeroImages />
        </div>
      </div>
    </section>
  );
}

export default Hero
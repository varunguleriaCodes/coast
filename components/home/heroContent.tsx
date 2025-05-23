"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroContent = () => {
  return (
    <motion.div 
      className="lg:w-1/2 space-y-6 md:space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2"
      >
        <span className="text-sm font-medium flex items-center gap-1.5 text-white">
          <Sparkles size={14} className="text-[#14F195]" />
          Powered by Solana blockchain
        </span>
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="block bg-gradient-to-r from-[#9945FF] via-[#8752F3] to-[#14F195] bg-clip-text text-transparent">
          Monetize Your Time,
        </span>
        <span className="block text-white mt-1">
          Connect. Share. Grow
        </span>
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Create Solana-powered Links to sell your time, engage directly with your audience, and build your community effortlessly.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Link href="/auth/signin">
          <Button className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3EE8] hover:to-[#12D988] text-white transition-all duration-300 shadow-[0_0_20px_rgba(20,241,149,0.3)] hover:shadow-[0_0_30px_rgba(20,241,149,0.5)]">
            Get started now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        
        <Button 
          className="w-full sm:w-auto h-14 px-8 text-base rounded-full border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
          variant="outline"
        >
          Learn more
        </Button>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-3 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 ring-2 ring-background flex items-center justify-center text-xs font-medium text-white">
              {i}
            </div>
          ))}
        </div>
        <p className="text-sm text-white/60">
          <span className="font-medium text-white">500+</span> creators already using Meet Link
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent
import { Zap } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 uppercase text-xl font-bold">
        <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl blur-sm opacity-50" />
        <div className="relative bg-black rounded-xl p-2 border border-white/10">
            <Zap className="w-6 h-6 text-[#14F195]" />
        </div>
        </div>
        Coast
  </div>
  );
};

export default Logo;

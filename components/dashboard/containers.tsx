"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Session, useSidebarStore } from "@/store/store";
import { ArrowUpRight, Calendar, CheckCircle, ChevronsRight, Plus, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";

interface Buyer {
  _id: string;
  timeslot: string;
  name: string;
  email: string;
  publicKey: string;
  buyername: string;
}

const Containers = () => {
  const { isOpen, isLargeScreen, setIsOpen, selectedSession, sessions } =
    useSidebarStore();
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [buyer, setBuyer] = useState<Buyer[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/buyer");
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }

        setBuyer([]);
        const formData = await response.json();

        const completeBuyers: Buyer[] = formData
          .filter(
            (data: { creatorId: string; id: string }) =>
              data.creatorId === selectedSession?.id
          )
          .map((data: { creatorId: string; _id: string }) => ({
            _id: data._id,
            timeslot: (data as any).timeslot || "Unknown timeslot",
            name: (data as any).name || "Unknown name",
            email: (data as any).email || "Unknown email",
            publicKey: (data as any).publicKey || "Unknown key",
            buyername: (data as any).buyername || "Unknown buyer",
          }));

        setBuyer((prev) => [...prev, ...completeBuyers]);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    if (selectedSession) {
      fetchSessions();
    }
  }, [selectedSession]);

  const handleToggleSidebar = () => {
    if (!isLargeScreen) {
      setIsOpen(!isOpen);
    }
    controls.start({ x: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.start({ x: 5 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({ x: 0 });
  };

  useEffect(() => {
    let bookedCount = 0;

    if (selectedSession?.time1 === "booked") bookedCount++;
    if (selectedSession?.time2 === "booked") bookedCount++;
    if (selectedSession?.time3 === "booked") bookedCount++;

    setTime(bookedCount);
  }, [selectedSession]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {!selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <h3
              className="text-4xl md:text-5xl mb-6 text-gray-200 flex gap-2 items-center cursor-pointer text-center font-bold"
              onClick={handleToggleSidebar}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              All Sessions
              {!isOpen && (
                <motion.div animate={controls}>
                  <ChevronsRight className="text-blue-400" />
                </motion.div>
              )}
            </h3>
            <p className="text-gray-400 max-w-lg text-center mb-8">
              Select a session from the sidebar to view details or create a new session to get started.
            </p>
            <Link href="/create">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="rounded-full px-6 py-6 flex gap-2 items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white border border-blue-400/20 shadow-lg hover:shadow-blue-700/20 hover:from-blue-700 hover:to-purple-800 transition-all duration-300">
                  <Plus className="w-5 h-5" /> Create New Session
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        )}

        {selectedSession && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="xl:flex gap-8 2xl:gap-12"
            >
              <div className="xl:flex-1">
                <motion.button
                  className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 mb-6"
                  onClick={handleToggleSidebar}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                >
                  <ChevronsRight className="w-5 h-5 transform rotate-180" />
                  <span className="text-sm font-medium">Back to All Sessions</span>
                </motion.button>

                <div className="flex flex-col mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <h4 className="text-blue-400 font-medium">mini sessions</h4>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {selectedSession.organizationName || "Build"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  <motion.div 
                    className="flex items-center bg-gradient-to-r from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg overflow-hidden relative"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 opacity-10">
                      <DollarSign className="w-20 h-20" />
                    </div>
                    <div className="z-10">
                      <h2 className="text-lg font-semibold text-blue-100">Earnings</h2>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{selectedSession.earnings}</span>
                        <span className="text-blue-200">SOL</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center bg-gradient-to-r from-emerald-600 to-teal-700 p-4 rounded-xl shadow-lg overflow-hidden relative"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 opacity-10">
                      <Users className="w-20 h-20" />
                    </div>
                    <div className="z-10">
                      <h2 className="text-lg font-semibold text-emerald-100">Bookings</h2>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{time}</span>
                        <span className="text-emerald-200">/3</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-xl shadow-lg overflow-hidden relative"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 opacity-10">
                      <TrendingUp className="w-20 h-20" />
                    </div>
                    <div className="z-10">
                      <h2 className="text-lg font-semibold text-purple-100">Views</h2>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{time}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="bg-gray-900/40 rounded-xl p-5 border border-gray-800 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-blue-400" />
                    <h2 className="text-xl font-semibold">
                      {new Date(selectedSession.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h2>
                  </div>
                  
                  <div className="space-y-2">
                    {buyer.length > 0 ? buyer.map((b: Buyer) => (
                      <motion.div
                        key={b._id}
                        className="p-3 border border-gray-800 hover:border-blue-500/30 bg-gray-800/20 hover:bg-gray-800/40 rounded-lg flex items-center gap-3 group transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <div className="min-w-[100px] font-medium text-white">{b.timeslot}</div>
                        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-900/30 border border-green-500/30">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400">Booked</span>
                        </div>
                        <p className="text-gray-300 ml-2">{b.buyername}</p>
                      </motion.div>
                    )) : (
                      <div className="text-center py-6 text-gray-500">
                        No bookings found for this session
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Session Details Section */}
              <div className="xl:max-w-md 2xl:max-w-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Session Details</h3>
                <motion.div 
                  className="bg-gray-900/40 rounded-xl border border-gray-800 overflow-hidden shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedSession.image && (
                    <div className="relative w-full h-60 sm:h-72">
                      <Image
                        src={selectedSession.image}
                        alt={selectedSession.title || "session image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-4">
                    <div className="">
                      <p className="text-blue-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedSession.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                      <div className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Price: {selectedSession.amount} SOL
                      </div>
                    </div>
                    
                    <h1 className="text-xl font-bold">{selectedSession.title || "No title"}</h1>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedSession.description || "No Description"}
                    </p>
                    
                    {selectedSession.meetlink && (
                      <Link
                        href={selectedSession.meetlink}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors py-2"
                      >
                        <span className="font-medium">Join Meeting</span>
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                      </Link>
                    )}

                    <div className="pt-3">
                      <Link href="/create">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button className="w-full rounded-lg py-5 flex gap-2 justify-center items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white border border-blue-400/20 shadow-lg hover:shadow-blue-700/20 hover:from-blue-700 hover:to-purple-800 transition-all duration-300">
                            <Plus className="w-5 h-5" /> Create New Session
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Containers;
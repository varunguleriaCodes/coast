/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { Session, useSidebarStore } from "@/store/store";

const Sidebar = () => {
  const {
    isOpen,
    isLargeScreen,
    setIsOpen,
    setIsLargeScreen,
    setSelectedSession,
    setSessions,
    sessions,
    selectedSession,
  } = useSidebarStore();
  const [isUpcoming, setIsUpcoming] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      setIsOpen(largeScreen);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/sessions");
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const formData = await response.json();
        setSessions(formData);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [setSessions]);

  const handleToggleSidebar = () => {
    if (!isLargeScreen) {
      setIsOpen(!isOpen);
    }
  };

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    if (!isLargeScreen) {
      setIsOpen(false);
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    sessionDate.setHours(0, 0, 0, 0);

    return isUpcoming ? sessionDate >= today : sessionDate < today;
  });

  // Count upcoming and past sessions
  const upcomingCount = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    sessionDate.setHours(0, 0, 0, 0);
    return sessionDate >= today;
  }).length;

  const pastCount = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    sessionDate.setHours(0, 0, 0, 0);
    return sessionDate < today;
  }).length;

  return (
    <AnimatePresence>
      {(isLargeScreen || isOpen) && (
        <motion.div
          className="fixed lg:relative top-0 left-0 h-full bg-slate-950 text-white overflow-y-auto w-full lg:w-[400px] xl:w-[450px] 2xl:w-[500px] z-30"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-6 xl:p-8 h-full flex flex-col">
            <div className="mb-8 flex justify-between items-center">
              <Link href="/">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Logo />
                </motion.div>
              </Link>
              {!isLargeScreen && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X
                    className="text-white cursor-pointer hover:text-gray-300"
                    onClick={handleToggleSidebar}
                  />
                </motion.div>
              )}
            </div>

            <div className="flex mb-6 items-center justify-between">
              <h3 className="text-xl font-semibold text-white">My Sessions</h3>
              <Link href="/create">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="rounded-full flex gap-1.5 items-center bg-gradient-to-r from-blue-600 to-purple-700 text-white border border-blue-400/20 shadow-lg hover:shadow-blue-700/20 hover:from-blue-700 hover:to-purple-800 transition-all duration-300">
                    <Plus className="w-4 h-4" /> Create
                  </Button>
                </motion.div>
              </Link>
            </div>

            <div className="mb-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="w-full rounded-full p-3 pl-10 border border-gray-700 bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </div>

            <div className="flex justify-between mb-6 bg-gray-800/50 rounded-full p-1">
              <motion.button
                className={`flex-1 rounded-full py-2.5 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  isUpcoming ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md" : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsUpcoming(true)}
                whileTap={{ scale: 0.98 }}
              >
                Upcoming
                <span className={`rounded-full px-2 py-0.5 text-sm ${
                  isUpcoming ? "bg-white/20 text-white" : "bg-yellow-200 text-yellow-800"
                }`}>
                  {upcomingCount}
                </span>
              </motion.button>
              <motion.button
                className={`flex-1 rounded-full py-2.5 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  !isUpcoming ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md" : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsUpcoming(false)}
                whileTap={{ scale: 0.98 }}
              >
                Past
                <span className={`rounded-full px-2 py-0.5 text-sm ${
                  !isUpcoming ? "bg-white/20 text-white" : "bg-green-200 text-green-800"
                }`}>
                  {pastCount}
                </span>
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
              <div className="text-sm text-gray-400 mb-3 ml-2 font-medium">
                {isUpcoming ? 'Upcoming Sessions' : 'Past Sessions'}
              </div>
              {filteredSessions.length > 0 ? (
                <div className="space-y-3">
                  {filteredSessions.map((session) => (
                    <motion.div
                      key={session.id}
                      className={`flex items-center p-3 rounded-xl cursor-pointer border ${
                        selectedSession && selectedSession.id === session.id
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/40"
                          : "hover:bg-white/5 border-transparent"
                      } transition-all duration-300`}
                      onClick={() => handleSessionClick(session)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 font-medium mr-4 rounded-xl shadow-lg px-3 py-2 text-white">
                        {String(new Date(session.date).getDate()).padStart(2, "0")}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">
                          {session.organizationName}
                        </div>
                        <div className="text-sm text-gray-400 line-clamp-1 mt-0.5">
                          {session.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No {isUpcoming ? 'upcoming' : 'past'} sessions found
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
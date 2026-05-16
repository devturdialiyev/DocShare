"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { getGreeting } from "@/lib/utils";
import { Heart, Wind, Activity } from "lucide-react";

interface HeroSectionProps {
  userName: string;
  healthScore: number;
}

const HeroSection = ({ userName, healthScore }: HeroSectionProps) => {
  const greeting = getGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full blur-3xl" />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div>
            <p className="text-white/80 text-lg">{greeting},</p>
            <h1 className="text-3xl lg:text-4xl font-bold">{userName}</h1>
          </div>

          <p className="text-white/80 max-w-md">
            Your health is your wealth. Let&apos;s keep track of your well-being today.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="text-sm font-medium">Heart Rate</span>
              <span className="text-sm">72 BPM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Wind className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-medium">AQI</span>
              <span className="text-sm">42 Good</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">8,450</span>
              <span className="text-sm">steps</span>
            </div>
          </div>
        </div>

        {/* Right - Health Orb */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full bg-white/20 blur-xl"
            />

            {/* Middle Ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative w-48 h-48 rounded-full bg-gradient-to-br from-white/30 to-cyan-200/30 backdrop-blur-sm flex items-center justify-center border-4 border-white/30"
            >
              {/* Inner Circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-cyan-100 flex flex-col items-center justify-center shadow-inner">
                <span className="text-4xl font-bold text-gray-800">
                  {healthScore}
                </span>
                <span className="text-xs text-gray-500 font-medium">Health Score</span>
              </div>

              {/* Orbiting Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Pulse Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: [0.8, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute inset-0 rounded-full border-2 border-white/30"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Badge */}
      <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">All systems normal</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;

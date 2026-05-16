"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Footprints, Flame, Target, TrendingUp, Trophy } from "lucide-react";

interface DailyActivityProps {
  steps: number;
  goal: number;
  calories: number;
  distance: number;
  streak: number;
}

const DailyActivity = ({
  steps,
  goal,
  calories,
  distance,
  streak,
}: DailyActivityProps) => {
  const progress = Math.min((steps / goal) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card hover className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Footprints className="w-4 h-4 text-white" />
            </div>
            Daily Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Circle */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress / 100) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#2975D4" />
                    <stop offset="100%" stopColor="#05B2D9" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">
                  {steps.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  of {goal.toLocaleString()} steps
                </span>
                <span className="text-xs text-cyan-600 font-medium mt-1">
                  {Math.round(progress)}% complete
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-semibold text-gray-800">{calories}</p>
              <p className="text-xs text-gray-500">Calories</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <Target className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-semibold text-gray-800">{distance} km</p>
              <p className="text-xs text-gray-500">Distance</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <Trophy className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-semibold text-gray-800">{streak}</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[60, 80, 45, 90, 70, 85, 100].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex-1 bg-gradient-primary rounded-t-md"
                />
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyActivity;

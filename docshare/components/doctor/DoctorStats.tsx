"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star, TrendingUp, Users, Clock, Calendar, ArrowUpRight } from "lucide-react";

interface DoctorStatsProps {
  rating: number;
  totalPatients: number;
  todayAppointments: number;
  weeklyGrowth: number;
}

const DoctorStats = ({ rating, totalPatients, todayAppointments, weeklyGrowth }: DoctorStatsProps) => {
  const stats = [
    {
      label: "Rating",
      value: rating,
      suffix: "★",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Today",
      value: todayAppointments,
      suffix: "pts",
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Growth",
      value: weeklyGrowth,
      suffix: "%",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3" />
                    +{stat.suffix || ""}
                  </div>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {stat.value}
                {stat.suffix && <span className="text-lg text-gray-400 ml-1">{stat.suffix}</span>}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DoctorStats;

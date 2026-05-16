"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SystemMetric } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Users, Stethoscope, Calendar, Bot } from "lucide-react";

interface OverviewStatsProps {
  metrics: SystemMetric[];
}

const OverviewStats = ({ metrics }: OverviewStatsProps) => {
  const icons = [Users, Stethoscope, Calendar, Bot];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = icons[index];
        const isPositive = metric.change > 0;
        const isNegative = metric.change < 0;
        const TrendIcon = isPositive
          ? TrendingUp
          : isNegative
          ? TrendingDown
          : Minus;

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-900 border-gray-800 p-6 hover:bg-gray-800/80 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Icon className="w-6 h-6 text-gray-400" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    isPositive && "bg-green-500/20 text-green-400",
                    isNegative && "bg-red-500/20 text-red-400",
                    !isPositive && !isNegative && "bg-gray-500/20 text-gray-400"
                  )}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>

              <div>
                <p className="text-3xl font-bold text-white mb-1">
                  {metric.value.toLocaleString()}
                  {metric.unit && (
                    <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                  )}
                </p>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </div>

              {/* Mini Chart Placeholder */}
              <div className="mt-4 flex items-end gap-1 h-8">
                {[40, 55, 45, 70, 60, 85, 75, 90].map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-blue-500/20 to-blue-500/5 rounded-t-sm"
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OverviewStats;

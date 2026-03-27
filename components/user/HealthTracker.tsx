"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vital } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import {
  Heart,
  Droplet,
  Wind,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
} from "lucide-react";

interface HealthTrackerProps {
  vitals: Vital[];
}

const HealthTracker = ({ vitals }: HealthTrackerProps) => {
  const latestVitals = vitals[0];
  const previousVitals = vitals[1];

  const getChange = (current: number, previous: number) => {
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    return { diff, percent, direction: diff > 0 ? "up" : diff < 0 ? "down" : "neutral" };
  };

  const vitalCards = [
    {
      label: "Heart Rate",
      value: latestVitals.hr_bpm,
      unit: "BPM",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      trend: getChange(latestVitals.hr_bpm, previousVitals.hr_bpm),
      normalRange: { min: 60, max: 100 },
    },
    {
      label: "Blood Pressure",
      value: latestVitals.bp_sys,
      unit: "mmHg",
      icon: Droplet,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      trend: getChange(latestVitals.bp_sys, previousVitals.bp_sys),
      secondaryValue: latestVitals.bp_dia,
      normalRange: { min: 90, max: 140 },
    },
    {
      label: "SpO2",
      value: latestVitals.spo2,
      unit: "%",
      icon: Wind,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      trend: getChange(latestVitals.spo2, previousVitals.spo2),
      normalRange: { min: 95, max: 100 },
    },
    {
      label: "Steps Today",
      value: latestVitals.steps,
      unit: "steps",
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      trend: getChange(latestVitals.steps, previousVitals.steps),
      normalRange: null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card hover className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              Health Vitals
            </div>
            <Button size="sm" variant="ghost" className="text-gray-500">
              View History
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {vitalCards.map((vital, index) => {
              const Icon = vital.icon;
              const isInRange = vital.normalRange
                ? vital.value >= vital.normalRange.min &&
                  vital.value <= vital.normalRange.max
                : true;

              return (
                <motion.div
                  key={vital.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all hover:scale-[1.02]",
                    vital.borderColor,
                    isInRange ? vital.bgColor : "bg-red-50 border-red-200"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        vital.bgColor
                      )}
                    >
                      <Icon className={cn("w-5 h-5", vital.color)} />
                    </div>
                    {/* Trend Indicator */}
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                        vital.trend.direction === "up"
                          ? vital.label === "Steps Today"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                          : vital.trend.direction === "down"
                          ? vital.label === "Steps Today"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      )}
                    >
                      {vital.trend.direction === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : vital.trend.direction === "down" ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}
                      <span>{Math.abs(Number(vital.trend.percent))}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">{vital.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={cn("text-2xl font-bold", vital.color)}>
                        {vital.value.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400">{vital.unit}</span>
                      {vital.secondaryValue && (
                        <span className="text-lg text-gray-400">
                          /{vital.secondaryValue}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={cn(
                      "mt-3 text-xs font-medium px-2 py-1 rounded-full inline-block",
                      isInRange
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {isInRange ? "Normal" : "Attention Needed"}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Record Vitals Button */}
          <Button className="w-full mt-6 bg-gradient-primary">
            Record New Vitals
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HealthTracker;

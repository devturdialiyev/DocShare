"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { extendedVitals } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Heart,
  Droplet,
  Wind,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalsTrackerProps {
  compact?: boolean;
}

const normalRanges = {
  hr_bpm: { min: 60, max: 100, label: "BPM" },
  bp_sys: { min: 90, max: 120, label: "mmHg" },
  bp_dia: { min: 60, max: 80, label: "mmHg" },
  spo2: { min: 95, max: 100, label: "%" },
  weight: { min: 65, max: 85, label: "kg" },
  temperature: { min: 36.1, max: 37.2, label: "°C" },
  fasting_glucose: { min: 70, max: 100, label: "mg/dL" },
};

export default function VitalsTracker({ compact = false }: VitalsTrackerProps) {
  const latest = extendedVitals[0];
  const previous = extendedVitals[1];

  const getChange = (current: number, previous: number) => {
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    return { diff, percent: Math.abs(Number(percent)), direction: diff > 0 ? "up" : diff < 0 ? "down" : "neutral" };
  };

  const getStatus = (value: number, range: { min: number; max: number }) => {
    if (value < range.min || value > range.max) return "attention";
    return "normal";
  };

  const vitalCards = [
    {
      label: "Heart Rate",
      value: latest.hr_bpm,
      unit: "BPM",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      range: normalRanges.hr_bpm,
      change: getChange(latest.hr_bpm, previous.hr_bpm),
    },
    {
      label: "Blood Pressure",
      value: latest.bp_sys,
      secondaryValue: latest.bp_dia,
      unit: "mmHg",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      range: normalRanges.bp_sys,
      change: getChange(latest.bp_sys, previous.bp_sys),
    },
    {
      label: "SpO2",
      value: latest.spo2,
      unit: "%",
      icon: Wind,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
      range: normalRanges.spo2,
      change: getChange(latest.spo2, previous.spo2),
    },
    {
      label: "Weight",
      value: latest.weight || 0,
      unit: "kg",
      icon: Droplet,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      range: normalRanges.weight,
      change: getChange(latest.weight!, previous.weight!),
    },
  ];

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              Current Vitals
            </div>
            <span className="text-xs text-gray-400">{latest.date}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vitalCards.map((vital, index) => {
              const Icon = vital.icon;
              const status = getStatus(vital.value, vital.range);
              return (
                <motion.div
                  key={vital.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-4 rounded-xl border",
                    vital.bgColor,
                    vital.borderColor
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={cn("w-5 h-5", vital.color)} />
                    {status === "attention" && (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{vital.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-gray-900">
                      {vital.value}
                    </span>
                    {vital.secondaryValue && (
                      <span className="text-lg text-gray-400">/{vital.secondaryValue}</span>
                    )}
                    <span className="text-xs text-gray-400">{vital.unit}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            Health Vitals
          </div>
          <span className="text-xs text-gray-400">Last updated: {latest.date}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vitalCards.map((vital, index) => {
            const Icon = vital.icon;
            const status = getStatus(vital.value, vital.range);
            return (
              <motion.div
                key={vital.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02]",
                  vital.bgColor,
                  vital.borderColor,
                  status === "attention" && "ring-2 ring-amber-400 ring-opacity-50"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", vital.bgColor)}>
                    <Icon className={cn("w-6 h-6", vital.color)} />
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    status === "normal" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {status === "normal" ? "Normal" : "Attention"}
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-1">{vital.label}</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {vital.value}
                  </span>
                  {vital.secondaryValue && (
                    <span className="text-2xl text-gray-400">/{vital.secondaryValue}</span>
                  )}
                  <span className="text-sm text-gray-400">{vital.unit}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {vital.change.direction === "up" && (
                    <TrendingUp className="w-4 h-4 text-rose-500" />
                  )}
                  {vital.change.direction === "down" && (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  {vital.change.direction === "neutral" && (
                    <Minus className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={cn(
                    vital.change.direction === "up" && vital.label === "Heart Rate" && "text-rose-500",
                    vital.change.direction === "down" && vital.label === "Heart Rate" && "text-green-500",
                    vital.change.direction === "up" && vital.label !== "Heart Rate" && "text-green-500",
                    vital.change.direction === "down" && vital.label !== "Heart Rate" && "text-rose-500",
                  )}>
                    {vital.change.direction !== "neutral" && (
                      <>
                        {vital.change.direction === "up" ? "+" : "-"}{vital.change.percent}%
                      </>
                    )}
                  </span>
                  <span className="text-gray-400">vs yesterday</span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-400">
                    Normal: {vital.range.min}-{vital.range.max} {vital.range.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">{latest.temperature}°C</span>
                  <span className={cn(
                    "text-sm px-2 py-0.5 rounded-full",
                    getStatus(latest.temperature!, normalRanges.temperature) === "normal" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-amber-100 text-amber-700"
                  )}>
                    {getStatus(latest.temperature!, normalRanges.temperature) === "normal" ? "Normal" : "Attention"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Previous: {previous.temperature}°C</p>
                <p className="text-xs text-gray-400">Range: {normalRanges.temperature.min}-{normalRanges.temperature.max}°C</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fasting Glucose</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">{latest.fasting_glucose} mg/dL</span>
                  <span className={cn(
                    "text-sm px-2 py-0.5 rounded-full",
                    getStatus(latest.fasting_glucose!, normalRanges.fasting_glucose) === "normal" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-amber-100 text-amber-700"
                  )}>
                    {getStatus(latest.fasting_glucose!, normalRanges.fasting_glucose) === "normal" ? "Normal" : "Attention"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Previous: {previous.fasting_glucose} mg/dL</p>
                <p className="text-xs text-gray-400">Range: {normalRanges.fasting_glucose.min}-{normalRanges.fasting_glucose.max} mg/dL</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

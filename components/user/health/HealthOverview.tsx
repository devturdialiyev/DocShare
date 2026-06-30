"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItem, staggerContainer } from "@/lib/motion";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Activity,
  Flame,
  Stethoscope,
  Brain,
  Moon,
  Wind,
  Thermometer,
  Droplets,
  Calendar,
  CheckCircle,
  Sparkles,
  Pill,
  Zap,
  Link2,
  Footprints,
} from "lucide-react";

function IconBox({
  children,
  size = "md",
  className,
}: {
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  const s = size === "sm" ? "w-8 h-8" : "w-[42px] h-[42px]";
  return (
    <div
      className={cn(
        s,
        "rounded-xl flex items-center justify-center flex-shrink-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-gray-900 mb-4">{children}</h2>
  );
}

function Badge({
  children,
  variant = "red",
}: {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "green" | "purple" | "blue";
}) {
  const colors: Record<string, string> = {
    red: "bg-red-100 text-red-700",
    yellow: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={cn(
        "text-[11px] font-bold rounded-[7px] px-2 py-0.5 whitespace-nowrap",
        colors[variant]
      )}
    >
      {children}
    </span>
  );
}

function BadgeSoft({
  children,
  variant = "red",
}: {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "purple" | "blue" | "green";
}) {
  const colors: Record<string, string> = {
    red: "bg-[#ffe2e2] text-[#c10007]",
    yellow: "bg-[#fef9c2] text-[#a65f00]",
    purple: "bg-[#f3e8ff] text-[#8200db]",
    blue: "bg-[#dbeafe] text-[#1447e6]",
    green: "bg-[#dcfce7] text-[#008236]",
  };
  return (
    <span
      className={cn(
        "text-[11px] font-bold rounded-[7px] px-2 py-0.5 whitespace-nowrap",
        colors[variant]
      )}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-[7px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, #2975d4, #05b2d9)",
        }}
      />
    </div>
  );
}

export default function HealthOverview() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ── Current Health Status ── */}
      <motion.div variants={staggerItem}>
        <SectionTitle>Current Health Status</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          {/* Overall Health */}
          <motion.div
            variants={staggerItem}
            className="rounded-3xl flex flex-col items-center justify-center text-center p-5 bg-green-50"
          >
            <div className="flex items-center gap-2.5 w-full mb-4">
              <div className="w-[42px] h-[42px] rounded-xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-lg flex-shrink-0">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-900">Overall Health</div>
                <div className="text-[11px] font-semibold text-gray-500">
                  Score
                </div>
              </div>
            </div>
            <div className="text-[52px] font-bold leading-none text-green-700">8.5</div>
            <div className="text-xs font-semibold text-gray-500 mt-2">
              10 point scale
            </div>
            <div className="text-xs font-semibold text-gray-600 mt-2">
              Healthy lifestyle and good activity level
            </div>
          </motion.div>

          {/* Risk Factors */}
          <motion.div variants={staggerItem} className="card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <IconBox className="bg-orange-50">
                <Flame className="w-5 h-5 text-orange-600" />
              </IconBox>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Risk Factors
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  Be cautious
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#fff7ed] rounded-xl px-3 py-2.5 mb-2.5 text-sm font-semibold text-gray-600">
              Air pollution
              <Badge variant="red">High</Badge>
            </div>
            <div className="flex items-center justify-between bg-[#fefce8] rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600">
              Sleep deprivation
              <Badge variant="yellow">Medium</Badge>
            </div>
          </motion.div>

          {/* Active Conditions */}
          <motion.div variants={staggerItem} className="card p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <IconBox className="bg-blue-50">
                <Stethoscope className="w-5 h-5 text-blue-600" />
              </IconBox>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Active Conditions
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  Under observation
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2.5 mb-2.5 text-xs font-semibold text-gray-600">
              <CheckCircle className="w-3.5 h-3.5 text-green-600" /> No
              chronic diseases
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-600">
              <Zap className="w-3.5 h-3.5 text-yellow-500" /> Activity level:{" "}
              <span className="text-green-600">Good</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-[1fr_280px] gap-4">
        {/* ── LEFT COLUMN ── */}
        <motion.div variants={staggerItem} className="space-y-4">
          {/* Medical History */}
          <Card className="p-6">
            <SectionTitle>Medical History</SectionTitle>

            {/* Respiratory */}
            <div
              className="rounded-xl p-[18px] mb-[14px] border bg-rose-50 border-rose-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconBox className="bg-rose-50">
                    <Wind className="w-5 h-5 text-red-600" />
                  </IconBox>
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      Respiratory Infection
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      Airway inflammation
                    </div>
                  </div>
                </div>
                <BadgeSoft variant="red">2 months ago</BadgeSoft>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Treatment
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    14 days
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Doctor
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    Dr. Karimov
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Status
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    Recovered
                  </div>
                </div>
              </div>
              <div
                className="bg-white/80 rounded-xl p-3 pl-4 border-l-4 border-rose-200 text-xs"
              >
                <div className="font-bold text-gray-900 mb-0.5 text-sm">
                  <Zap className="w-3.5 h-3.5 inline mr-1" />
                  AI Recommendation: Pay attention to air quality
                </div>
                <div className="font-semibold text-gray-500 leading-relaxed">
                  With a history of respiratory infection, today&apos;s AQI is
                  67 (polluted). Wear a mask and close windows when going
                  outside. Your activity level is good, but protect your
                  airways.
                </div>
              </div>
            </div>

            {/* Seasonal Allergy */}
            <div
              className="rounded-xl p-[18px] mb-[14px] border bg-purple-50 border-purple-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconBox className="bg-purple-50">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </IconBox>
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      Seasonal Allergy
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      Eye irritation
                    </div>
                  </div>
                </div>
                <BadgeSoft variant="purple">Chronic</BadgeSoft>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    First diagnosis
                  </div>
                  <div className="text-sm font-bold text-gray-900">2022</div>
                </div>
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Recurrence
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    Spring-Summer
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Monitoring
                  </div>
                  <div className="text-sm font-bold text-blue-600">Good</div>
                </div>
              </div>
              <div
                className="bg-white/80 rounded-xl p-3 pl-4 border-l-4 border-purple-200 text-xs"
              >
                <div className="font-bold text-gray-900 mb-0.5 text-sm">
                  <Link2 className="w-3.5 h-3.5 inline mr-1" />
                  Activity and Allergy Correlation
                </div>
                <div className="font-semibold text-gray-500 leading-relaxed">
                  Your daily activity level (8,421 steps) strengthens your
                  immune system. Engage in outdoor activities early morning or
                  late evening — when pollen levels are lower.
                </div>
              </div>
            </div>

            {/* Ankle Sprain */}
            <div
              className="rounded-xl p-[18px] border bg-orange-50 border-orange-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconBox className="bg-orange-50">
                    <Footprints className="w-5 h-5 text-amber-600" />
                  </IconBox>
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      Ankle Sprain
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      Sports injury
                    </div>
                  </div>
                </div>
                <BadgeSoft variant="yellow">6 months ago</BadgeSoft>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Recovery
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    8 weeks
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Physiotherapy
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    12 sessions
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl px-2.5 py-2">
                  <div className="text-[10px] font-bold text-gray-500">
                    Status
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    100% recovery
                  </div>
                </div>
              </div>
              <div
                className="bg-white/80 rounded-xl p-3 pl-4 border-l-4 border-orange-200 text-xs"
              >
                <div className="font-bold text-gray-900 mb-0.5 text-sm">
                  <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                  Full Recovery - Activity Normalized
                </div>
                <div className="font-semibold text-gray-500 leading-relaxed">
                  Your sports gym workouts (60 min today) and daily walking
                  (6.1 km) indicate full recovery. Continue with stretching
                  exercises.
                </div>
              </div>
            </div>
          </Card>

          {/* Current Medications */}
          <Card className="p-6">
            <SectionTitle>Current Medications and Vitamins</SectionTitle>

            {/* Vitamin D3 */}
            <div
              className="rounded-xl p-[14px] mb-3 flex items-start gap-[14px] border bg-orange-50 border-orange-200"
            >
              <IconBox className="bg-orange-50" size="md">
                <Pill className="w-5 h-5 text-amber-600" />
              </IconBox>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      Vitamin D3
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      2000 IU daily
                    </div>
                  </div>
                  <BadgeSoft variant="green">Active</BadgeSoft>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Dosage
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      1 capsule
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Time
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      Morning
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Left
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      45 days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multivitamin */}
            <div
              className="rounded-xl p-[14px] mb-3 flex items-start gap-[14px] border bg-blue-50 border-blue-200"
            >
              <IconBox className="bg-blue-50">
                <Pill className="w-5 h-5 text-blue-600" />
              </IconBox>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      Multivitamin Complex
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      Daily supplement
                    </div>
                  </div>
                  <BadgeSoft variant="green">Active</BadgeSoft>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Dosage
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      1 tablet
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Time
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      With food
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Left
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      30 days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Antihistamine */}
            <div
              className="rounded-xl p-[14px] flex items-start gap-[14px] border bg-purple-50 border-purple-200"
            >
              <IconBox className="bg-purple-50">
                <Pill className="w-5 h-5 text-purple-600" />
              </IconBox>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2.5">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      Antihistamine (Loratadin)
                    </div>
                    <div className="text-xs font-semibold text-gray-500">
                      For allergy
                    </div>
                  </div>
                  <BadgeSoft variant="purple">As needed</BadgeSoft>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Dosage
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      10mg
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Season
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      Spring-Summer
                    </div>
                  </div>
                  <div className="bg-white/70 rounded-lg px-2 py-1.5">
                    <div className="text-[10px] font-bold text-gray-500">
                      Last intake
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div variants={staggerItem} className="space-y-4">
          {/* Activity Impact */}
          <Card className="p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <IconBox className="bg-green-50">
                <Activity className="w-5 h-5 text-green-600" />
              </IconBox>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Activity Impact
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  Positive on health
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-[14px] mb-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                <span className="text-sm font-bold text-gray-900">
                  Heart Health
                </span>
              </div>
              <div className="text-[11px] font-semibold text-gray-500 leading-relaxed mb-2">
                Daily 8,421 steps strengthen the heart-blood circulation
                system.
              </div>
              <div className="text-[11px] font-semibold text-gray-400 mb-1">
                85% optimal level
              </div>
              <ProgressBar value={85} />
            </div>

            <div className="bg-blue-50 rounded-xl p-[14px] mb-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Brain className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-sm font-bold text-gray-900">
                  Mental Health
                </span>
              </div>
              <div className="text-[11px] font-semibold text-gray-500 leading-relaxed mb-2">
                Yoga and physical exercises reduce stress.
              </div>
              <div className="text-[11px] font-semibold text-gray-400 mb-1">
                78% good condition
              </div>
              <ProgressBar value={78} />
            </div>

            <div className="bg-purple-50 rounded-xl p-[14px]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Moon className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-sm font-bold text-gray-900">
                  Sleep Quality
                </span>
              </div>
              <div className="text-[11px] font-semibold text-gray-500 leading-relaxed mb-2">
                7.5 hours sleep is good, but aim for 8 hours.
              </div>
              <div className="text-[11px] font-semibold text-gray-400 mb-1">
                70% sufficient
              </div>
              <ProgressBar value={70} />
            </div>
          </Card>

          {/* Vital Signs */}
          <Card className="p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <IconBox className="bg-rose-50">
                <Activity className="w-5 h-5 text-rose-600" />
              </IconBox>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Vital Signs
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  Last measurement
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 mb-2.5 text-sm">
              <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                <Heart className="w-3.5 h-3.5" /> Heart rate
              </div>
              <div className="font-bold text-gray-900">72 bpm</div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 mb-2.5 text-sm">
              <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                <Droplets className="w-3.5 h-3.5" /> Blood pressure
              </div>
              <div className="font-bold text-gray-900">120/80</div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 mb-2.5 text-sm">
              <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                <Thermometer className="w-3.5 h-3.5" /> Body temperature
              </div>
              <div className="font-bold text-gray-900">36.6&deg;C</div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5 mb-3 text-sm">
              <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                <Wind className="w-3.5 h-3.5" /> Breathing rate
              </div>
              <div className="font-bold text-gray-900">16/min</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl py-2 px-3 text-center text-xs font-bold text-green-700">
              <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
              All indicators within normal range
            </div>
          </Card>

          {/* Upcoming Checkups */}
          <Card className="p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <IconBox className="bg-blue-50">
                <Calendar className="w-5 h-5 text-blue-600" />
              </IconBox>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Upcoming Checkups
                </div>
                <div className="text-xs font-semibold text-gray-400">
                  Scheduled
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-200 bg-blue-50 rounded-xl p-3 pl-4 mb-2.5">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-bold text-gray-900">
                  General checkup
                </span>
                <BadgeSoft variant="blue">15 days</BadgeSoft>
              </div>
              <div className="text-[11px] font-semibold text-gray-500">
                Dr. Karimov - General Clinic
              </div>
            </div>

            <div className="border-l-4 border-purple-200 bg-purple-50 rounded-xl p-3 pl-4 mb-2.5">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-bold text-gray-900">
                  Visit allergist
                </span>
                <BadgeSoft variant="purple">1 month</BadgeSoft>
              </div>
              <div className="text-[11px] font-semibold text-gray-500">
                Dr. Alieva - Allergology
              </div>
            </div>

            <div className="border-l-4 border-green-200 bg-green-50 rounded-xl p-3 pl-4">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-bold text-gray-900">
                  Eye checkup
                </span>
                <BadgeSoft variant="green">2 months</BadgeSoft>
              </div>
              <div className="text-[11px] font-semibold text-gray-500">
                Ophthalmology center
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── Recommendations Banner ── */}
      <motion.div
        variants={staggerItem}
        className="rounded-3xl p-[26px] bg-blue-50"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-[18px]">
          Personal Health Recommendations
        </h2>
        <div className="grid grid-cols-3 gap-3.5">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-[34px] h-[34px] bg-blue-100 rounded-xl flex items-center justify-center text-base">
                <Wind className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">Air Quality</div>
            </div>
            <div className="text-xs font-semibold text-gray-600 leading-relaxed mb-2.5">
              History of respiratory infection. Today&apos;s AQI is 67 &mdash;
              wear a mask and close windows.
            </div>
            <Badge variant="red">Important</Badge>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-[34px] h-[34px] bg-blue-100 rounded-xl flex items-center justify-center text-base">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">
                Continue Activity
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-600 leading-relaxed mb-2.5">
              8,421 steps &mdash; great! Sports injury fully recovered.
              Don&apos;t forget stretching exercises.
            </div>
            <Badge variant="green">Good</Badge>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-[34px] h-[34px] bg-blue-100 rounded-xl flex items-center justify-center text-base">
                <Moon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-bold text-gray-900">
                Improve Sleep
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-600 leading-relaxed mb-2.5">
              7.5 hours is good, but aim for 8 hours. Avoid screens before
              bedtime.
            </div>
            <Badge variant="yellow">Recommendation</Badge>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/shared/sidebar";
import HeroSection from "@/components/user/HeroSection";
import DailyActivity from "@/components/user/DailyActivity";
import AIGuardian from "@/components/user/AIGuardian";
import FamilyCircle from "@/components/user/FamilyCircle";
import AppointmentsWidget from "@/components/user/AppointmentsWidget";
import HealthTracker from "@/components/user/HealthTracker";
import ActivityPlans from "@/components/user/ActivityPlans";
import {
  currentUser,
  familyMembers,
  vitals,
  upcomingAppointments,
  healthActivities,
} from "@/lib/mock/data";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { Bell, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  const [activeNav, setActiveNav] = React.useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />

      {/* Main Content */}
      <main className="lg:ml-[280px] p-4 lg:p-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6"
        >
          {/* Header */}
          <motion.header
            variants={staggerItem}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome back, {currentUser.full_name.split(" ")[0]}!
              </h2>
              <p className="text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm"
                />
              </div>

              {/* Notifications */}
              <Button
                size="icon"
                variant="outline"
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button size="icon" variant="outline">
                <Sun className="w-5 h-5" />
              </Button>
            </div>
          </motion.header>

          {/* Hero Section */}
          <motion.div variants={staggerItem}>
            <HeroSection
              userName={currentUser.full_name}
              healthScore={currentUser.health_score}
            />
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - 8 cols */}
            <div className="lg:col-span-8 space-y-6">
              {/* Activity & Health Tracker Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <DailyActivity
                  steps={8450}
                  goal={10000}
                  calories={450}
                  distance={6.2}
                  streak={5}
                />
                <HealthTracker vitals={vitals} />
              </div>

              {/* Activity Plans */}
              <ActivityPlans activities={healthActivities} />
            </div>

            {/* Right Column - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              {/* AI Guardian */}
              <AIGuardian />

              {/* Appointments */}
              <AppointmentsWidget appointments={upcomingAppointments} />

              {/* Family Circle */}
              <FamilyCircle members={familyMembers} />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

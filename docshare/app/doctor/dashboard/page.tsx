"use client";

import * as React from "react";
import { motion } from "framer-motion";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import DoctorStats from "@/components/doctor/DoctorStats";
import TodaySchedule from "@/components/doctor/TodaySchedule";
import PendingRequests from "@/components/doctor/PendingRequests";
import RatingOverview from "@/components/doctor/RatingOverview";
import DemandMap from "@/components/doctor/DemandMap";
import ServiceHistory from "@/components/doctor/ServiceHistory";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { currentUser } from "@/lib/mock/data";
import { Bell, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DoctorDashboard() {
  const [activeNav, setActiveNav] = React.useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar activeItem={activeNav} onItemClick={setActiveNav} />

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
                Welcome, Dr. {currentUser.full_name.split(" ")[1]}!
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
                  placeholder="Search patients..."
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
                  5
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button size="icon" variant="outline">
                <Sun className="w-5 h-5" />
              </Button>
            </div>
          </motion.header>

          {/* Stats */}
          <motion.div variants={staggerItem}>
            <DoctorStats
              rating={4.9}
              totalPatients={156}
              todayAppointments={24}
              weeklyGrowth={12}
            />
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Today's Schedule */}
              <TodaySchedule />

              {/* Service History */}
              <ServiceHistory />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Pending Requests */}
              <PendingRequests />

              {/* Rating Overview */}
              <RatingOverview />

              {/* Demand Map */}
              <DemandMap />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

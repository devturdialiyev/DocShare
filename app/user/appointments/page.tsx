"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Sidebar from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Plus, Search } from "lucide-react";
import { upcomingAppointments } from "@/lib/mock/data";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="appointments" />
      
      <main className="lg:ml-[280px] p-4 lg:p-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={staggerItem} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                <p className="text-gray-500">Manage your medical appointments</p>
              </div>
            </div>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
                <button className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Book Appointment
                </button>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{apt.doctor_name}</p>
                        <p className="text-sm text-gray-500">{apt.specialty} - {apt.hospital}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{apt.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

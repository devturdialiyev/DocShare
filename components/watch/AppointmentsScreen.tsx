"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { upcomingAppointments } from "@/lib/mock/data";

export default function AppointmentsScreen() {
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none space-y-1 pb-2">
      <p className="text-[8px] text-white/50 font-medium">TODAY</p>

      {upcomingAppointments.map((apt, i) => (
        <motion.div
          key={apt.id}
          className="bg-white/95 rounded-2xl p-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.06 }}
        >
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[9px] text-white font-bold">{apt.doctor_name.split(" ")[1]?.[0] || "D"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-[10px] font-semibold text-gray-800">{apt.doctor_name}</p>
                <span className="text-[7px] font-medium px-1 py-0.5 rounded-full bg-blue-100 text-blue-600">{apt.specialty}</span>
              </div>
              <p className="text-[8px] text-gray-400">
                {new Date(apt.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} &middot; {apt.time}
              </p>
              <p className="text-[7px] text-gray-400">{apt.hospital}</p>
              <div className="flex gap-1 mt-1">
                <button className="flex-1 text-[7px] py-1 rounded-full border border-gray-200 text-gray-500 font-medium">Reschedule</button>
                <button className="flex-1 text-[7px] py-1 rounded-full bg-blue-600 text-white font-medium flex items-center justify-center gap-0.5">
                  <Video className="w-1.5 h-1.5" /> Join Call
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <p className="text-[8px] text-white/50 font-medium pt-1">UPCOMING</p>
      {[
        { name: "Dr. Sharma", specialty: "General", date: "Apr 2", dot: "bg-green-400" },
        { name: "Dr. Petrov", specialty: "Ortho", date: "Apr 5", dot: "bg-orange-400" },
      ].map((item, i) => (
        <div key={i} className="bg-white/95 rounded-2xl p-2 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
          <p className="text-[9px] font-medium text-gray-700 flex-1">{item.name}</p>
          <span className="text-[7px] px-1 py-0.5 rounded-full bg-gray-100 text-gray-500">{item.specialty}</span>
          <span className="text-[7px] text-gray-400">{item.date}</span>
        </div>
      ))}
    </div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Video, MapPin, User, ChevronRight, CheckCircle, XCircle } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  duration: number;
  type: "in-person" | "video";
  status: "upcoming" | "completed" | "cancelled";
  reason: string;
  age: number;
}

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "Dilshod Rustamov",
    time: "09:00",
    duration: 30,
    type: "in-person",
    status: "completed",
    reason: "Regular checkup",
    age: 45,
  },
  {
    id: "2",
    patientName: "Gulnora Saidova",
    time: "09:30",
    duration: 30,
    type: "video",
    status: "completed",
    reason: "Follow-up consultation",
    age: 32,
  },
  {
    id: "3",
    patientName: "Bobur Alimov",
    time: "10:00",
    duration: 30,
    type: "in-person",
    status: "upcoming",
    reason: "Chest pain assessment",
    age: 58,
  },
  {
    id: "4",
    patientName: "Malika Karimova",
    time: "10:30",
    duration: 30,
    type: "video",
    status: "upcoming",
    reason: "Prescription renewal",
    age: 28,
  },
  {
    id: "5",
    patientName: "Jasur Yusupov",
    time: "11:00",
    duration: 45,
    type: "in-person",
    status: "upcoming",
    reason: "ECG review",
    age: 62,
  },
];

const TodaySchedule = () => {
  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const completedCount = appointments.filter((a) => a.status === "completed").length;
  const upcomingCount = appointments.filter((a) => a.status === "upcoming").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            Today&apos;s Schedule
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              {completedCount} done
            </span>
            <span className="flex items-center gap-1 text-blue-600">
              <Clock className="w-4 h-4" />
              {upcomingCount} upcoming
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer",
                  apt.status === "completed"
                    ? "bg-gray-50 opacity-70"
                    : apt.status === "cancelled"
                    ? "bg-red-50 opacity-70"
                    : "bg-blue-50 hover:bg-blue-100"
                )}
              >
                {/* Time */}
                <div className="flex-shrink-0 w-16 text-center">
                  <p className="text-lg font-bold text-gray-800">{apt.time}</p>
                  <p className="text-xs text-gray-500">{apt.duration}m</p>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">{getStatusIcon(apt.status)}</div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {apt.patientName}
                    </h4>
                    <span className="text-sm text-gray-500">({apt.age}y)</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{apt.reason}</p>
                </div>

                {/* Type Badge */}
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                    apt.type === "video"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  )}
                >
                  {apt.type === "video" ? (
                    <Video className="w-3 h-3" />
                  ) : (
                    <MapPin className="w-3 h-3" />
                  )}
                  {apt.type === "video" ? "Video" : "In-Person"}
                </div>

                {/* Action */}
                {apt.status === "upcoming" && (
                  <Button size="sm" className="bg-gradient-primary">
                    {apt.type === "video" ? (
                      <>
                        <Video className="w-4 h-4 mr-1" />
                        Join
                      </>
                    ) : (
                      "Start"
                    )}
                  </Button>
                )}
                {apt.status === "completed" && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </motion.div>
            ))}
          </div>

          {/* View Full Schedule */}
          <Button variant="ghost" className="w-full mt-4 text-gray-600">
            View Full Schedule
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaySchedule;

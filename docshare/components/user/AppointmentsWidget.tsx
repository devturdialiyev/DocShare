"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/mock/data";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

interface AppointmentsWidgetProps {
  appointments: Appointment[];
}

const AppointmentsWidget = ({ appointments }: AppointmentsWidgetProps) => {
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card hover className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              Appointments
            </div>
            <Button size="sm" variant="ghost" className="text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming appointments</p>
                <Button className="mt-4 bg-gradient-primary">
                  Book Appointment
                </Button>
              </div>
            ) : (
              upcomingAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Doctor Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-7 h-7 text-white" />
                    </div>

                    {/* Appointment Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {appointment.doctor_name}
                        </h4>
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                          {appointment.specialty}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{appointment.hospital}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-gray-700"
                    >
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-primary"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Join Call
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <Button className="w-full bg-gradient-primary">
              Book New Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AppointmentsWidget;

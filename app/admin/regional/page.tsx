"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Activity,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

const stats = [
  { label: "Total Patients", value: "12,847", change: "+12%", icon: Users, color: "text-blue-500" },
  { label: "Active Doctors", value: "248", change: "+5%", icon: Activity, color: "text-green-500" },
  { label: "Hospitals", value: "42", change: "+2", icon: Building2, color: "text-purple-500" },
  { label: "Pending Appointments", value: "1,234", change: "-8%", icon: Calendar, color: "text-amber-500" },
];

const recentAppointments = [
  { id: 1, patient: "Aziz Karimov", doctor: "Dr. Dilshod Umarov", time: "10:30 AM", status: "upcoming" },
  { id: 2, patient: "Nodira Saidova", doctor: "Dr. Gulnora Alieva", time: "11:00 AM", status: "upcoming" },
  { id: 3, patient: "Bekzod Turdialiyev", doctor: "Dr. Akmal Karimov", time: "11:30 AM", status: "upcoming" },
  { id: 4, patient: "Malika Rahimova", doctor: "Dr. Bahodir Yusupov", time: "12:00 PM", status: "upcoming" },
  { id: 5, patient: "Jasur Alimov", doctor: "Dr. Nigina Rustamova", time: "02:00 PM", status: "pending" },
];

const alerts = [
  { id: 1, type: "warning", message: "High patient load at Tashkent Medical Center", time: "10 min ago" },
  { id: 2, type: "info", message: "New doctor registration pending approval", time: "25 min ago" },
  { id: 3, type: "critical", message: "Equipment maintenance required at Clinic #15", time: "1 hour ago" },
];

export default function RegionalAdminPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar activeItem="dashboard" />

      <main className="lg:ml-[280px] p-4 lg:p-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerContainer} className="mb-8">
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Regional Admin Dashboard</h1>
                <p className="text-gray-500">Tashkent Region - Health Management</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Appointments List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      Today's Appointments
                    </CardTitle>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {recentAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {apt.patient.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{apt.patient}</p>
                            <p className="text-sm text-gray-500">{apt.doctor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{apt.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            apt.status === "upcoming" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-xl ${
                          alert.type === "critical" ? "bg-red-50 border border-red-200" :
                          alert.type === "warning" ? "bg-amber-50 border border-amber-200" :
                          "bg-blue-50 border border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {alert.type === "critical" && <XCircle className="w-4 h-4 text-red-500 mt-0.5" />}
                          {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />}
                          {alert.type === "info" && <Clock className="w-4 h-4 text-blue-500 mt-0.5" />}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Doctors
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Building2 className="w-4 h-4 mr-2" />
                    Hospital Settings
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

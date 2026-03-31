"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import GodModeSidebar from "@/components/admin/GodModeSidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Globe,
  Settings,
  Bell,
  BarChart3,
  MapPin,
} from "lucide-react";
import { systemMetrics, alerts, hospitals } from "@/lib/mock/data";

export default function NationalAdminPage() {
  return (
    <div className="min-h-screen bg-black">
      <GodModeSidebar activeItem="dashboard" />

      <main className="lg:ml-[280px] p-4 lg:p-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">God Mode Dashboard</h1>
                <p className="text-gray-400">National Health Platform - Uzbekistan</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {systemMetrics.map((metric) => (
              <Card key={metric.label} className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">{metric.label}</span>
                    <span className={metric.change >= 0 ? "text-green-400" : "text-red-400"}>
                      {metric.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">{metric.value.toLocaleString()}</p>
                  {metric.unit && <p className="text-xs text-gray-500">{metric.unit}</p>}
                  <p className="text-xs text-gray-400 mt-1">{metric.change > 0 ? "+" : ""}{metric.change}%</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Hospitals Map */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Regional Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {hospitals.slice(0, 4).map((hospital) => (
                      <div key={hospital.id} className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{hospital.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            hospital.occupancy >= 80 ? "bg-red-900 text-red-300" :
                            hospital.occupancy >= 60 ? "bg-amber-900 text-amber-300" :
                            "bg-green-900 text-green-300"
                          }`}>
                            {hospital.occupancy}% Occupancy
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{hospital.region}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Doctors: <span className="text-white">{hospital.doctors}</span></span>
                          <span className="text-gray-500">Patients: <span className="text-white">{hospital.patients.toLocaleString()}</span></span>
                        </div>
                        <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${hospital.occupancy >= 80 ? "bg-red-500" : hospital.occupancy >= 60 ? "bg-amber-500" : "bg-green-500"}`}
                            style={{ width: `${hospital.occupancy}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <div>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Bell className="w-5 h-5 text-amber-400" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-xl ${
                          alert.type === "critical" ? "bg-red-900/50 border border-red-700" :
                          alert.type === "warning" ? "bg-amber-900/50 border border-amber-700" :
                          "bg-blue-900/50 border border-blue-700"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                            alert.type === "critical" ? "text-red-400" :
                            alert.type === "warning" ? "text-amber-400" :
                            "text-blue-400"
                          }`} />
                          <div>
                            <p className="text-sm font-medium text-white">{alert.title}</p>
                            <p className="text-xs text-gray-400 mt-1">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900 border-gray-800 mt-6">
                <CardHeader>
                  <CardTitle className="text-white">Administrative Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="dark" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Manage Regions
                  </Button>
                  <Button variant="dark" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    User Management
                  </Button>
                  <Button variant="dark" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="dark" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
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

"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Users, Stethoscope, Crown, ChevronRight } from "lucide-react";
import "./globals.css";

const roles = [
  {
    name: "Citizen",
    description: "Patient portal with health tracking, appointments, and family management",
    icon: Users,
    href: "/user/dashboard",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Doctor",
    description: "Medical professional dashboard for managing patients and appointments",
    icon: Stethoscope,
    href: "/doctor/dashboard",
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "Admin",
    description: "Regional hospital management and analytics dashboard",
    icon: Shield,
    href: "/admin/regional",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "SuperAdmin",
    description: "National God Mode dashboard with full system oversight",
    icon: Crown,
    href: "/admin/national",
    color: "from-gray-800 to-gray-900",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">DocShare</h1>
              <p className="text-xs text-gray-500">National Digital Health Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Welcome to DocShare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Uzbekistan&apos;s National Digital Health Platform. Choose your role to continue.
          </motion.p>
        </div>
      </section>

      {/* Role Selection */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={role.href}
                  className="block bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {role.name}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-gray-500 mt-2">{role.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>DocShare © 2026 - National Digital Health Platform of Uzbekistan</p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Sidebar from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Plus, Search } from "lucide-react";
import { familyMembers } from "@/lib/mock/data";

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="family" />
      
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Family</h1>
                <p className="text-gray-500">Manage your family health records</p>
              </div>
            </div>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Family Members ({familyMembers.length})</h2>
                <button className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Member
                </button>
              </div>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-white font-semibold">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.relation}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.health_status === "good" ? "bg-green-100 text-green-700" :
                      member.health_status === "attention" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {member.health_status}
                    </span>
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

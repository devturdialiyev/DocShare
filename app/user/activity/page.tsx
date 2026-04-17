"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Sidebar from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, TrendingUp, Target, Flame } from "lucide-react";
import { healthActivities } from "@/lib/mock/data";

export default function ActivityPage() {
  const completedCount = healthActivities.filter(a => a.completed).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="activity" />
      
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
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Activity</h1>
                <p className="text-gray-500">Track your daily health activities</p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                <p className="text-sm text-gray-500">Completed Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">8,450</p>
                <p className="text-sm text-gray-500">Steps Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">450</p>
                <p className="text-sm text-gray-500">Calories Burned</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Daily Activities</h2>
              <div className="space-y-3">
                {healthActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.category === "exercise" ? "bg-blue-100" :
                        activity.category === "meditation" ? "bg-purple-100" :
                        activity.category === "sleep" ? "bg-indigo-100" :
                        "bg-green-100"
                      }`}>
                        <span className="text-lg">{activity.category === "exercise" ? "🏃" : activity.category === "meditation" ? "🧘" : activity.category === "sleep" ? "😴" : "💧"}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {activity.streak > 0 && (
                        <span className="text-orange-500 text-sm flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {activity.streak}
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.completed ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                      }`}>
                        {activity.completed ? "Done" : "Pending"}
                      </span>
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
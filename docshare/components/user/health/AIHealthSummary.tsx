"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { aiHealthSummary } from "@/lib/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Heart,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIHealthSummary() {
  const { overall_score, summary, key_findings, recommendations } = aiHealthSummary;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "attention":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "stable":
        return <Activity className="w-5 h-5 text-blue-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
      case "good":
        return "bg-green-50 border-green-200";
      case "attention":
        return "bg-amber-50 border-amber-200";
      case "stable":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "normal":
      case "good":
        return "text-green-700";
      case "attention":
        return "text-amber-700";
      case "stable":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Summary Card */}
      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 border-0 text-white overflow-hidden relative">
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Health Analysis</h3>
                  <p className="text-blue-100 text-sm">Powered by DocShare AI</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold">{overall_score}</p>
                <p className="text-blue-100 text-sm">Health Score</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-white/90 leading-relaxed">{summary}</p>
            </div>

            {/* Key Findings */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {key_findings.map((finding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-3 rounded-xl backdrop-blur-sm",
                    finding.status === "normal" || finding.status === "good"
                      ? "bg-white/10"
                      : "bg-white/20"
                  )}
                >
                  <p className="text-xs text-white/70 mb-1">{finding.metric}</p>
                  <p className={cn(
                    "text-sm font-medium truncate",
                    finding.status === "normal" || finding.status === "good" ? "text-white" : "text-white"
                  )}>
                    {finding.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </Card>
      </div>

      {/* Recommendations Card */}
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    rec.priority === "high" && "bg-red-100",
                    rec.priority === "medium" && "bg-amber-100",
                    rec.priority === "low" && "bg-green-100"
                  )}>
                    {rec.priority === "high" && <AlertTriangle className="w-3 h-3 text-red-600" />}
                    {rec.priority === "medium" && <Activity className="w-3 h-3 text-amber-600" />}
                    {rec.priority === "low" && <CheckCircle className="w-3 h-3 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-700">{rec.text}</p>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
              View All Recommendations
              <ArrowRight className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">This Week's Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="text-sm text-gray-600">Avg Heart Rate</span>
                </div>
                <span className="font-semibold text-gray-900">72 BPM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Avg Blood Pressure</span>
                </div>
                <span className="font-semibold text-gray-900">120/80</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Daily Steps Avg</span>
                </div>
                <span className="font-semibold text-gray-900">8,500</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Sleep Avg</span>
                </div>
                <span className="font-semibold text-gray-900">6.5 hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

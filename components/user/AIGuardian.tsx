"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Lightbulb, Shield, AlertTriangle, ChevronRight } from "lucide-react";

interface Tip {
  id: string;
  title: string;
  description: string;
  type: "tip" | "warning" | "urgent";
  icon: React.ReactNode;
}

const AIGuardian = () => {
  const tips: Tip[] = [
    {
      id: "1",
      title: "Stay Hydrated",
      description: "You&apos;ve only had 1.2L of water today. Aim for 2L to maintain optimal health.",
      type: "tip",
      icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
    },
    {
      id: "2",
      title: "Blood Pressure Check",
      description: "Your BP has been slightly elevated this week. Consider reducing salt intake.",
      type: "warning",
      icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
    },
    {
      id: "3",
      title: "Sleep Schedule",
      description: "Great job maintaining your 8-hour sleep schedule! Keep it up!",
      type: "tip",
      icon: <Shield className="w-5 h-5 text-green-500" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="h-full relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-primary opacity-95" />
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            AI Guardian
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-4">
          {/* AI Avatar */}
          <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-cyan-200/30 flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Health Assistant</h4>
              <p className="text-white/70 text-sm">Always watching over your health</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-300">Active</span>
              </div>
            </div>
          </div>

          {/* Tips List */}
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={cn(
                  "p-4 rounded-xl backdrop-blur-sm transition-all hover:scale-[1.02]",
                  tip.type === "warning"
                    ? "bg-orange-500/20 border border-orange-400/30"
                    : tip.type === "urgent"
                    ? "bg-red-500/20 border border-red-400/30"
                    : "bg-white/10 border border-white/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{tip.icon}</div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{tip.title}</h5>
                    <p
                      className="text-white/70 text-sm mt-1"
                      dangerouslySetInnerHTML={{ __html: tip.description }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            View Full Health Report
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl" />
      </Card>
    </motion.div>
  );
};

export default AIGuardian;

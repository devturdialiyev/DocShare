"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FamilyMember } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { Heart, Users, Plus, ChevronRight, User } from "lucide-react";

interface FamilyCircleProps {
  members: FamilyMember[];
}

const FamilyCircle = ({ members }: FamilyCircleProps) => {
  const getStatusColor = (status: FamilyMember["health_status"]) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "attention":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
    }
  };

  const getStatusLabel = (status: FamilyMember["health_status"]) => {
    switch (status) {
      case "good":
        return "Good";
      case "attention":
        return "Needs Attention";
      case "critical":
        return "Critical";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card hover className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              My Family
            </div>
            <Button size="sm" variant="ghost" className="text-gray-500">
              <Plus className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Family Members */}
          <div className="space-y-3">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  {/* Status Indicator */}
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                      getStatusColor(member.health_status)
                    )}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-500">{member.relation}</p>
                </div>

                {/* Status Badge */}
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    member.health_status === "good" &&
                      "bg-green-100 text-green-700",
                    member.health_status === "attention" &&
                      "bg-yellow-100 text-yellow-700",
                    member.health_status === "critical" &&
                      "bg-red-100 text-red-700"
                  )}
                >
                  {getStatusLabel(member.health_status)}
                </div>

                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* Family Health Summary */}
          <div className="mt-6 p-4 bg-gradient-primary/5 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="font-medium text-gray-800">Family Health Score</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  {[2, 3, 4].map((score) => (
                    <div
                      key={score}
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                        score === 4
                          ? "bg-green-100 text-green-700"
                          : score === 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {score === 4 ? "✓" : score === 3 ? "~" : "×"}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">87</p>
                <p className="text-xs text-gray-500">Average</p>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <Button
            variant="ghost"
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            View Family Health Dashboard
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FamilyCircle;

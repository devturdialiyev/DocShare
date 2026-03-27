"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HealthActivity } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import {
  Dumbbell,
  Brain,
  Moon,
  Apple,
  Check,
  Clock,
  Flame,
  ChevronRight,
} from "lucide-react";

interface ActivityPlansProps {
  activities: HealthActivity[];
}

const ActivityPlans = ({ activities }: ActivityPlansProps) => {
  const getCategoryIcon = (category: HealthActivity["category"]) => {
    switch (category) {
      case "exercise":
        return <Dumbbell className="w-5 h-5" />;
      case "meditation":
        return <Brain className="w-5 h-5" />;
      case "sleep":
        return <Moon className="w-5 h-5" />;
      case "nutrition":
        return <Apple className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: HealthActivity["category"]) => {
    switch (category) {
      case "exercise":
        return { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" };
      case "meditation":
        return { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" };
      case "sleep":
        return { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" };
      case "nutrition":
        return { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" };
    }
  };

  const completedCount = activities.filter((a) => a.completed).length;
  const totalCount = activities.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card hover className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              Daily Goals
            </div>
            <span className="text-sm font-medium text-gray-500">
              {completedCount}/{totalCount}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-primary rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {progress === 100
                ? "Amazing! All goals completed! 🎉"
                : `${Math.round(progress)}% complete - Keep going!`}
            </p>
          </div>

          {/* Activities List */}
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const colors = getCategoryColor(activity.category);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all cursor-pointer",
                    activity.completed
                      ? "bg-gray-50 border-gray-200"
                      : `bg-white ${colors.border} hover:${colors.bg}`,
                    !activity.completed && "hover:scale-[1.01]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                        activity.completed
                          ? "bg-green-500 text-white"
                          : `bg-white border-2 ${colors.border} ${colors.text}`
                      )}
                    >
                      {activity.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        getCategoryIcon(activity.category)
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4
                          className={cn(
                            "font-medium",
                            activity.completed && "line-through text-gray-400"
                          )}
                        >
                          {activity.title}
                        </h4>
                        {activity.streak > 1 && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                            🔥 {activity.streak}
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-sm",
                          activity.completed ? "text-gray-400" : "text-gray-500"
                        )}
                      >
                        {activity.description}
                      </p>
                    </div>

                    {/* Duration */}
                    {activity.duration_minutes > 0 && (
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration_minutes}m</span>
                      </div>
                    )}

                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivityPlans;

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { healthGoals } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  TrendingUp,
  Check,
  Clock,
  AlertCircle,
  Plus,
  Sparkles,
  Trophy,
  Flame,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthGoalsProps {
  compact?: boolean;
}

export default function HealthGoals({ compact = false }: HealthGoalsProps) {
  const [showAddGoal, setShowAddGoal] = React.useState(false);
  
  const highPriorityGoals = healthGoals.filter((g) => g.priority === "high" && g.progress < 100);
  const activeGoals = healthGoals.filter((g) => g.progress < 100);
  const completedGoals = healthGoals.filter((g) => g.progress >= 100);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-amber-500";
    return "bg-red-500";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "exercise":
        return <TrendingUp className="w-4 h-4" />;
      case "nutrition":
        return <Target className="w-4 h-4" />;
      case "sleep":
        return <Clock className="w-4 h-4" />;
      case "medication":
        return <Check className="w-4 h-4" />;
      case "vitals":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "exercise":
        return "text-blue-500 bg-blue-50";
      case "nutrition":
        return "text-green-500 bg-green-50";
      case "sleep":
        return "text-purple-500 bg-purple-50";
      case "medication":
        return "text-rose-500 bg-rose-50";
      case "vitals":
        return "text-amber-500 bg-amber-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const formatDeadline = (date: string) => {
    const deadline = new Date(date);
    const now = new Date();
    const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    return `${diff} days left`;
  };

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              Health Goals
            </div>
            <span className="text-xs text-gray-400">{activeGoals.length} active</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeGoals.slice(0, 3).map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-6 h-6 rounded-full flex items-center justify-center", getCategoryColor(goal.category))}>
                      {getCategoryIcon(goal.category)}
                    </span>
                    <span className="font-medium text-sm">{goal.title}</span>
                  </div>
                  {goal.ai_generated && (
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", getProgressColor(goal.progress))}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{goal.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>
          {highPriorityGoals.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {highPriorityGoals.length} high priority goal{highPriorityGoals.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Goals</h2>
          <p className="text-gray-500">AI-powered recommendations based on your health data</p>
        </div>
        <Button onClick={() => setShowAddGoal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* AI Summary Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0 text-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">AI Health Analysis</h3>
              <p className="text-white/80 text-sm">
                Based on your recent health data, we recommend focusing on lowering your blood pressure
                and improving sleep quality. Your activity levels are good, but reducing sodium intake
                could significantly improve your cardiovascular health.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 rounded-xl bg-white/10">
              <p className="text-2xl font-bold">{activeGoals.length}</p>
              <p className="text-xs text-white/70">Active Goals</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/10">
              <p className="text-2xl font-bold">{completedGoals.length}</p>
              <p className="text-xs text-white/70">Completed</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/10">
              <p className="text-2xl font-bold">{highPriorityGoals.length}</p>
              <p className="text-xs text-white/70">High Priority</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Priority Goals */}
      {highPriorityGoals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            High Priority Goals
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {highPriorityGoals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                index={index}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
                getProgressColor={getProgressColor}
                formatDeadline={formatDeadline}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Active Goals */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Active Goals
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeGoals.filter((g) => g.priority !== "high").map((goal, index) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              index={index}
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
              getProgressColor={getProgressColor}
              formatDeadline={formatDeadline}
            />
          ))}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-green-500" />
            Recently Completed
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedGoals.slice(0, 3).map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl border-2 border-green-200 bg-green-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-8 h-8 rounded-full flex items-center justify-center", getCategoryColor(goal.category))}>
                      {getCategoryIcon(goal.category)}
                    </span>
                    <span className="font-medium text-gray-900">{goal.title}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">{goal.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600">Goal completed!</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <AddGoalModal onClose={() => setShowAddGoal(false)} />
      )}
    </div>
  );
}

interface GoalCardProps {
  goal: typeof healthGoals[0];
  index: number;
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
  getProgressColor: (progress: number) => string;
  formatDeadline: (date: string) => string;
}

function GoalCard({
  goal,
  index,
  getCategoryIcon,
  getCategoryColor,
  getProgressColor,
  formatDeadline,
}: GoalCardProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all cursor-pointer group"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn("w-8 h-8 rounded-full flex items-center justify-center", getCategoryColor(goal.category))}>
            {getCategoryIcon(goal.category)}
          </span>
          <div>
            <h4 className="font-medium text-gray-900">{goal.title}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              {goal.ai_generated && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI
                </span>
              )}
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                goal.priority === "high" && "bg-red-100 text-red-600",
                goal.priority === "medium" && "bg-amber-100 text-amber-600",
                goal.priority === "low" && "bg-gray-100 text-gray-600"
              )}>
                {goal.priority}
              </span>
            </div>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">{goal.description}</p>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500">Progress</span>
          <span className="text-sm font-medium">{goal.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", getProgressColor(goal.progress))}
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
          <span>{goal.current_value} / {goal.target_value} {goal.unit}</span>
          <span>{formatDeadline(goal.deadline)}</span>
        </div>
      </div>

      {showDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="pt-3 border-t"
        >
          <div className="flex items-center gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors">
              Update Progress
            </button>
            <button className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
              View Details
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function AddGoalModal({ onClose }: { onClose: () => void }) {
  const [goalType, setGoalType] = React.useState("exercise");
  const [targetValue, setTargetValue] = React.useState("");
  const [deadline, setDeadline] = React.useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-md w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Goal</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Type</label>
            <div className="grid grid-cols-3 gap-2">
              {["exercise", "nutrition", "sleep", "vitals", "meditation"].map((type) => (
                <button
                  key={type}
                  onClick={() => setGoalType(type)}
                  className={cn(
                    "p-3 rounded-xl border-2 text-sm font-medium transition-all capitalize",
                    goalType === type
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
            <input
              type="text"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="e.g., 10000 steps"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1">
            Create Goal
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import Sidebar from "@/components/shared/sidebar";
import VitalsTracker from "@/components/user/health/VitalsTracker";
import VitalsInput from "@/components/user/health/VitalsInput";
import VitalsChart from "@/components/user/health/VitalsChart";
import SymptomChecker from "@/components/user/health/SymptomChecker";
import HealthGoals from "@/components/user/health/HealthGoals";
import RiskAssessment from "@/components/user/health/RiskAssessment";
import ExportReport from "@/components/user/health/ExportReport";
import MedicalHistory from "@/components/user/health/MedicalHistory";
import AIHealthSummary from "@/components/user/health/AIHealthSummary";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Activity,
  Stethoscope,
  Target,
  ShieldAlert,
  FileText,
  History,
  Brain,
  ChevronRight,
} from "lucide-react";

type TabType = "overview" | "vitals" | "symptoms" | "goals" | "risks" | "export" | "history";

const tabs = [
  { id: "overview" as const, label: "Overview", icon: Brain },
  { id: "vitals" as const, label: "Vitals", icon: Activity },
  { id: "symptoms" as const, label: "Symptom Checker", icon: Stethoscope },
  { id: "goals" as const, label: "Health Goals", icon: Target },
  { id: "risks" as const, label: "Risk Assessment", icon: ShieldAlert },
  { id: "history" as const, label: "Medical History", icon: History },
  { id: "export" as const, label: "Export Report", icon: FileText },
];

export default function MyHealthPage() {
  const [activeTab, setActiveTab] = React.useState<TabType>("overview");
  const [showVitalsInput, setShowVitalsInput] = React.useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <AIHealthSummary />
            <div className="grid lg:grid-cols-2 gap-6">
              <VitalsTracker compact />
              <HealthGoals compact />
            </div>
            <RiskAssessment compact />
          </div>
        );
      case "vitals":
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setShowVitalsInput(true)}
                className="px-6 py-3 bg-gradient-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Record New Vitals
              </button>
            </div>
            <VitalsChart />
            <VitalsTracker />
            {showVitalsInput && (
              <VitalsInput onClose={() => setShowVitalsInput(false)} />
            )}
          </div>
        );
      case "symptoms":
        return <SymptomChecker />;
      case "goals":
        return <HealthGoals />;
      case "risks":
        return <RiskAssessment />;
      case "history":
        return <MedicalHistory />;
      case "export":
        return <ExportReport />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="health" />
      
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Health</h1>
                <p className="text-gray-500">Monitor your health metrics and get AI-powered insights</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            variants={staggerItem}
            className="mb-6 overflow-x-auto pb-2"
          >
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200
                      ${isActive 
                        ? "bg-gradient-primary text-white shadow-lg" 
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="ml-1"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

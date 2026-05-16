"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { diseaseRisks } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Activity,
  Heart,
  Droplet,
  Brain,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskAssessmentProps {
  compact?: boolean;
}

const riskColors = {
  very_high: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    badge: "bg-red-100 text-red-700",
    icon: AlertTriangle,
  },
  high: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    icon: AlertTriangle,
  },
  medium: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    icon: AlertCircle,
  },
  low: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    badge: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
};

const relatedIcons: Record<string, React.ElementType> = {
  "Hypertension (High Blood Pressure)": Heart,
  "Type 2 Diabetes": Droplet,
  "Cardiovascular Disease": Activity,
  "Stroke": Brain,
  "Obesity": Activity,
};

export default function RiskAssessment({ compact = false }: RiskAssessmentProps) {
  const [expandedRisk, setExpandedRisk] = React.useState<string | null>(null);

  const highRisks = diseaseRisks.filter((r) => r.risk_level === "high" || r.risk_level === "very_high");
  const overallHealthScore = Math.round(
    100 - (diseaseRisks.reduce((acc, r) => acc + r.risk_percentage, 0) / diseaseRisks.length)
  );

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-white" />
              </div>
              Disease Risk Assessment
            </div>
            {highRisks.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                {highRisks.length} needs attention
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diseaseRisks.slice(0, 3).map((risk, index) => {
              const colors = riskColors[risk.risk_level];
              const Icon = relatedIcons[risk.disease_name] || ShieldAlert;
              return (
                <motion.div
                  key={risk.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn("p-3 rounded-xl border", colors.bg, colors.border)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("w-4 h-4", colors.text)} />
                      <span className="font-medium text-sm">{risk.disease_name}</span>
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full", colors.badge)}>
                      {risk.risk_percentage}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {highRisks.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                {highRisks.length} condition{highRisks.length > 1 ? "s" : ""} require attention
              </p>
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
          <h2 className="text-2xl font-bold text-gray-900">Disease Risk Assessment</h2>
          <p className="text-gray-500">AI analysis based on your health history and current metrics</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Health Score</p>
                <p className="text-4xl font-bold">{overallHealthScore}</p>
                <p className="text-blue-200 text-xs mt-1">out of 100</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-500 border-0 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Conditions to Monitor</p>
                <p className="text-4xl font-bold">{highRisks.length}</p>
                <p className="text-amber-200 text-xs mt-1">require attention</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Low Risk Conditions</p>
                <p className="text-4xl font-bold">
                  {diseaseRisks.filter((r) => r.risk_level === "low").length}
                </p>
                <p className="text-green-200 text-xs mt-1">well controlled</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Cards */}
      <div className="space-y-4">
        {diseaseRisks.map((risk, index) => {
          const colors = riskColors[risk.risk_level];
          const Icon = relatedIcons[risk.disease_name] || ShieldAlert;
          const isExpanded = expandedRisk === risk.id;

          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn("rounded-2xl border-2 overflow-hidden", colors.bg, colors.border)}
            >
              <button
                onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                className="w-full p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-white/50")}>
                    <Icon className={cn("w-6 h-6", colors.text)} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{risk.disease_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full", colors.badge)}>
                        {risk.risk_level.replace("_", " ")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {risk.affected_by_conditions.length > 0 && `Related: ${risk.affected_by_conditions[0]}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{risk.risk_percentage}%</p>
                    <p className="text-xs text-gray-500">risk level</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="border-t border-gray-200/50 p-5 bg-white/30"
                >
                  {/* Risk Meter */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="font-medium">{risk.risk_percentage}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={cn("h-full rounded-full", {
                          "bg-red-500": risk.risk_level === "very_high",
                          "bg-amber-500": risk.risk_level === "high",
                          "bg-blue-500": risk.risk_level === "medium",
                          "bg-green-500": risk.risk_level === "low",
                        })}
                        initial={{ width: 0 }}
                        animate={{ width: `${risk.risk_percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Contributing Factors */}
                  {risk.contributing_factors.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <AlertCircle className={cn("w-4 h-4", colors.text)} />
                        Contributing Factors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {risk.contributing_factors.map((factor, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-blue-500" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {risk.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
                      Learn More
                    </button>
                    {(risk.risk_level === "high" || risk.risk_level === "very_high") && (
                      <button className="flex-1 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        <Stethoscope className="w-4 h-4" />
                        Consult Doctor
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">About This Assessment</h4>
              <p className="text-sm text-blue-700 mt-1">
                This risk assessment is generated by our AI system based on your medical history,
                current health metrics, and family health history. It should be used as a guide
                and not as a medical diagnosis. Always consult with a healthcare professional for
                personalized medical advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

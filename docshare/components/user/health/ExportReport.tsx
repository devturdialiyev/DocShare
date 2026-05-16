"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  extendedVitals,
  medicalRecords,
  currentUser,
  healthGoals,
  diseaseRisks,
} from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Share2,
  Mail,
  Calendar,
  CheckSquare,
  Square,
  Printer,
  FileJson,
  FileSpreadsheet,
  Copy,
  Check,
  Heart,
  Activity,
  Droplet,
  Brain,
  History,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExportReport() {
  const [selectedSections, setSelectedSections] = React.useState<string[]>([
    "vitals",
    "medical_records",
    "goals",
    "risks",
  ]);
  const [reportFormat, setReportFormat] = React.useState<"pdf" | "json" | "csv">("pdf");
  const [dateRange, setDateRange] = React.useState<"7d" | "30d" | "90d" | "all">("30d");
  const [includeCharts, setIncludeCharts] = React.useState(true);
  const [includeRecommendations, setIncludeRecommendations] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);
  const [generated, setGenerated] = React.useState(false);

  const sections = [
    { id: "vitals", label: "Vitals History", icon: Heart, description: "Blood pressure, heart rate, SpO2, weight, glucose" },
    { id: "medical_records", label: "Medical History", icon: History, description: "Past diagnoses, treatments, and doctor visits" },
    { id: "goals", label: "Health Goals", icon: Target, description: "Current goals, progress, and AI recommendations" },
    { id: "risks", label: "Risk Assessment", icon: Brain, description: "Disease risk analysis and contributing factors" },
  ];

  const toggleSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(`https://docshare.uz/health-report/${currentUser.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Export Health Report</h2>
          <p className="text-gray-500">Generate and share your health data with your doctor</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Select Sections to Include
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isSelected = selectedSections.includes(section.id);
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            isSelected ? "bg-blue-100" : "bg-gray-100"
                          )}>
                            <Icon className={cn("w-5 h-5", isSelected ? "text-blue-500" : "text-gray-400")} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{section.label}</p>
                            <p className="text-sm text-gray-500">{section.description}</p>
                          </div>
                        </div>
                        {isSelected ? (
                          <CheckSquare className="w-6 h-6 text-blue-500" />
                        ) : (
                          <Square className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Report Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Report Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="flex gap-2">
                  {(["7d", "30d", "90d", "all"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range)}
                      className={cn(
                        "flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                        dateRange === range
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      )}
                    >
                      {range === "all" ? "All Time" : `Last ${range}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIncludeCharts(!includeCharts)}
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all",
                    includeCharts
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-400"
                  )}
                >
                  {includeCharts ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  <span className="text-sm font-medium">Include Charts</span>
                </button>
                <button
                  onClick={() => setIncludeRecommendations(!includeRecommendations)}
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all",
                    includeRecommendations
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-400"
                  )}
                >
                  {includeRecommendations ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  <span className="text-sm font-medium">AI Recommendations</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Report Preview
                </span>
                <span className="text-xs text-gray-400 font-normal">
                  {selectedSections.length} sections selected
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-xl p-6 min-h-[300px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">DocShare Health Report</h3>
                      <p className="text-sm text-gray-500">Patient: {currentUser.full_name}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>Generated: {new Date().toLocaleDateString()}</p>
                      <p>Period: {dateRange === "all" ? "All Time" : `Last ${dateRange}`}</p>
                    </div>
                  </div>

                  {selectedSections.includes("vitals") && (
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-rose-500" />
                        Vitals Summary
                      </h4>
                      <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Blood Pressure (Latest):</span>
                          <span className="font-medium">{extendedVitals[0].bp_sys}/{extendedVitals[0].bp_dia} mmHg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Heart Rate (Latest):</span>
                          <span className="font-medium">{extendedVitals[0].hr_bpm} BPM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">SpO2 (Latest):</span>
                          <span className="font-medium">{extendedVitals[0].spo2}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedSections.includes("medical_records") && (
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <History className="w-4 h-4 text-blue-500" />
                        Medical History ({medicalRecords.length} records)
                      </h4>
                      <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                        {medicalRecords.slice(0, 2).map((record) => (
                          <div key={record.id} className="flex justify-between">
                            <span className="text-gray-500">{record.title}:</span>
                            <span className="font-medium truncate ml-2">{record.diagnosis}</span>
                          </div>
                        ))}
                        {medicalRecords.length > 2 && (
                          <p className="text-gray-400 text-center">+ {medicalRecords.length - 2} more records</p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedSections.includes("goals") && (
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-green-500" />
                        Health Goals ({healthGoals.filter((g) => g.progress < 100).length} active)
                      </h4>
                      <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                        {healthGoals.filter((g) => g.progress < 100).slice(0, 2).map((goal) => (
                          <div key={goal.id} className="flex justify-between items-center">
                            <span className="text-gray-500">{goal.title}:</span>
                            <span className="font-medium">{goal.progress}% complete</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSections.includes("risks") && (
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-amber-500" />
                        Risk Assessment
                      </h4>
                      <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                        {diseaseRisks.slice(0, 2).map((risk) => (
                          <div key={risk.id} className="flex justify-between">
                            <span className="text-gray-500">{risk.disease_name}:</span>
                            <span className={cn(
                              "font-medium",
                              risk.risk_level === "high" && "text-amber-600",
                              risk.risk_level === "medium" && "text-blue-600",
                              risk.risk_level === "low" && "text-green-600"
                            )}>
                              {risk.risk_percentage}% ({risk.risk_level})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-500" />
                Export Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button
                  onClick={() => setReportFormat("pdf")}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all",
                    reportFormat === "pdf"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <FileText className={cn("w-6 h-6", reportFormat === "pdf" ? "text-blue-500" : "text-gray-400")} />
                  <div className="text-left">
                    <p className="font-medium">PDF Document</p>
                    <p className="text-xs text-gray-500">Best for printing & sharing</p>
                  </div>
                </button>
                <button
                  onClick={() => setReportFormat("json")}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all",
                    reportFormat === "json"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <FileJson className={cn("w-6 h-6", reportFormat === "json" ? "text-blue-500" : "text-gray-400")} />
                  <div className="text-left">
                    <p className="font-medium">JSON Data</p>
                    <p className="text-xs text-gray-500">For developers & systems</p>
                  </div>
                </button>
                <button
                  onClick={() => setReportFormat("csv")}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all",
                    reportFormat === "csv"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <FileSpreadsheet className={cn("w-6 h-6", reportFormat === "csv" ? "text-blue-500" : "text-gray-400")} />
                  <div className="text-left">
                    <p className="font-medium">CSV Spreadsheet</p>
                    <p className="text-xs text-gray-500">For data analysis</p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {generated ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                    <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium text-green-800">Report Generated!</p>
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Report
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={generating || selectedSections.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {generating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or share via link</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyShareLink}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
                </button>
                <button className="flex-1 px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Email</span>
                </button>
              </div>

              <button className="w-full px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Share to Doctor Portal</span>
              </button>
            </CardContent>
          </Card>

          {/* Doctor Access */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Doctor Access</h4>
                  <p className="text-sm text-blue-700 mt-1 mb-3">
                    Generate a secure link that your doctor can use to view your health report directly.
                  </p>
                  <Button size="sm" variant="secondary" className="bg-white">
                    Generate Access Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

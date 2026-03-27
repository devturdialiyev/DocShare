"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileText, User, Calendar, Clock, ChevronRight, Activity } from "lucide-react";

interface HistoryEntry {
  id: string;
  patientName: string;
  date: string;
  type: "consultation" | "procedure" | "follow-up" | "emergency";
  diagnosis: string;
  notes: string;
  status: "completed" | "pending";
}

const history: HistoryEntry[] = [
  {
    id: "1",
    patientName: "Sarvar Tashpulatov",
    date: "Today, 11:30",
    type: "consultation",
    diagnosis: "Hypertension Stage 1",
    notes: "BP elevated. Prescribed Amlodipine 5mg. Lifestyle modifications advised.",
    status: "completed",
  },
  {
    id: "2",
    patientName: "Malika Karimova",
    date: "Today, 10:45",
    type: "follow-up",
    diagnosis: "Post-MI Recovery",
    notes: "Patient showing good recovery. ECG normal. Continue current medication.",
    status: "completed",
  },
  {
    id: "3",
    patientName: "Jasur Yusupov",
    date: "Today, 10:00",
    type: "procedure",
    diagnosis: "ECG Analysis",
    notes: "ECG shows normal sinus rhythm. No abnormalities detected.",
    status: "completed",
  },
  {
    id: "4",
    patientName: "Nodira Rahimova",
    date: "Yesterday",
    type: "consultation",
    diagnosis: "Arrhythmia Investigation",
    notes: "Holter monitor results reviewed. Recommended ablation therapy.",
    status: "completed",
  },
  {
    id: "5",
    patientName: "Aziz Karimov",
    date: "Mar 20",
    type: "emergency",
    diagnosis: "Acute Chest Pain",
    notes: "Patient stabilized. Serial ECGs and troponin tests negative.",
    status: "completed",
  },
];

const ServiceHistory = () => {
  const getTypeStyles = (type: HistoryEntry["type"]) => {
    switch (type) {
      case "consultation":
        return { bg: "bg-blue-100", text: "text-blue-700", icon: User };
      case "procedure":
        return { bg: "bg-purple-100", text: "text-purple-700", icon: Activity };
      case "follow-up":
        return { bg: "bg-green-100", text: "text-green-700", icon: Calendar };
      case "emergency":
        return { bg: "bg-red-100", text: "text-red-700", icon: FileText };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            Service History
          </CardTitle>
          <span className="text-sm text-gray-500">Last 7 days</span>
        </CardHeader>
        <CardContent>
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Timeline Items */}
            <div className="space-y-4">
              {history.map((entry, index) => {
                const styles = getTypeStyles(entry.type);
                const Icon = styles.icon;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="relative flex items-start gap-4 pl-4"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={cn(
                        "absolute left-4 w-4 h-4 rounded-full border-4 border-white",
                        entry.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                      )}
                    />

                    {/* Content */}
                    <div className="flex-1 ml-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              styles.bg
                            )}
                          >
                            <Icon className={cn("w-5 h-5", styles.text)} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-800">
                                {entry.patientName}
                              </h4>
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded-full text-xs font-medium",
                                  styles.bg,
                                  styles.text
                                )}
                              >
                                {entry.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {entry.diagnosis}
                            </p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {entry.notes}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {entry.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {entry.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* View All */}
          <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Complete History
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceHistory;

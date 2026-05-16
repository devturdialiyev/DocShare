"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AuditLog } from "@/lib/mock/data";
import { FileText, Clock, User, ChevronRight, Download, Filter } from "lucide-react";

interface AuditLogsProps {
  logs: AuditLog[];
}

const AuditLogs = ({ logs }: AuditLogsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="bg-gray-900 border-gray-800 h-full">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Recent Activity
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{log.action}</h4>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      <span className="text-purple-400">{log.actor}</span>
                      {" → "}
                      <span className="text-gray-300">{log.target}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <div className="p-4 border-t border-gray-800">
            <button className="w-full py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View Full Audit Trail
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuditLogs;

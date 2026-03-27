"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, X, Bell, CheckCircle } from "lucide-react";

interface AlertsFeedProps {
  alerts: Alert[];
}

const AlertsFeed = ({ alerts }: AlertsFeedProps) => {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-500/10 border-red-500/30 hover:bg-red-500/20";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20";
      case "info":
        return "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gray-900 border-gray-800 h-full">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-400" />
              System Alerts
            </div>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
              {alerts.length} Active
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer",
                  getAlertStyles(alert.type)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-white">{alert.title}</h4>
                      <button className="text-gray-500 hover:text-gray-300 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mark All Read */}
          <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Mark all as read
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlertsFeed;

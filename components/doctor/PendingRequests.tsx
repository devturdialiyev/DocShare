"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Clock, AlertCircle, Check, X, Calendar, RefreshCw } from "lucide-react";

interface Request {
  id: string;
  patientName: string;
  age: number;
  reason: string;
  preferredTime: string;
  urgency: "normal" | "urgent" | "critical";
  submittedAt: string;
}

const requests: Request[] = [
  {
    id: "1",
    patientName: "Nodira Rahimova",
    age: 35,
    reason: "Persistent headache for 3 days",
    preferredTime: "Tomorrow, 14:00",
    urgency: "urgent",
    submittedAt: "2 hours ago",
  },
  {
    id: "2",
    patientName: "Aziz Karimov",
    age: 52,
    reason: "Annual cardiac checkup",
    preferredTime: "Mar 26, 10:00",
    urgency: "normal",
    submittedAt: "5 hours ago",
  },
  {
    id: "3",
    patientName: "Sarvar Toshpulatov",
    age: 67,
    reason: "Shortness of breath, chest discomfort",
    preferredTime: "Today, 16:00",
    urgency: "critical",
    submittedAt: "1 hour ago",
  },
  {
    id: "4",
    patientName: "Dilshoda Mahmudova",
    age: 29,
    reason: "Prescription renewal for hypertension medication",
    preferredTime: "Mar 27, 11:00",
    urgency: "normal",
    submittedAt: "1 day ago",
  },
];

const PendingRequests = () => {
  const getUrgencyStyles = (urgency: Request["urgency"]) => {
    switch (urgency) {
      case "critical":
        return {
          bg: "bg-red-50 border-red-200",
          badge: "bg-red-100 text-red-700",
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        };
      case "urgent":
        return {
          bg: "bg-orange-50 border-orange-200",
          badge: "bg-orange-100 text-orange-700",
          icon: <Clock className="w-4 h-4 text-orange-500" />,
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          badge: "bg-gray-100 text-gray-700",
          icon: <Clock className="w-4 h-4 text-gray-500" />,
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            Pending Requests
          </CardTitle>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
            {requests.length} pending
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request, index) => {
              const styles = getUrgencyStyles(request.urgency);
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all",
                    styles.bg
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Patient Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800">
                            {request.patientName}
                          </h4>
                          <span className="text-sm text-gray-500">({request.age}y)</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.preferredTime}
                          </span>
                          <span>{request.submittedAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Urgency Badge */}
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                        styles.badge
                      )}
                    >
                      {styles.icon}
                      {request.urgency}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost" className="text-blue-600">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reschedule
                    </Button>
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

export default PendingRequests;

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Hospital } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { Building2, Users, Activity, MoreVertical, MapPin } from "lucide-react";

interface HospitalManagementProps {
  hospitals: Hospital[];
}

const HospitalManagement = ({ hospitals }: HospitalManagementProps) => {
  const sortedHospitals = [...hospitals].sort((a, b) => b.occupancy - a.occupancy);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-gray-900 border-gray-800 h-full">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Hospital Rankings
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View All
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800">
            {sortedHospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                      index === 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : index === 1
                        ? "bg-gray-400/20 text-gray-300"
                        : index === 2
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-gray-700/50 text-gray-500"
                    )}
                  >
                    #{index + 1}
                  </div>

                  {/* Hospital Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">
                      {hospital.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {hospital.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {hospital.doctors} doctors
                      </span>
                    </div>
                  </div>

                  {/* Occupancy */}
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span
                        className={cn(
                          "font-semibold",
                          hospital.occupancy >= 80
                            ? "text-red-400"
                            : hospital.occupancy >= 60
                            ? "text-yellow-400"
                            : "text-green-400"
                        )}
                      >
                        {hospital.occupancy}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">occupancy</p>
                  </div>

                  {/* Actions */}
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Occupancy Bar */}
                <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${hospital.occupancy}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      hospital.occupancy >= 80
                        ? "bg-red-500"
                        : hospital.occupancy >= 60
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HospitalManagement;

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPin, TrendingUp, Activity } from "lucide-react";

interface RegionDemand {
  id: string;
  name: string;
  demand: number;
  patients: number;
  growth: number;
}

const regions: RegionDemand[] = [
  { id: "1", name: "Tashkent", demand: 92, patients: 2450, growth: 12 },
  { id: "2", name: "Samarkand", demand: 78, patients: 1230, growth: 8 },
  { id: "3", name: "Fergana", demand: 72, patients: 980, growth: 15 },
  { id: "4", name: "Bukhara", demand: 65, patients: 720, growth: 5 },
  { id: "5", name: "Navoi", demand: 45, patients: 340, growth: -2 },
];

const DemandMap = () => {
  const getDemandColor = (demand: number) => {
    if (demand >= 80) return "bg-red-500";
    if (demand >= 60) return "bg-orange-500";
    if (demand >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getDemandLabel = (demand: number) => {
    if (demand >= 80) return "Very High";
    if (demand >= 60) return "High";
    if (demand >= 40) return "Medium";
    return "Low";
  };

  const maxDemand = Math.max(...regions.map((r) => r.demand));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            Specialty Demand
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl mb-6 overflow-hidden">
            {/* Simplified Map Visualization */}
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2 w-full max-w-md">
                {regions.slice(0, 5).map((region, index) => {
                  const size = 40 + (region.demand / maxDemand) * 40;
                  return (
                    <motion.div
                      key={region.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "rounded-full flex items-center justify-center text-white text-xs font-medium",
                        getDemandColor(region.demand),
                        index === 0 && "col-span-2 row-span-2"
                      )}
                      style={{
                        width: size,
                        height: size,
                        opacity: 0.6 + (region.demand / maxDemand) * 0.4,
                      }}
                    >
                      <span className={cn(index === 0 && "text-sm font-bold")}>
                        {region.name.slice(0, 3)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Med</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>V.High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Region List */}
          <div className="space-y-3">
            {regions.map((region, index) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold",
                    getDemandColor(region.demand)
                  )}
                >
                  {region.demand}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{region.name}</h4>
                  <p className="text-sm text-gray-500">
                    {region.patients.toLocaleString()} patients
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      "text-sm font-medium flex items-center gap-1",
                      region.growth >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {region.growth >= 0 ? "+" : ""}
                    {region.growth}%
                  </span>
                  <p className="text-xs text-gray-500">
                    {getDemandLabel(region.demand)} demand
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DemandMap;

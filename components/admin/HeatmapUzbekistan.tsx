"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { uzbekistanRegions } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { Map, TrendingUp, Activity, Shield } from "lucide-react";

interface HeatmapUzbekistanProps {
  regions: typeof uzbekistanRegions;
}

type LayerType = "demand" | "diseases" | "hospitals";

const HeatmapUzbekistan = ({ regions }: HeatmapUzbekistanProps) => {
  const [activeLayer, setActiveLayer] = React.useState<LayerType>("demand");

  const layers = [
    { id: "demand" as LayerType, label: "Demand", icon: TrendingUp, color: "text-orange-400" },
    { id: "diseases" as LayerType, label: "Diseases", icon: Activity, color: "text-red-400" },
    { id: "hospitals" as LayerType, label: "Hospitals", icon: Shield, color: "text-blue-400" },
  ];

  const getIntensity = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  const getHeatColor = (value: number, max: number, layer: LayerType) => {
    const intensity = getIntensity(value, max);
    if (layer === "demand") {
      if (intensity >= 70) return "bg-red-500";
      if (intensity >= 50) return "bg-orange-500";
      return "bg-yellow-500";
    }
    if (layer === "diseases") {
      if (intensity >= 50) return "bg-red-500";
      if (intensity >= 30) return "bg-orange-500";
      return "bg-green-500";
    }
    return "bg-blue-500";
  };

  const getLayerValue = (region: typeof uzbekistanRegions[0], layer: LayerType) => {
    switch (layer) {
      case "demand":
        return region.demand;
      case "diseases":
        return region.diseases;
      case "hospitals":
        return region.hospitals;
      default:
        return region.demand;
    }
  };

  const maxValues = {
    demand: Math.max(...regions.map((r) => r.demand)),
    diseases: Math.max(...regions.map((r) => r.diseases)),
    hospitals: Math.max(...regions.map((r) => r.hospitals)),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-gray-900 border-gray-800 h-full">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-green-400" />
              Uzbekistan Map
            </div>
            <div className="flex items-center gap-2">
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      activeLayer === layer.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", layer.color)} />
                    <span className="hidden sm:inline">{layer.label}</span>
                  </button>
                );
              })}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map Visualization */}
          <div className="relative aspect-video bg-gray-800/50 rounded-xl overflow-hidden mb-6">
            {/* Simplified Map Grid */}
            <div className="absolute inset-4 grid grid-cols-5 gap-2">
              {regions.map((region, index) => {
                const value = getLayerValue(region, activeLayer);
                const max = maxValues[activeLayer];
                return (
                  <motion.div
                    key={region.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "relative rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-105",
                      getHeatColor(value, max, activeLayer),
                      value >= max * 0.7 && "animate-pulse"
                    )}
                    style={{ opacity: 0.4 + (value / max) * 0.6 }}
                  >
                    <span className="text-xs font-bold text-white truncate px-1">
                      {region.name.slice(0, 3)}
                    </span>
                    <div className="absolute inset-0 bg-black/20 rounded-lg" />
                  </motion.div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span className="text-gray-300">Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-yellow-500" />
                  <span className="text-gray-300">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span className="text-gray-300">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Region Details */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {regions.slice(0, 5).map((region) => {
              const value = getLayerValue(region, activeLayer);
              const max = maxValues[activeLayer];
              return (
                <div
                  key={region.id}
                  className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <p className="text-sm text-white font-medium truncate">
                    {region.name}
                  </p>
                  <p className="text-lg font-bold text-white">{value}</p>
                  <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", getHeatColor(value, max, activeLayer))}
                      style={{ width: `${(value / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeatmapUzbekistan;

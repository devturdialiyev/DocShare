"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { extendedVitals } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Heart,
  Activity,
  Droplet,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MetricType = "bp" | "hr" | "spo2" | "weight" | "glucose";

const metricConfig = {
  bp: {
    label: "Blood Pressure",
    unit: "mmHg",
    icon: Activity,
    color: "blue",
    dataKey: "bp_sys",
    secondaryDataKey: "bp_dia",
    normalRange: { min: 90, max: 120 },
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  hr: {
    label: "Heart Rate",
    unit: "BPM",
    icon: Heart,
    color: "rose",
    dataKey: "hr_bpm",
    secondaryDataKey: undefined,
    normalRange: { min: 60, max: 100 },
    gradient: "from-rose-500 to-pink-500",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  spo2: {
    label: "Oxygen Saturation",
    unit: "%",
    icon: Activity,
    color: "cyan",
    dataKey: "spo2",
    secondaryDataKey: undefined,
    normalRange: { min: 95, max: 100 },
    gradient: "from-cyan-500 to-teal-500",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
  weight: {
    label: "Weight",
    unit: "kg",
    icon: Droplet,
    color: "purple",
    dataKey: "weight",
    secondaryDataKey: undefined,
    normalRange: { min: 65, max: 85 },
    gradient: "from-purple-500 to-violet-500",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  glucose: {
    label: "Fasting Glucose",
    unit: "mg/dL",
    icon: Droplet,
    color: "amber",
    dataKey: "fasting_glucose",
    secondaryDataKey: undefined,
    normalRange: { min: 70, max: 100 },
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
  },
};

export default function VitalsChart() {
  const [activeMetric, setActiveMetric] = React.useState<MetricType>("bp");
  const [timeRange, setTimeRange] = React.useState<"7d" | "14d" | "30d">("14d");
  const [showDetails, setShowDetails] = React.useState(true);

  const config = metricConfig[activeMetric];
  const Icon = config.icon;
  const colorClasses: Record<string, string> = {
    blue: "text-blue-500",
    rose: "text-rose-500",
    cyan: "text-cyan-500",
    purple: "text-purple-500",
    amber: "text-amber-500",
  };

  const dataRange = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : extendedVitals.length;
  const chartData = extendedVitals.slice(0, dataRange).reverse();

  const values = chartData.map((d) => d[config.dataKey as keyof typeof d] as number);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const avgVal = values.reduce((a, b) => a + b, 0) / values.length;
  const latest = values[values.length - 1];
  const previous = values[values.length - 2];
  const trend = latest - previous;

  const isAboveNormal = latest > config.normalRange.max;
  const isBelowNormal = latest < config.normalRange.min;
  const isAbnormal = isAboveNormal || isBelowNormal;

  const getSVGPath = () => {
    const width = 100;
    const height = 100;
    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const range = maxVal - minVal || 1;
    
    const points = chartData.map((d, i) => {
      const x = padding + (i / (chartData.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((d[config.dataKey as keyof typeof d] as number - minVal) / range) * chartHeight;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  const getAreaPath = () => {
    const width = 100;
    const height = 100;
    const padding = 10;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const range = maxVal - minVal || 1;
    
    const points = chartData.map((d, i) => {
      const x = padding + (i / (chartData.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((d[config.dataKey as keyof typeof d] as number - minVal) / range) * chartHeight;
      return `${x},${y}`;
    });

    const lastX = padding + chartWidth;
    const bottomY = height - padding;
    const firstX = padding;

    return `M ${points.join(" L ")} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Icon className="w-4 h-4 text-white" />
            </div>
            Vital Trends
          </CardTitle>
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Metric Selector */}
            <div className="flex bg-gray-100 rounded-full p-1">
              {(Object.keys(metricConfig) as MetricType[]).map((metric) => {
                const m = metricConfig[metric];
                return (
                  <button
                    key={metric}
                    onClick={() => setActiveMetric(metric)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                      activeMetric === metric
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {m.label.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Time Range Selector */}
            <div className="flex bg-gray-100 rounded-full p-1">
              {(["7d", "14d", "30d"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    timeRange === range
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Current Value Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">{config.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-4xl font-bold", colorClasses[config.color])}>
                  {config.secondaryDataKey && chartData[chartData.length - 1] 
                    ? `${latest}/${chartData[chartData.length - 1][config.secondaryDataKey as keyof typeof chartData[0]]}`
                    : latest
                  }
                </span>
                <span className="text-gray-400">{config.unit}</span>
              </div>
            </div>
            
            {isAbnormal && (
              <div className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1",
                isAboveNormal ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
              )}>
                <AlertCircle className="w-4 h-4" />
                {isAboveNormal ? "Elevated" : "Low"}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <p className="text-gray-400">Average</p>
              <p className="font-medium text-gray-700">{avgVal.toFixed(1)} {config.unit}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Trend</p>
              <div className={cn(
                "flex items-center gap-1 font-medium",
                trend > 0 && config.color !== "rose" && "text-green-600",
                trend < 0 && config.color !== "rose" && "text-red-600",
                trend > 0 && config.color === "rose" && "text-red-600",
                trend < 0 && config.color === "rose" && "text-green-600",
                trend === 0 && "text-gray-500"
              )}>
                {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {trend > 0 ? "+" : ""}{trend.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={cn("rounded-2xl p-4 mb-4", config.bgLight)}>
          <svg viewBox="0 0 100 100" className="w-full h-48" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${activeMetric}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={config.gradient.split(" ")[0].replace("from-", "")} stopOpacity="0.3" />
                <stop offset="100%" stopColor={config.gradient.split(" ")[0].replace("from-", "")} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Area */}
            <motion.path
              d={getAreaPath()}
              fill={`url(#gradient-${activeMetric})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Line */}
            <motion.path
              d={getSVGPath()}
              fill="none"
              stroke={config.gradient.split(" ")[0].replace("from-", "rgb(").replace("-500", ")").replace("blue", "59, 130, 246").replace("rose", "244, 63, 94").replace("cyan", "6, 182, 212").replace("purple", "147, 51, 234").replace("amber", "245, 158, 11")}
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* Current Value Dot */}
            <motion.circle
              cx="90"
              cy="15"
              r="2"
              fill={config.gradient.split(" ")[0].replace("from-", "")}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            />
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{chartData[0]?.date?.slice(5)}</span>
            <span>{chartData[Math.floor(chartData.length / 2)]?.date?.slice(5)}</span>
            <span>{chartData[chartData.length - 1]?.date?.slice(5)}</span>
          </div>
        </div>

        {/* Expandable Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <span>Detailed Statistics</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t"
          >
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400">Minimum</p>
              <p className="text-lg font-bold text-gray-900">{minVal}</p>
              <p className="text-xs text-gray-400">{config.unit}</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400">Maximum</p>
              <p className="text-lg font-bold text-gray-900">{maxVal}</p>
              <p className="text-xs text-gray-400">{config.unit}</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400">Average</p>
              <p className="text-lg font-bold text-gray-900">{avgVal.toFixed(1)}</p>
              <p className="text-xs text-gray-400">{config.unit}</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400">Normal Range</p>
              <p className="text-lg font-bold text-gray-900">{config.normalRange.min}-{config.normalRange.max}</p>
              <p className="text-xs text-gray-400">{config.unit}</p>
            </div>
          </motion.div>
        )}

        {/* Alerts */}
        {isAbnormal && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">
                  {isAboveNormal ? "Elevated Value Detected" : "Below Normal Value"}
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Your {config.label.toLowerCase()} is {isAboveNormal ? "above" : "below"} the normal range.
                  {activeMetric === "bp" && " Consider reducing sodium intake and increasing physical activity."}
                  {activeMetric === "glucose" && " Monitor your diet and consider consulting with your doctor."}
                  {activeMetric === "hr" && " This could be due to stress, caffeine, or physical activity."}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

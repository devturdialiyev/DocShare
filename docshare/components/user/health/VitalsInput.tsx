"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { extendedVitals, VitalInput } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Heart,
  Droplet,
  Thermometer,
  Activity,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalsInputProps {
  onClose: () => void;
}

export default function VitalsInput({ onClose }: VitalsInputProps) {
  const [formData, setFormData] = React.useState<VitalInput>({
    hr_bpm: 72,
    bp_sys: 120,
    bp_dia: 80,
    spo2: 98,
    weight: 78.5,
    temperature: 36.6,
    fasting_glucose: 95,
    notes: "",
  });
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);

  const normalRanges = {
    hr_bpm: { min: 60, max: 100 },
    bp_sys: { min: 90, max: 120 },
    bp_dia: { min: 60, max: 80 },
    spo2: { min: 95, max: 100 },
    weight: { min: 65, max: 85 },
    temperature: { min: 36.1, max: 37.2 },
    fasting_glucose: { min: 70, max: 100 },
  };

  const getStatus = (value: number, range: { min: number; max: number }) => {
    if (value < range.min || value > range.max) return "attention";
    return "normal";
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vitals Recorded!</h2>
            <p className="text-gray-500">
              Your health data has been saved successfully. Analyzing your metrics...
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Record New Vitals</h2>
                <p className="text-sm text-gray-500">Step {step} of 2</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-primary"
              initial={{ width: "50%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heart Rate (BPM)
                  </label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                    <input
                      type="number"
                      value={formData.hr_bpm}
                      onChange={(e) => setFormData({ ...formData, hr_bpm: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {getStatus(formData.hr_bpm, normalRanges.hr_bpm) === "attention" ? (
                      <span className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Outside normal range
                      </span>
                    ) : (
                      <span className="text-xs text-green-600">Normal range: 60-100</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SpO2 (%)
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
                    <input
                      type="number"
                      value={formData.spo2}
                      onChange={(e) => setFormData({ ...formData, spo2: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {getStatus(formData.spo2, normalRanges.spo2) === "attention" ? (
                      <span className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Outside normal range
                      </span>
                    ) : (
                      <span className="text-xs text-green-600">Normal range: 95-100%</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure (mmHg)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Systolic</span>
                    <input
                      type="number"
                      value={formData.bp_sys}
                      onChange={(e) => setFormData({ ...formData, bp_sys: Number(e.target.value) })}
                      className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Diastolic</span>
                    <input
                      type="number"
                      value={formData.bp_dia}
                      onChange={(e) => setFormData({ ...formData, bp_dia: Number(e.target.value) })}
                      className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  {(getStatus(formData.bp_sys, normalRanges.bp_sys) === "attention" || 
                    getStatus(formData.bp_dia, normalRanges.bp_dia) === "attention") ? (
                    <span className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Blood pressure elevated
                    </span>
                  ) : (
                    <span className="text-xs text-green-600">Normal: &lt;120/80 mmHg</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <div className="relative">
                    <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                    <input
                      type="number"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {getStatus(formData.temperature!, normalRanges.temperature) === "attention" ? (
                      <span className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Check for fever
                      </span>
                    ) : (
                      <span className="text-xs text-green-600">Normal: 36.1-37.2°C</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fasting Glucose (mg/dL)
                </label>
                <input
                  type="number"
                  value={formData.fasting_glucose}
                  onChange={(e) => setFormData({ ...formData, fasting_glucose: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <div className="mt-1 flex items-center gap-2">
                  {getStatus(formData.fasting_glucose!, normalRanges.fasting_glucose) === "attention" ? (
                    <span className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Slightly elevated
                    </span>
                  ) : (
                    <span className="text-xs text-green-600">Normal: 70-100 mg/dL</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes about how you're feeling..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 1 ? () => setStep(2) : handleSubmit}
            className="flex-1 px-6 py-3 rounded-full bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {step === 1 ? "Next" : "Save Vitals"}
            {step === 1 && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  symptomCategories,
  symptomsByCategory,
  symptomQuestions,
  type Symptom,
} from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Stethoscope,
  Thermometer,
  Heart,
  Wind,
  Utensils,
  Bone,
  Scan,
  Droplet,
  X,
  ChevronRight,
  AlertTriangle,
  Calendar,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Thermometer,
  Wind,
  Heart,
  Utensils,
  Bone,
  Brain,
  Scan,
  Droplet,
};

type Step = "category" | "symptom" | "questions" | "result";

export default function SymptomChecker() {
  const [step, setStep] = React.useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = React.useState<Symptom | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [showResult, setShowResult] = React.useState(false);
  const [severity, setSeverity] = React.useState<"low" | "medium" | "high" | "urgent">("low");

  const symptoms = selectedCategory ? symptomsByCategory[selectedCategory as keyof typeof symptomsByCategory] : [];

  const handleSymptomSelect = (symptom: typeof symptoms[0]) => {
    setSelectedSymptom({ ...symptom, category: selectedCategory || "" });
    setStep("questions");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (severity: number) => {
    const newAnswers = [...answers, severity];
    setAnswers(newAnswers);

    const questions = symptomQuestions[selectedSymptom!.id] || symptomQuestions.fever;
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalSeverity = newAnswers.reduce((a, b) => a + b, 0);
      const avgSeverity = totalSeverity / newAnswers.length;
      
      if (avgSeverity >= 2.5 || selectedSymptom?.severity === "severe") {
        setSeverity("urgent");
      } else if (avgSeverity >= 2) {
        setSeverity("high");
      } else if (avgSeverity >= 1.5) {
        setSeverity("medium");
      } else {
        setSeverity("low");
      }
      
      setShowResult(true);
    }
  };

  const resetChecker = () => {
    setStep("category");
    setSelectedCategory(null);
    setSelectedSymptom(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const questions = selectedSymptom ? symptomQuestions[selectedSymptom.id] || symptomQuestions.fever : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            AI Symptom Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
              step === "category" && "bg-blue-500",
              step === "symptom" && "bg-blue-400",
              step === "questions" && "bg-blue-300",
              step === "result" && "bg-blue-200",
            )}>1</div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
              step === "symptom" && "bg-blue-500",
              step === "questions" && "bg-blue-400",
              step === "result" && "bg-blue-300",
              step === "category" && "bg-gray-200 text-gray-500",
            )}>2</div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
              step === "questions" && "bg-blue-500",
              step === "result" && "bg-blue-400",
              (step === "category" || step === "symptom") && "bg-gray-200 text-gray-500",
            )}>3</div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
              step === "result" && "bg-blue-500",
              step !== "result" && "bg-gray-200 text-gray-500",
            )}>4</div>
          </div>

          {/* Category Selection */}
          <AnimatePresence mode="wait">
            {step === "category" && (
              <motion.div
                key="category"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="text-gray-600 mb-4">Select a category that best describes your concern:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {symptomCategories.map((category, index) => {
                    const Icon = iconMap[category.icon] || Stethoscope;
                    return (
                      <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setStep("symptom");
                        }}
                        className="p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          {symptomsByCategory[category.id as keyof typeof symptomsByCategory]?.length || 0} symptoms
                          <ChevronRight className="w-3 h-3" />
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Symptom Selection */}
            {step === "symptom" && (
              <motion.div
                key="symptom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setStep("category")}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to categories
                </button>
                <p className="text-gray-600 mb-4">
                  Select the symptom you're experiencing:
                </p>
                <div className="space-y-3">
                  {symptoms.map((symptom) => (
                    <motion.button
                      key={symptom.id}
                      onClick={() => handleSymptomSelect(symptom)}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          symptom.severity === "mild" && "bg-green-400",
                          symptom.severity === "moderate" && "bg-amber-400",
                          symptom.severity === "severe" && "bg-red-400"
                        )} />
                        <span className="font-medium">{symptom.name}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Questions */}
            {step === "questions" && questions.length > 0 && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                        setAnswers(answers.slice(0, -1));
                      } else {
                        setStep("symptom");
                      }
                    }}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <span className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {questions[currentQuestion]?.question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion]?.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.severity)}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>

                <p className="text-center text-sm text-gray-400 mt-6">
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  Answer honestly for accurate results
                </p>
              </motion.div>
            )}

            {/* No questions available */}
            {step === "questions" && questions.length === 0 && (
              <motion.div
                key="no-questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Symptom Selected: {selectedSymptom?.name}
                </h3>
                <p className="text-gray-500 mb-6">
                  Based on your selection, we recommend consulting with a healthcare provider.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={resetChecker} variant="secondary">
                    Start Over
                  </Button>
                  <Button onClick={() => setSeverity(selectedSymptom?.severity === "severe" ? "urgent" : "medium")}>
                    View Recommendations
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {showResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
              >
                <div className={cn(
                  "text-center p-6 rounded-2xl mb-6",
                  severity === "urgent" && "bg-red-50 border-2 border-red-200",
                  severity === "high" && "bg-amber-50 border-2 border-amber-200",
                  severity === "medium" && "bg-blue-50 border-2 border-blue-200",
                  severity === "low" && "bg-green-50 border-2 border-green-200"
                )}>
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                    severity === "urgent" && "bg-red-100",
                    severity === "high" && "bg-amber-100",
                    severity === "medium" && "bg-blue-100",
                    severity === "low" && "bg-green-100"
                  )}>
                    {severity === "urgent" && <AlertTriangle className="w-8 h-8 text-red-600" />}
                    {severity === "high" && <AlertTriangle className="w-8 h-8 text-amber-600" />}
                    {severity === "medium" && <Stethoscope className="w-8 h-8 text-blue-600" />}
                    {severity === "low" && <CheckCircle className="w-8 h-8 text-green-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {severity === "urgent" && "Seek Medical Attention"}
                    {severity === "high" && "Consult a Doctor"}
                    {severity === "medium" && "Monitor Symptoms"}
                    {severity === "low" && "Home Care Recommended"}
                  </h3>
                  <p className="text-gray-600">
                    {severity === "urgent" && "Your symptoms may require immediate medical attention. Please contact emergency services or visit an urgent care facility."}
                    {severity === "high" && "Based on your responses, we recommend scheduling an appointment with a healthcare provider within 24-48 hours."}
                    {severity === "medium" && "Your symptoms appear manageable. Continue monitoring and consider consulting a doctor if they persist or worsen."}
                    {severity === "low" && "Your symptoms appear minor and may resolve with rest and basic care. Monitor for any changes."}
                  </p>
                </div>

                {/* Recommendations */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {severity === "urgent" && (
                      <>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          Seek immediate medical attention or call emergency services
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          Do not delay treatment if symptoms worsen
                        </li>
                      </>
                    )}
                    {severity === "high" && (
                      <>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          Schedule a doctor's appointment within 24-48 hours
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                          <Stethoscope className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          Consider using DocShare to find and book a specialist
                        </li>
                      </>
                    )}
                    {(severity === "medium" || severity === "low") && (
                      <>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Rest and stay hydrated
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Monitor symptoms for the next 24-48 hours
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button onClick={resetChecker} variant="secondary">
                    Start New Check
                  </Button>
                  {(severity === "urgent" || severity === "high") && (
                    <Button>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

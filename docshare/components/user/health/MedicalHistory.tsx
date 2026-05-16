"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { medicalRecords, type MedicalRecord } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  History,
  Calendar,
  Stethoscope,
  Building2,
  ChevronRight,
  Search,
  Filter,
  Download,
  FileText,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MedicalHistory() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState<string>("all");
  const [selectedRecord, setSelectedRecord] = React.useState<MedicalRecord | null>(null);

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || record.hospital.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRecordType = (title: string) => {
    if (title.toLowerCase().includes("consultation") || title.toLowerCase().includes("visit")) {
      return { label: "Consultation", color: "bg-blue-100 text-blue-700" };
    }
    if (title.toLowerCase().includes("test") || title.toLowerCase().includes("blood")) {
      return { label: "Lab Test", color: "bg-purple-100 text-purple-700" };
    }
    if (title.toLowerCase().includes("examination") || title.toLowerCase().includes("checkup")) {
      return { label: "Checkup", color: "bg-green-100 text-green-700" };
    }
    return { label: "Other", color: "bg-gray-100 text-gray-700" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
          <p className="text-gray-500">View and manage your complete medical records</p>
        </div>
        <button className="px-4 py-2 bg-gradient-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Record
        </button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search records, doctors, or diagnoses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="all">All Types</option>
                <option value="Tashkent">Tashkent Medical Center</option>
                <option value="City">City Polyclinic</option>
                <option value="Eye">Eye Care Center</option>
              </select>
              <button className="px-4 py-3 rounded-xl border border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                More
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No records found matching your criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record, index) => {
              const type = getRecordType(record.title);
              const isSelected = selectedRecord?.id === record.id;
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedRecord(isSelected ? null : record)}
                  className={cn(
                    "p-5 rounded-2xl border-2 cursor-pointer transition-all",
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{record.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full", type.color)}>
                            {type.label}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(record.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      "w-5 h-5 text-gray-400 transition-transform",
                      isSelected && "rotate-90"
                    )} />
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="pt-4 border-t space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-white">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                            <Stethoscope className="w-4 h-4" />
                            Doctor
                          </div>
                          <p className="font-medium">{record.doctor_name}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                            <Building2 className="w-4 h-4" />
                            Facility
                          </div>
                          <p className="font-medium">{record.hospital}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                        <p className="font-medium text-gray-900">{record.diagnosis}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Treatment</p>
                        <p className="text-gray-700">{record.treatment}</p>
                      </div>

                      {record.notes && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Notes</p>
                          <p className="text-gray-700">{record.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                          Download Record
                        </button>
                        <button className="flex-1 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
                          Share with Doctor
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600">Total Records</span>
                  <span className="font-bold text-gray-900">{medicalRecords.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600">Consultations</span>
                  <span className="font-bold text-gray-900">
                    {medicalRecords.filter((r) => r.title.toLowerCase().includes("consultation")).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600">Lab Tests</span>
                  <span className="font-bold text-gray-900">
                    {medicalRecords.filter((r) => r.title.toLowerCase().includes("test")).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-600">Last Visit</span>
                  <span className="font-bold text-gray-900">
                    {formatDate(medicalRecords[0].date)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full p-3 rounded-xl border border-gray-200 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                <Download className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Export All Records</span>
              </button>
              <button className="w-full p-3 rounded-xl border border-gray-200 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Request Medical Copy</span>
              </button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Need Your Records?</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Contact the healthcare facility directly or use our request service to get
                    copies of your medical records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

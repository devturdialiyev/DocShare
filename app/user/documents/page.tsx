"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Sidebar from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Eye, Plus, Search } from "lucide-react";
import { medicalRecords } from "@/lib/mock/data";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="documents" />
      
      <main className="lg:ml-[280px] p-4 lg:p-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={staggerItem} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-500">Your medical documents and records</p>
              </div>
            </div>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                  />
                </div>
                <button className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Upload Document
                </button>
              </div>
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.title}</p>
                        <p className="text-sm text-gray-500">{record.doctor_name} - {record.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-200">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-200">
                        <Download className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

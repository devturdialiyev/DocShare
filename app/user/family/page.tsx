"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Sidebar from "@/components/shared/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Heart,
  Plus,
  Search,
  Phone,
  Calendar,
  AlertCircle,
  ChevronRight,
  X,
  Activity,
  User,
  CalendarDays,
  FileText,
  ClipboardList,
  Pill,
  Droplets,
} from "lucide-react";
import { familyMembers, FamilyMember } from "@/lib/mock/data";

const statusColors = {
  good: { bg: "bg-green-100", text: "text-green-700", label: "Healthy" },
  attention: { bg: "bg-amber-100", text: "text-amber-700", label: "Needs Attention" },
  critical: { bg: "bg-red-100", text: "text-red-700", label: "Critical" },
};

export default function FamilyPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedMember, setSelectedMember] = React.useState<FamilyMember | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const filteredMembers = familyMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.relation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeItem="family" />

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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Family</h1>
                <p className="text-gray-500">Manage your family health records</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={staggerItem}>
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Family Members</h2>
                        <p className="text-sm text-gray-500">{familyMembers.length} members registered</p>
                      </div>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <Plus className="w-4 h-4" />
                        Add Member
                      </button>
                    </div>

                    <div className="relative mb-6">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search family members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {filteredMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedMember(member)}
                            className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg">
                                  {member.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.relation}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                  statusColors[member.health_status].bg
                                } ${statusColors[member.health_status].text}`}
                              >
                                {statusColors[member.health_status].label}
                              </span>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {filteredMembers.length === 0 && (
                        <div className="text-center py-12">
                          <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No family members found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {filteredMembers.filter((m) => m.health_status === "critical" || m.health_status === "attention").length > 0 && (
                <motion.div variants={staggerItem}>
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold text-gray-900">Health Alerts</h3>
                      </div>
                      <div className="space-y-3">
                        {filteredMembers
                          .filter((m) => m.health_status !== "good")
                          .map((member) => (
                            <div
                              key={member.id}
                              onClick={() => setSelectedMember(member)}
                              className="flex items-center justify-between p-3 rounded-xl bg-white border border-red-100 cursor-pointer hover:border-red-300 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${member.health_status === "critical" ? "bg-red-500" : "bg-amber-500"}`} />
                                <span className="font-medium text-gray-900">{member.name}</span>
                                <span className="text-sm text-gray-500">- {member.relation}</span>
                              </div>
                              <span
                                className={`text-sm font-medium ${
                                  member.health_status === "critical"
                                    ? "text-red-600"
                                    : "text-amber-600"
                                }`}
                              >
                                {member.health_status === "critical" ? "Requires attention" : "Needs monitoring"}
                              </span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div variants={staggerItem}>
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-green-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-700">Healthy</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {familyMembers.filter((m) => m.health_status === "good").length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-amber-600" />
                          </div>
                          <span className="font-medium text-gray-700">Attention</span>
                        </div>
                        <span className="text-2xl font-bold text-amber-600">
                          {familyMembers.filter((m) => m.health_status === "attention").length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-red-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-medium text-gray-700">Critical</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          {familyMembers.filter((m) => m.health_status === "critical").length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {familyMembers
                        .filter((m) => m.last_checkup)
                        .sort((a, b) => new Date(b.last_checkup!).getTime() - new Date(a.last_checkup!).getTime())
                        .slice(0, 3)
                        .map((member) => (
                          <div key={member.id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <CalendarDays className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                Last checkup: {member.last_checkup}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedMember && (
          <MemberDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddModal && (
          <AddMemberModal onClose={() => setShowAddModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MemberDetailModal({
  member,
  onClose,
}: {
  member: FamilyMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">
                {member.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">{member.name}</p>
              <p className="text-gray-500">{member.relation}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[member.health_status].bg
                } ${statusColors[member.health_status].text}`}
              >
                {statusColors[member.health_status].label}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Health Score</p>
              <p className="text-2xl font-bold text-gray-900">{member.health_score || "N/A"}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Blood Type</p>
              <p className="text-2xl font-bold text-gray-900">{member.blood_type || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Info
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{member.date_of_birth || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium text-gray-900 capitalize">{member.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Checkup</p>
                <p className="font-medium text-gray-900">{member.last_checkup || "N/A"}</p>
              </div>
            </div>
          </div>

          {member.allergies && member.allergies.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Allergies
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.chronic_conditions && member.chronic_conditions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-500" />
                Chronic Conditions
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.chronic_conditions.map((condition) => (
                  <span
                    key={condition}
                    className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button className="flex-1 px-4 py-3 bg-gradient-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Calendar className="w-5 h-5" />
              Book Appointment
            </button>
            <button className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
              <FileText className="w-5 h-5" />
              View Records
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddMemberModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: "",
    relation: "",
    date_of_birth: "",
    gender: "male" as "male" | "female",
    blood_type: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add Family Member</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">Select relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.relation}
                  className="flex-1 px-4 py-3 bg-gradient-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "male" })}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                        formData.gender === "male"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "female" })}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                        formData.gender === "female"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type (Optional)</label>
                  <select
                    value={formData.blood_type}
                    onChange={(e) => setFormData({ ...formData, blood_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gradient-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Add Member
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
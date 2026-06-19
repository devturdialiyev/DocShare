export interface AIGuardianAlert {
  id: string;
  icon: string;
  title: string;
  message: string;
  borderColor: string;
  dismissed?: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  daysRemaining: number;
  color: string;
  status: "active" | "as_needed";
}

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  timestamp: string;
  group: "aiguardian" | "goals" | "appointments" | "family" | "medications";
}

export const aiGuardianAlerts: AIGuardianAlert[] = [
  { id: "al_1", icon: "\u{1F4A7}", title: "Stay Hydrated", message: "Only 1.2L today. Aim for 2L.", borderColor: "border-l-blue-500" },
  { id: "al_2", icon: "\u{1FA7A}", title: "Blood Pressure", message: "BP elevated. Reduce salt intake.", borderColor: "border-l-orange-500" },
  { id: "al_3", icon: "\u{1F634}", title: "Sleep Schedule", message: "Great 8-hour streak! Keep it up.", borderColor: "border-l-green-500" },
  { id: "al_4", icon: "\u{1F627}", title: "Air Quality", message: "AQI 67 outside. Wear a mask.", borderColor: "border-l-red-500" },
  { id: "al_5", icon: "\u{1F33F}", title: "Allergy Alert", message: "Pollen high. Exercise early morning.", borderColor: "border-l-purple-500" },
];

export const medications: Medication[] = [
  { id: "med_1", name: "Vitamin D3", dosage: "1 capsule", time: "Morning", daysRemaining: 28, color: "bg-orange-500", status: "active" },
  { id: "med_2", name: "Multivitamin", dosage: "1 capsule", time: "After breakfast", daysRemaining: 18, color: "bg-blue-500", status: "active" },
  { id: "med_3", name: "Loratadin", dosage: "10mg", time: "As needed", daysRemaining: 12, color: "bg-purple-500", status: "as_needed" },
  { id: "med_4", name: "Omeprazole", dosage: "20mg", time: "Before breakfast", daysRemaining: 14, color: "bg-green-500", status: "active" },
];

export const notifications: NotificationItem[] = [
  { id: "not_1", icon: "\u{1F916}", title: "BP Alert", message: "Blood pressure slightly elevated", timestamp: "5m ago", group: "aiguardian" },
  { id: "not_2", icon: "\u{1F3C3}", title: "Goal Complete", message: "Morning Walk done! 30 min", timestamp: "12m ago", group: "goals" },
  { id: "not_3", icon: "\u{1F4C5}", title: "Appointment Tomorrow", message: "Dr. Umarov, 10:30 AM", timestamp: "1h ago", group: "appointments" },
  { id: "not_4", icon: "\u{26A0}\uFE0F", title: "Bobur Needs Attention", message: "Check his vitals", timestamp: "2h ago", group: "family" },
  { id: "not_5", icon: "\u{1F48A}", title: "Vitamin D3 Time", message: "Morning dose ready", timestamp: "3h ago", group: "medications" },
  { id: "not_6", icon: "\u{1F916}", title: "Hydration Reminder", message: "Only 1.2L today", timestamp: "4h ago", group: "aiguardian" },
  { id: "not_7", icon: "\u{1F3C3}", title: "10K Steps!", message: "You reached your goal!", timestamp: "5h ago", group: "goals" },
  { id: "not_8", icon: "\u{1F4C5}", title: "Appointment in 30m", message: "Dr. Alieva ready - Join Call now", timestamp: "Just now", group: "appointments" },
];

export const weeklySteps = [6200, 7800, 10200, 5400, 9100, 8450, 7200];

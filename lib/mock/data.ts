// Mock Data for DocShare

export interface User {
  id: string;
  full_name: string;
  phone: string;
  avatar?: string;
  passport_id: string;
  health_score: number;
  region: string;
  date_of_birth?: string;
  blood_type?: string;
  allergies?: string[];
  chronic_conditions?: string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar?: string;
  health_status: "good" | "attention" | "critical";
}

export interface Vital {
  date: string;
  steps: number;
  distance_km: number;
  hr_bpm: number;
  bp_sys: number;
  bp_dia: number;
  spo2: number;
  calories: number;
  weight?: number;
  temperature?: number;
  fasting_glucose?: number;
}

export interface VitalInput {
  hr_bpm: number;
  bp_sys: number;
  bp_dia: number;
  spo2: number;
  weight?: number;
  temperature?: number;
  fasting_glucose?: number;
  notes?: string;
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: "mild" | "moderate" | "severe";
}

export interface SymptomQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; severity: number }[];
}

export interface HealthGoal {
  id: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  category: "exercise" | "nutrition" | "sleep" | "medication" | "vitals" | "meditation";
  deadline: string;
  progress: number;
  priority: "low" | "medium" | "high";
  ai_generated: boolean;
}

export interface DiseaseRisk {
  id: string;
  disease_name: string;
  risk_level: "low" | "medium" | "high" | "very_high";
  risk_percentage: number;
  contributing_factors: string[];
  recommendations: string[];
  affected_by_conditions: string[];
}

export interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  doctor_name: string;
  hospital: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  doctor_name: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

export interface HealthActivity {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  category: "exercise" | "meditation" | "sleep" | "nutrition";
  completed: boolean;
  streak: number;
}

// Citizen Mock Data
export const currentUser: User = {
  id: "usr_001",
  full_name: "Bekzod Turdialiyev",
  phone: "+998 90 123 45 67",
  passport_id: "AB1234567",
  health_score: 85,
  region: "Tashkent",
};

export const familyMembers: FamilyMember[] = [
  {
    id: "fam_001",
    name: "Malika Karimova",
    relation: "Wife",
    health_status: "good",
  },
  {
    id: "fam_002",
    name: "Bobur Karimov",
    relation: "Son",
    health_status: "attention",
  },
  {
    id: "fam_003",
    name: "Nodira Karimova",
    relation: "Daughter",
    health_status: "good",
  },
];

export const vitals: Vital[] = [
  {
    date: "2026-03-24",
    steps: 8450,
    distance_km: 6.2,
    hr_bpm: 72,
    bp_sys: 120,
    bp_dia: 80,
    spo2: 98,
    calories: 450,
  },
  {
    date: "2026-03-23",
    steps: 10200,
    distance_km: 7.5,
    hr_bpm: 68,
    bp_sys: 118,
    bp_dia: 78,
    spo2: 99,
    calories: 520,
  },
  {
    date: "2026-03-22",
    steps: 6200,
    distance_km: 4.5,
    hr_bpm: 75,
    bp_sys: 122,
    bp_dia: 82,
    spo2: 97,
    calories: 320,
  },
];

export const upcomingAppointments: Appointment[] = [
  {
    id: "apt_001",
    doctor_name: "Dr. Dilshod Umarov",
    specialty: "Cardiology",
    hospital: "Tashkent Medical Center",
    date: "2026-03-26",
    time: "10:30",
    status: "upcoming",
  },
  {
    id: "apt_002",
    doctor_name: "Dr. Gulnora Alieva",
    specialty: "Dermatology",
    hospital: "City Polyclinic #15",
    date: "2026-03-28",
    time: "14:00",
    status: "upcoming",
  },
];

export const healthActivities: HealthActivity[] = [
  {
    id: "act_001",
    title: "Morning Walk",
    description: "30 minutes of brisk walking",
    duration_minutes: 30,
    category: "exercise",
    completed: true,
    streak: 5,
  },
  {
    id: "act_002",
    title: "Meditation",
    description: "10 minutes of breathing exercises",
    duration_minutes: 10,
    category: "meditation",
    completed: true,
    streak: 12,
  },
  {
    id: "act_003",
    title: "8 Hours Sleep",
    description: "Maintain consistent sleep schedule",
    duration_minutes: 480,
    category: "sleep",
    completed: false,
    streak: 3,
  },
  {
    id: "act_004",
    title: "Drink 2L Water",
    description: "Stay hydrated throughout the day",
    duration_minutes: 0,
    category: "nutrition",
    completed: false,
    streak: 7,
  },
];

// SuperAdmin Mock Data
export interface SystemMetric {
  label: string;
  value: number;
  change: number;
  unit?: string;
}

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
}

export interface Hospital {
  id: string;
  name: string;
  region: string;
  doctors: number;
  patients: number;
  occupancy: number;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  details: string;
}

export const systemMetrics: SystemMetric[] = [
  { label: "Total Users", value: 2456789, change: 12.5 },
  { label: "Active Doctors", value: 12543, change: 8.2 },
  { label: "Pending Appointments", value: 3421, change: -5.1 },
  { label: "AI Analyses", value: 89234, change: 23.4, unit: "today" },
];

export const alerts: Alert[] = [
  {
    id: "alert_001",
    type: "critical",
    title: "Server Load High",
    message: "Tashkent region servers at 92% capacity",
    timestamp: "5 min ago",
  },
  {
    id: "alert_002",
    type: "warning",
    title: "Security Flag",
    message: "Unusual login pattern detected in Samarkand",
    timestamp: "12 min ago",
  },
  {
    id: "alert_003",
    type: "info",
    title: "System Update",
    message: "Scheduled maintenance tonight at 02:00",
    timestamp: "1 hour ago",
  },
];

export const hospitals: Hospital[] = [
  { id: "hosp_001", name: "Tashkent Medical Center", region: "Tashkent", doctors: 245, patients: 15420, occupancy: 78 },
  { id: "hosp_002", name: "Samarkand State Hospital", region: "Samarkand", doctors: 189, patients: 12300, occupancy: 65 },
  { id: "hosp_003", name: "Bukhara Regional Clinic", region: "Bukhara", doctors: 156, patients: 9800, occupancy: 82 },
  { id: "hosp_004", name: "Fergana City Hospital", region: "Fergana", doctors: 134, patients: 8700, occupancy: 71 },
  { id: "hosp_005", name: "Navoi Medical Center", region: "Navoi", doctors: 98, patients: 5600, occupancy: 58 },
];

export const auditLogs: AuditLog[] = [
  { id: "log_001", action: "User Created", actor: "Admin: John Smith", target: "New User", timestamp: "2 min ago", details: "New doctor account created" },
  { id: "log_002", action: "Role Changed", actor: "SuperAdmin", target: "Dr. Jane Doe", timestamp: "15 min ago", details: "Role updated from Doctor to Admin" },
  { id: "log_003", action: "Hospital Updated", actor: "Admin: Sarah", target: "Tashkent Medical Center", timestamp: "1 hour ago", details: "Capacity updated to 500 beds" },
];

// Uzbekistan regions for heatmap
export const uzbekistanRegions = [
  { id: "uz_tashkent", name: "Tashkent", lat: 41.2995, lng: 69.2401, demand: 85, diseases: 45, hospitals: 12 },
  { id: "uz_samarkand", name: "Samarkand", lat: 39.6270, lng: 66.9750, demand: 65, diseases: 38, hospitals: 8 },
  { id: "uz_bukhara", name: "Bukhara", lat: 39.7680, lng: 64.4556, demand: 55, diseases: 42, hospitals: 6 },
  { id: "uz_fergana", name: "Fergana", lat: 40.3866, lng: 71.7868, demand: 72, diseases: 35, hospitals: 7 },
  { id: "uz_namangan", name: "Namangan", lat: 40.9983, lng: 71.5729, demand: 58, diseases: 40, hospitals: 5 },
  { id: "uz_andijan", name: "Andijan", lat: 40.7822, lng: 72.3442, demand: 62, diseases: 37, hospitals: 6 },
  { id: "uz_navoi", name: "Navoi", lat: 40.1042, lng: 65.3791, demand: 45, diseases: 30, hospitals: 4 },
  { id: "uz_khorezm", name: "Khorezm", lat: 41.5522, lng: 60.6317, demand: 48, diseases: 33, hospitals: 5 },
  { id: "uz_kashkadarya", name: "Kashkadarya", lat: 38.8986, lng: 65.7890, demand: 52, diseases: 36, hospitals: 4 },
  { id: "uz_surkhandarya", name: "Surkhandarya", lat: 37.2250, lng: 67.2850, demand: 55, diseases: 39, hospitals: 5 },
];

// Extended Health Data for My Health Menu
export const extendedVitals: Vital[] = [
  { date: "2026-03-24", steps: 8450, distance_km: 6.2, hr_bpm: 72, bp_sys: 120, bp_dia: 80, spo2: 98, calories: 450, weight: 78.5, temperature: 36.6, fasting_glucose: 95 },
  { date: "2026-03-23", steps: 10200, distance_km: 7.5, hr_bpm: 68, bp_sys: 118, bp_dia: 78, spo2: 99, calories: 520, weight: 78.3, temperature: 36.5, fasting_glucose: 92 },
  { date: "2026-03-22", steps: 6200, distance_km: 4.5, hr_bpm: 75, bp_sys: 122, bp_dia: 82, spo2: 97, calories: 320, weight: 78.8, temperature: 36.7, fasting_glucose: 98 },
  { date: "2026-03-21", steps: 9800, distance_km: 7.2, hr_bpm: 70, bp_sys: 119, bp_dia: 79, spo2: 98, calories: 490, weight: 78.6, temperature: 36.6, fasting_glucose: 94 },
  { date: "2026-03-20", steps: 5500, distance_km: 4.0, hr_bpm: 76, bp_sys: 124, bp_dia: 84, spo2: 97, calories: 290, weight: 79.0, temperature: 36.8, fasting_glucose: 100 },
  { date: "2026-03-19", steps: 12000, distance_km: 8.8, hr_bpm: 65, bp_sys: 116, bp_dia: 76, spo2: 99, calories: 580, weight: 78.2, temperature: 36.5, fasting_glucose: 90 },
  { date: "2026-03-18", steps: 7800, distance_km: 5.7, hr_bpm: 71, bp_sys: 121, bp_dia: 81, spo2: 98, calories: 410, weight: 78.4, temperature: 36.6, fasting_glucose: 96 },
  { date: "2026-03-17", steps: 4300, distance_km: 3.1, hr_bpm: 78, bp_sys: 126, bp_dia: 85, spo2: 96, calories: 250, weight: 79.2, temperature: 36.9, fasting_glucose: 102 },
  { date: "2026-03-16", steps: 11000, distance_km: 8.1, hr_bpm: 66, bp_sys: 117, bp_dia: 77, spo2: 99, calories: 550, weight: 78.1, temperature: 36.5, fasting_glucose: 91 },
  { date: "2026-03-15", steps: 6500, distance_km: 4.8, hr_bpm: 73, bp_sys: 120, bp_dia: 80, spo2: 98, calories: 380, weight: 78.5, temperature: 36.6, fasting_glucose: 95 },
  { date: "2026-03-14", steps: 9200, distance_km: 6.8, hr_bpm: 69, bp_sys: 118, bp_dia: 78, spo2: 98, calories: 470, weight: 78.3, temperature: 36.5, fasting_glucose: 93 },
  { date: "2026-03-13", steps: 4800, distance_km: 3.5, hr_bpm: 77, bp_sys: 125, bp_dia: 83, spo2: 97, calories: 280, weight: 78.9, temperature: 36.8, fasting_glucose: 99 },
  { date: "2026-03-12", steps: 10500, distance_km: 7.7, hr_bpm: 67, bp_sys: 116, bp_dia: 76, spo2: 99, calories: 530, weight: 78.2, temperature: 36.5, fasting_glucose: 89 },
  { date: "2026-03-11", steps: 7200, distance_km: 5.3, hr_bpm: 74, bp_sys: 122, bp_dia: 81, spo2: 98, calories: 400, weight: 78.6, temperature: 36.7, fasting_glucose: 97 },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "med_001",
    title: "Annual Physical Examination",
    date: "2026-01-15",
    doctor_name: "Dr. Akmal Karimov",
    hospital: "Tashkent Medical Center",
    diagnosis: "General health checkup - all parameters normal",
    treatment: "Recommended lifestyle modifications",
    notes: "Continue current exercise routine. Monitor blood pressure.",
  },
  {
    id: "med_002",
    title: "Cardiology Consultation",
    date: "2025-11-20",
    doctor_name: "Dr. Dilshod Umarov",
    hospital: "Tashkent Medical Center",
    diagnosis: "Mild hypertension - Stage 1",
    treatment: "Lifestyle changes, low-sodium diet, regular exercise",
    notes: "Follow-up in 3 months. Consider medication if BP remains elevated.",
  },
  {
    id: "med_003",
    title: "Blood Test Results",
    date: "2025-09-10",
    doctor_name: "Dr. Nigina Rustamova",
    hospital: "City Polyclinic #15",
    diagnosis: "Slightly elevated cholesterol",
    treatment: "Dietary modifications, increased physical activity",
    notes: "LDL slightly above normal. Recheck in 6 months.",
  },
  {
    id: "med_004",
    title: "Gastroenterology Visit",
    date: "2025-06-15",
    doctor_name: "Dr. Bahodir Yusupov",
    hospital: "Tashkent Medical Center",
    diagnosis: "Gastritis (mild)",
    treatment: "Omeprazole 20mg daily, dietary restrictions",
    notes: "Avoid spicy foods and alcohol. Follow-up if symptoms persist.",
  },
  {
    id: "med_005",
    title: "Ophthalmology Check",
    date: "2025-03-22",
    doctor_name: "Dr. Gulshan Orifjonova",
    hospital: "Eye Care Center Tashkent",
    diagnosis: "Myopia (-2.5D both eyes), mild astigmatism",
    treatment: "Continue wearing corrective lenses",
    notes: "Annual eye exam recommended. Monitor for any changes.",
  },
];

export const healthGoals: HealthGoal[] = [
  {
    id: "goal_001",
    title: "Lower Blood Pressure",
    description: "Reduce systolic BP from 120 to 115 mmHg",
    target_value: 115,
    current_value: 120,
    unit: "mmHg",
    category: "vitals",
    deadline: "2026-04-30",
    progress: 45,
    priority: "high",
    ai_generated: true,
  },
  {
    id: "goal_002",
    title: "Daily Steps Goal",
    description: "Achieve 10,000 steps daily consistently",
    target_value: 10000,
    current_value: 8500,
    unit: "steps",
    category: "exercise",
    deadline: "2026-04-15",
    progress: 85,
    priority: "medium",
    ai_generated: false,
  },
  {
    id: "goal_003",
    title: "Improve Sleep Quality",
    description: "Consistently get 7-8 hours of quality sleep",
    target_value: 8,
    current_value: 6.5,
    unit: "hours",
    category: "sleep",
    deadline: "2026-05-01",
    progress: 65,
    priority: "medium",
    ai_generated: true,
  },
  {
    id: "goal_004",
    title: "Reduce Sodium Intake",
    description: "Limit daily sodium to less than 2000mg",
    target_value: 2000,
    current_value: 2800,
    unit: "mg",
    category: "nutrition",
    deadline: "2026-04-20",
    progress: 30,
    priority: "high",
    ai_generated: true,
  },
  {
    id: "goal_005",
    title: "Stress Management",
    description: "Practice meditation for 10 minutes daily",
    target_value: 10,
    current_value: 7,
    unit: "min/day",
    category: "meditation",
    deadline: "2026-04-10",
    progress: 70,
    priority: "low",
    ai_generated: false,
  },
  {
    id: "goal_006",
    title: "Lower Fasting Glucose",
    description: "Reduce fasting glucose to normal range (<100 mg/dL)",
    target_value: 95,
    current_value: 95,
    unit: "mg/dL",
    category: "vitals",
    deadline: "2026-05-15",
    progress: 75,
    priority: "medium",
    ai_generated: true,
  },
];

export const diseaseRisks: DiseaseRisk[] = [
  {
    id: "risk_001",
    disease_name: "Type 2 Diabetes",
    risk_level: "medium",
    risk_percentage: 25,
    contributing_factors: ["Family history", "Slightly elevated fasting glucose", "Sedentary lifestyle on weekends"],
    recommendations: ["Continue monitoring blood glucose", "Increase physical activity", "Maintain healthy weight", "Limit refined carbohydrates"],
    affected_by_conditions: ["Pre-diabetic glucose levels"],
  },
  {
    id: "risk_002",
    disease_name: "Hypertension (High Blood Pressure)",
    risk_level: "high",
    risk_percentage: 45,
    contributing_factors: ["Elevated BP readings", "Family history of hypertension", "Sodium intake above recommended", "Mild stress levels"],
    recommendations: ["Reduce sodium intake to <2000mg daily", "Regular aerobic exercise (30 min, 5x/week)", "Practice stress management techniques", "Limit alcohol consumption", "Schedule cardiology follow-up"],
    affected_by_conditions: ["Stage 1 hypertension diagnosis"],
  },
  {
    id: "risk_003",
    disease_name: "Cardiovascular Disease",
    risk_level: "medium",
    risk_percentage: 20,
    contributing_factors: ["Elevated cholesterol (LDL)", "Family history of heart disease", "Hypertension risk", "Moderate stress"],
    recommendations: ["Heart-healthy diet (Mediterranean style)", "Regular cardiovascular exercise", "Monitor cholesterol levels", "Manage stress effectively", "Annual cardiac screening"],
    affected_by_conditions: ["Elevated LDL cholesterol", "Mild hypertension"],
  },
  {
    id: "risk_004",
    disease_name: "Stroke",
    risk_level: "low",
    risk_percentage: 8,
    contributing_factors: ["Controlled blood pressure", "Non-smoker", "No atrial fibrillation", "Active lifestyle"],
    recommendations: ["Maintain current healthy habits", "Continue BP monitoring", "Regular exercise", "Balanced diet low in sodium"],
    affected_by_conditions: ["Mild hypertension history"],
  },
  {
    id: "risk_005",
    disease_name: "Obesity",
    risk_level: "low",
    risk_percentage: 12,
    contributing_factors: ["Healthy BMI (24.5)", "Active lifestyle", "Controlled calorie intake"],
    recommendations: ["Continue current exercise routine", "Maintain balanced diet", "Monitor weight weekly"],
    affected_by_conditions: ["Normal weight range"],
  },
];

export const symptomCategories = [
  { id: "general", name: "General Symptoms", icon: "Thermometer" },
  { id: "respiratory", name: "Respiratory", icon: "Wind" },
  { id: "cardiovascular", name: "Heart & Circulation", icon: "Heart" },
  { id: "digestive", name: "Digestive", icon: "Utensils" },
  { id: "musculoskeletal", name: "Muscles & Joints", icon: "Bone" },
  { id: "nervous", name: "Head & Mind", icon: "Brain" },
  { id: "skin", name: "Skin & Allergies", icon: "Scan" },
  { id: "urinary", name: "Urinary", icon: "Droplet" },
];

export const symptomsByCategory = {
  general: [
    { id: "fever", name: "Fever", severity: "moderate" as const },
    { id: "fatigue", name: "Fatigue", severity: "mild" as const },
    { id: "weight_loss", name: "Unexplained Weight Loss", severity: "severe" as const },
    { id: "night_sweats", name: "Night Sweats", severity: "moderate" as const },
    { id: "chills", name: "Chills", severity: "mild" as const },
  ],
  respiratory: [
    { id: "cough", name: "Persistent Cough", severity: "mild" as const },
    { id: "shortness_breath", name: "Shortness of Breath", severity: "severe" as const },
    { id: "sore_throat", name: "Sore Throat", severity: "mild" as const },
    { id: "congestion", name: "Nasal Congestion", severity: "mild" as const },
    { id: "wheezing", name: "Wheezing", severity: "moderate" as const },
  ],
  cardiovascular: [
    { id: "chest_pain", name: "Chest Pain", severity: "severe" as const },
    { id: "palpitations", name: "Heart Palpitations", severity: "moderate" as const },
    { id: "swelling", name: "Leg/Foot Swelling", severity: "moderate" as const },
    { id: "dizziness", name: "Dizziness", severity: "moderate" as const },
  ],
  digestive: [
    { id: "nausea", name: "Nausea", severity: "mild" as const },
    { id: "abdominal_pain", name: "Abdominal Pain", severity: "moderate" as const },
    { id: "diarrhea", name: "Diarrhea", severity: "mild" as const },
    { id: "bloating", name: "Bloating", severity: "mild" as const },
    { id: "heartburn", name: "Heartburn", severity: "mild" as const },
  ],
  musculoskeletal: [
    { id: "headache", name: "Headache", severity: "mild" as const },
    { id: "back_pain", name: "Back Pain", severity: "mild" as const },
    { id: "joint_pain", name: "Joint Pain", severity: "moderate" as const },
    { id: "muscle_aches", name: "Muscle Aches", severity: "mild" as const },
  ],
  nervous: [
    { id: "insomnia", name: "Insomnia", severity: "moderate" as const },
    { id: "anxiety", name: "Anxiety", severity: "moderate" as const },
    { id: "brain_fog", name: "Brain Fog", severity: "mild" as const },
    { id: "numbness", name: "Numbness/Tingling", severity: "moderate" as const },
  ],
  skin: [
    { id: "rash", name: "Skin Rash", severity: "mild" as const },
    { id: "itching", name: "Itching", severity: "mild" as const },
    { id: "dry_skin", name: "Dry Skin", severity: "mild" as const },
    { id: "acne", name: "Acne", severity: "mild" as const },
  ],
  urinary: [
    { id: "frequency", name: "Frequent Urination", severity: "mild" as const },
    { id: "pain_urination", name: "Pain During Urination", severity: "moderate" as const },
    { id: "blood_urine", name: "Blood in Urine", severity: "severe" as const },
  ],
};

export const symptomQuestions: Record<string, SymptomQuestion[]> = {
  fever: [
    { id: "q1", question: "What is your temperature?", options: [
      { id: "a", text: "Below 38°C (100.4°F)", severity: 1 },
      { id: "b", text: "38-39°C (100.4-102.2°F)", severity: 2 },
      { id: "c", text: "Above 39°C (102.2°F)", severity: 3 },
    ]},
    { id: "q2", question: "How long have you had the fever?", options: [
      { id: "a", text: "Less than 24 hours", severity: 1 },
      { id: "b", text: "1-3 days", severity: 2 },
      { id: "c", text: "More than 3 days", severity: 3 },
    ]},
    { id: "q3", question: "Do you have any other symptoms?", options: [
      { id: "a", text: "Just fever", severity: 1 },
      { id: "b", text: "Body aches", severity: 2 },
      { id: "c", text: "Confusion or severe headache", severity: 3 },
    ]},
  ],
  chest_pain: [
    { id: "q1", question: "How would you describe the pain?", options: [
      { id: "a", text: "Mild discomfort, pressure", severity: 1 },
      { id: "b", text: "Moderate, squeezing sensation", severity: 2 },
      { id: "c", text: "Severe, crushing, radiating to arm/jaw", severity: 3 },
    ]},
    { id: "q2", question: "Does the pain occur with activity or at rest?", options: [
      { id: "a", text: "During physical activity", severity: 1 },
      { id: "b", text: "At rest but resolves quickly", severity: 2 },
      { id: "c", text: "At rest, not resolving", severity: 3 },
    ]},
    { id: "q3", question: "Do you have shortness of breath?", options: [
      { id: "a", text: "No", severity: 1 },
      { id: "b", text: "Mild, with exertion", severity: 2 },
      { id: "c", text: "Severe, even at rest", severity: 3 },
    ]},
  ],
  fatigue: [
    { id: "q1", question: "How would you rate your fatigue level?", options: [
      { id: "a", text: "Mild, manageable with rest", severity: 1 },
      { id: "b", text: "Moderate, affects daily activities", severity: 2 },
      { id: "c", text: "Severe, unable to perform daily tasks", severity: 3 },
    ]},
    { id: "q2", question: "How long have you felt fatigued?", options: [
      { id: "a", text: "A few days", severity: 1 },
      { id: "b", text: "1-2 weeks", severity: 2 },
      { id: "c", text: "More than 2 weeks", severity: 3 },
    ]},
  ],
  shortness_breath: [
    { id: "q1", question: "When do you experience shortness of breath?", options: [
      { id: "a", text: "Only during strenuous exercise", severity: 1 },
      { id: "b", text: "During light activity or climbing stairs", severity: 2 },
      { id: "c", text: "At rest or while talking", severity: 3 },
    ]},
    { id: "q2", question: "Do you have a history of respiratory conditions?", options: [
      { id: "a", text: "No", severity: 1 },
      { id: "b", text: "Asthma or allergies", severity: 2 },
      { id: "c", text: "COPD or other chronic condition", severity: 3 },
    ]},
  ],
  headache: [
    { id: "q1", question: "How severe is your headache?", options: [
      { id: "a", text: "Mild, can continue activities", severity: 1 },
      { id: "b", text: "Moderate, difficulty concentrating", severity: 2 },
      { id: "c", text: "Severe, unable to function", severity: 3 },
    ]},
    { id: "q2", question: "Where is the pain located?", options: [
      { id: "a", text: "General/temple areas", severity: 1 },
      { id: "b", text: "One side of head", severity: 2 },
      { id: "c", text: "Behind eyes or back of head", severity: 3 },
    ]},
    { id: "q3", question: "Do you have visual disturbances or nausea?", options: [
      { id: "a", text: "No", severity: 1 },
      { id: "b", text: "Mild nausea", severity: 2 },
      { id: "c", text: "Visual aura or severe nausea/vomiting", severity: 3 },
    ]},
  ],
};

export const aiHealthSummary = {
  overall_score: 85,
  summary: "Your health metrics show improvement over the past month. Blood pressure trends are slightly elevated but manageable with lifestyle changes. Your activity level is good, averaging 8,500 steps daily. Key areas for focus: reducing sodium intake and improving sleep quality.",
  key_findings: [
    { metric: "Blood Pressure", status: "attention", note: "Systolic slightly elevated at 120 mmHg" },
    { metric: "Heart Rate", status: "normal", note: "Resting HR average 72 BPM - healthy range" },
    { metric: "Activity Level", status: "good", note: "Above recommended 10,000 steps 60% of days" },
    { metric: "Sleep Quality", status: "attention", note: "Average 6.5 hours, below recommended 7-8 hours" },
    { metric: "Weight", status: "stable", note: "Weight stable at 78.5 kg" },
  ],
  recommendations: [
    { priority: "high", text: "Schedule follow-up cardiology appointment to discuss BP management" },
    { priority: "medium", text: "Increase daily steps to 10,000 consistently" },
    { priority: "medium", text: "Reduce sodium intake - aim for <2000mg daily" },
    { priority: "low", text: "Establish consistent sleep schedule - target 10:30 PM bedtime" },
  ],
};

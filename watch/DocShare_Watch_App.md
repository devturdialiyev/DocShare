# ⌚ DocShare Watch App — Full Description
### Samsung Galaxy Watch 8 (44mm) · 480×480px · One UI Watch 6

---

## 🎨 Design Language

The watch app is a **direct visual extension of DocShare's web UI** — same color DNA, same hierarchy, adapted to a circular 480×480 display. Every screen uses the same **deep blue sidebar gradient as the background**, white cards float on top as compact tiles, and the same color-coded status system (green/orange/red) is preserved so users recognize their health status at a glance without reading.

| Property | Value |
|----------|-------|
| **Background** | Deep navy-to-blue radial gradient (`#1A3A6B` → `#1E4DB7`), matching the sidebar |
| **Cards** | White with 14px radius, subtle drop shadow |
| **Primary Accent** | Cyan-blue `#29B6F6` |
| **Text** | White on dark background; dark navy on white cards |
| **Buttons** | Full-width pill, blue `#2563EB` |
| **Status Colors** | Green (Good), Orange (Needs Attention), Red (Critical) |
| **Icons** | Rounded filled icon style, color-coded per category |
| **Font** | Inter / Samsung One — bold numerals, medium labels, small gray captions |
| **Navigation** | Crown scroll + swipe gestures |

---

## 📱 Screens & Features

---

### 1. 🕐 Watch Face (Always-On Display)

The home face users see without opening the app:

- **Large time** center (white, bold)
- Below time: **Heart Rate** (red ♥ icon) + **Steps** (cyan 👟 icon) — live values
- Bottom arc: **Health Score ring** — colored arc showing 85/100
- Corner dot: **AI Guardian status** — green pulse dot = all normal, orange = alert pending
- Tapping the face opens the DocShare app directly to the Dashboard screen

---

### 2. 🏠 Dashboard Screen

First screen when opening the app. Circular layout with a scrollable card stack.

**Top section (static header):**
- Small "DocShare" logo + "Uzbekistan Health" label top-center
- User initials avatar (B) — top right, tappable to open Profile

**Card 1 — Health Score Ring:**
- Large circular ring — shows **85**
- Color: cyan arc on dark blue background
- Label: "All systems normal" in green below
- Subtext: "Bekzod Turdialiyev"

**Card 2 — Quick Vitals Row (swipeable 2×2 grid):**
- ♥ Heart Rate — **72 BPM** (red icon)
- 💨 AQI — **42 Good** (cyan icon)
- 👟 Steps — **8,450** (blue icon)
- 🩺 SpO2 — **98%** (green icon)

**Card 3 — Daily Goals Mini-bar:**
- Progress bar: **2/4 goals** — 50% filled
- Tap to go to Goals screen

**Card 4 — AI Guardian Alert Preview:**
- Shows the most urgent alert
- Example: "💧 Only 1.2L water today"
- Orange accent left border
- Tap to open full AI Guardian screen

**Card 5 — Next Appointment:**
- Doctor avatar circle (blue icon)
- "Dr. Umarov · Cardiology"
- "Thu Mar 26 · 10:30"
- Two buttons: **Reschedule** (outline) | **Join Call** (filled blue pill)

---

### 3. 💓 Vitals Screen

Accessed by swiping right from Dashboard or tapping the Vitals card.

Full-screen scrollable list of vitals, each as a white card on blue background:

| Vital | Value | Trend | Color |
|-------|-------|-------|-------|
| Heart Rate | 72 BPM | +5.9% ↑ | Red |
| Blood Pressure | 120/80 | +1.7% ↑ | Blue |
| SpO2 | 98% | +1% ↑ | Green |
| Body Temp | 36.6°C | Normal | Orange |
| Breathing Rate | 16/min | Normal | Cyan |

- Each card shows the **same percentage trend badge** (orange pill) as the web
- Bottom: **"Record Vitals"** — full-width blue pill button → opens manual entry with crown scroll to adjust values
- **"View History"** link — scrollable 7-day mini chart per vital

---

### 4. 🏃 Activity Screen

Circular ring display at top + scrollable stats below.

**Top — Steps Ring:**
- Large circular ring: **8,450 / 10,000** (85% cyan arc)
- Center: bold step count
- Below ring: "85% complete"

**Stats Row (3 tiles):**
- 🔥 **450** Calories
- 📍 **6.2 km** Distance
- ⚡ **5** Day Streak

**Weekly Chart:**
- Compact 7-bar horizontal chart (Mon–Sun)
- Same blue bars as web, active day highlighted cyan
- "+12% This Week" badge in green (top right)

**Workout Auto-Detection Banner:**
- If activity detected: "🏋️ Gym session in progress — 42 min"
- Tap to log or end

---

### 5. 🎯 Goals Screen

Four goal cards stacked vertically, scrollable.

Each card shows:
- Icon + Goal name (bold)
- Short description (gray small text)
- 🔥 Streak number (orange flame)
- Status badge: **Done** (green) or **Pending** (gray)
- Time target (30m, 10m, etc.)

Tapping a pending goal:
- Shows a **"Mark as Done"** button
- Watch vibrates with confirmation haptic + green checkmark animation

Bottom: **"2/4 Complete · 50%"** progress bar

---

### 6. 🤖 AI Guardian Screen

Dark blue full-screen layout.

**Header:**
- Shield icon + "Health Assistant · Active" with green pulse dot

**Alert Cards (scrollable), each with colored left border:**

| Alert | Border Color | Message |
|-------|-------------|---------|
| 💧 Stay Hydrated | Blue | "Only 1.2L today. Aim for 2L." |
| 🩺 Blood Pressure | Orange | "BP elevated. Reduce salt intake." |
| 😴 Sleep Schedule | Green | "Great 8-hour streak! Keep it up." |
| 😷 Air Quality | Red | "AQI 67 outside. Wear a mask." |
| 🌿 Allergy Alert | Purple | "Pollen high. Exercise early morning." |

Each alert:
- **Swipe left** → Dismiss
- **Tap** → View Details

Bottom: **"View Full Report"** button

---

### 7. 👨‍👩‍👧‍👦 Family Screen

Compact family member list with color-coded status system.

Each row:
- **Avatar circle** (blue, with initial) + dot status indicator
- **Name + Relation** (bold name, gray relation label)
- **Status badge** (pill shaped):
  - 🟢 Good
  - 🟡 Needs Attention
  - 🔴 Critical

Tapping a member → shows their mini vitals card (Heart Rate, steps, last sync time)

**Critical alert behavior:**
- Watch face shows red pulsing border when a family member is Critical
- Notification with haptic: "🔴 Dilshod · Critical — Tap to view"

Bottom: **Family Health Score — 87**

---

### 8. 📅 Appointments Screen

**Today's Appointments:**
Each appointment as a card:
- Doctor avatar (blue circle icon)
- Name + Specialty badge (colored pill)
- Date, time, location
- **Join Call** button (filled blue) | **Reschedule** (outline)

**Upcoming row:**
- Compact list of next week's appointments
- Color dot = urgency: Green (far) · Orange (soon) · Red (today)

**Reminder behavior:**
- 30 min before appointment → watch taps wrist + shows appointment card
- "Join Call" button appears prominently

---

### 9. 💊 Medications Screen

List of active medications, matching web card style.

Each card:
- Pill icon in colored square background (orange/blue/purple)
- Medication name (bold)
- Dosage + Time + Days Remaining
- **Active** (green) / **As Needed** (gray) badge

**Medication reminder flow:**
1. Watch taps at scheduled time
2. Notification: "⏰ Time for Vitamin D3 · Morning · 1 capsule"
3. Two actions: **✓ Taken** | **⏸ Snooze 15min**
4. Tap Taken → logs to health history, green checkmark confirmation

---

### 10. 🔔 Notifications Center

Swipe down from any screen to open.

Full scrollable list grouped by type:

- 🤖 **AI Guardian** (blue header)
- 🎯 **Goals** (green header)
- 📅 **Appointments** (cyan header)
- 👨‍👩‍👧‍👦 **Family Alerts** (orange/red header)
- 💊 **Medications** (purple header)

Each notification:
- Icon + title + short message
- Timestamp (gray, small)
- **Swipe left** → Dismiss | **Tap** → Open relevant screen

---

### 11. 🆘 Emergency Screen

Accessible via **long press of the Home button**.

- Large **red SOS button** center screen
- "Hold 3 seconds to call emergency"
- Below: **Share Location** toggle
- Family emergency contacts listed with tap-to-call
- Fall detection auto-triggers this screen with countdown

---

### 12. ⚙️ Settings Screen

Matching the web's Settings page (Sozlamalar):

- **Notifications** — toggle each type (appointments, vitals, goals, family, medications)
- **Language** — Uzbek / Russian / English
- **Display** — brightness, always-on toggle
- **Health Sync** — sync frequency (real-time / every 5 min / manual)
- **Doctor Mode** — toggle (same as web sidebar)
- **Privacy** — data sharing preferences
- **About** — version info

---

## 🔄 Navigation System

| Gesture | Action |
|---------|--------|
| **Swipe left/right** | Move between main screens |
| **Crown scroll** | Scroll within a screen |
| **Tap** | Select / open detail |
| **Swipe down** | Open Notifications |
| **Swipe up** | Open Quick Vitals |
| **Long press crown** | SOS / Emergency |
| **Back button** | Return to previous |

---

## 🔁 Sync & Live Data

- Vitals sync **every 5 minutes** to DocShare app and web dashboard
- Goals auto-update in real time — completing a walk auto-checks the goal
- Family member statuses refresh every **15 minutes**
- AI Guardian alerts push **instantly** when thresholds are crossed
- All data appears live on the web Dashboard without manual entry

---

## 📋 Notification Types on Watch

### 💓 Health & Vitals Alerts
- Heart rate too high / too low warning
- Blood pressure elevated alert
- SpO2 dropped below safe level
- Body temperature abnormal alert
- Irregular heartbeat detected
- Daily health score changed

### 🎯 Goals & Activity
- "You've reached 10,000 steps!" celebration
- Goal completed (Morning Walk ✅, Meditation ✅)
- Streak at risk — "Complete your goal before midnight"
- Streak milestone — "🔥 12 days in a row!"
- Weekly activity summary

### 💧 Reminders
- Drink water reminder (every hour if behind on 2L goal)
- Medication time — Vitamin D3, Multivitamin, Loratadin
- Bedtime reminder — "Time to sleep to hit your 8-hour goal"
- Stretching reminder (post ankle sprain recovery)

### 📅 Appointments
- "Appointment tomorrow — Dr. Umarov, Cardiology, 10:30"
- "30 minutes until your appointment"
- "Your pre-visit vitals report is ready"
- "Dr. Alieva is ready — Join Call now"

### 👨‍👩‍👧‍👦 Family Health Alerts
- "⚠️ Bobur (Son) needs attention — check his health"
- "🔴 Dilshod (Father) — Critical status update"
- "Malika's vitals look good today ✅"
- Emergency SOS from a family member

### 🆘 Emergency
- SOS triggered by a family member
- Irregular heartbeat detected
- "No movement detected for 30 minutes"
- GPS location alert from a family member

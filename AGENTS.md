# DocShare Agent Guidelines

## Project Overview
DocShare is a National Digital Health Platform for Uzbekistan built with **Next.js 16.2.1**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## Build & Development Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
```

### Build & Production
```bash
npm run build        # Production build
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
npx tsc --noEmit    # TypeScript type checking only
```

### Testing
```bash
# Note: No test framework is currently configured
# To add testing, consider: npm install -D jest @testing-library/react @testing-library/jest-dom
```

### Next.js Commands
```bash
npx next lint        # Next.js specific linting
npx next dev         # Start dev server
```

---

## Code Style Guidelines

### TypeScript Conventions

1. **Strict Mode**: TypeScript `strict: true` is enabled
2. **No Implicit Any**: Avoid `any` types; use `unknown` when type is truly unknown
3. **Interface over Type**: Prefer interfaces for object shapes
4. **Export Types**: Always export interfaces from mock data files

```typescript
// Good
export interface Vital {
  date: string;
  steps: number;
  hr_bpm: number;
}

// Bad - avoid
type Vital = { date: string }
```

### File & Folder Naming

- **Components**: PascalCase (`VitalsTracker.tsx`)
- **Pages**: lowercase with route segments (`/user/health/page.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **CSS**: `globals.css` for global styles

### Import Order

1. Next.js/React imports
2. Third-party libraries (framer-motion, lucide-react)
3. Internal imports (`@/lib/*`, `@/components/*`)
4. Type imports

```typescript
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart, Activity } from "lucide-react";
import { vitalCards } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
```

### React Patterns

1. **"use client"**: Required for all client components using hooks, events, or browser APIs
2. **Forward References**: Use `forwardRef` for reusable components that need refs
3. **Component Props**: Use explicit interfaces

```typescript
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn("base-classes", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

### Tailwind CSS v4 Conventions

1. **CSS Variables**: Use predefined design tokens from `globals.css`
2. **Gradients**: Use `.bg-gradient-primary` class
3. **Card Styles**: Use `Card` component with `rounded-3xl`
4. **Shadows**: Use `shadow-card` or Tailwind shadow utilities

```tsx
// Design token usage
<div className="bg-gradient-primary text-white" />
<div className="bg-gray-50 rounded-3xl border border-blue-100/30" />

// Spacing follows Tailwind defaults (1-96, with 0.5rem increments)
<div className="p-6 space-y-4 gap-6" />
```

### Animation Patterns

Use Framer Motion for all animations with consistent variants:

```typescript
// lib/motion.ts - shared variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Usage
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={staggerItem}>Content</motion.div>
</motion.div>
```

### Error Handling

1. **Try-Catch**: Always wrap async operations in try-catch
2. **Loading States**: Use explicit loading states with `isLoading`
3. **Empty States**: Provide fallback UI for empty arrays

```typescript
const [data, setData] = React.useState<Vital[]>([]);
const [isLoading, setIsLoading] = React.useState(true);
const [error, setError] = React.useState<string | null>(null);

React.useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.getVitals();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);
```

### Component Architecture

1. **Page Components**: Located in `app/[role]/[page]/page.tsx`
2. **Shared Components**: `components/shared/`, `components/ui/`
3. **Role-specific Components**: `components/user/`, `components/doctor/`, `components/admin/`
4. **Health Components**: `components/user/health/` for health feature modules

---

## Design System

### Design Tokens (from globals.css)

```css
:root {
  --gradient-primary: linear-gradient(90deg, #2975D4 0%, #05B2D9 100%);
  --radius-card: 24px;
  --sidebar-width: 280px;
  --shadow-card: 0 10px 50px rgba(0, 123, 255, 0.08);
}
```

### Color Scheme by Role

| Role | Visual Style | CSS Variable |
|------|-------------|--------------|
| Citizen/Doctor | Blue gradient | `--gradient-primary` |
| Admin | Green | `--bg-admin` (#00C853) |
| SuperAdmin | Black | `--bg-superadmin` (#000000) |

### Spacing & Layout

- **Sidebar**: Fixed 280px (`ml-[280px]` for content)
- **Card Border Radius**: 24px (`rounded-3xl`)
- **Padding**: `p-6` for cards, `p-4` for mobile

---

## Data Models

### Vital Interface
```typescript
interface Vital {
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
```

### Normal Vitals Ranges
```typescript
const normalRanges = {
  hr_bpm: { min: 60, max: 100 },
  bp_sys: { min: 90, max: 120 },
  bp_dia: { min: 60, max: 80 },
  spo2: { min: 95, max: 100 },
  weight: { min: 65, max: 85 },
  temperature: { min: 36.1, max: 37.2 },
  fasting_glucose: { min: 70, max: 100 },
};
```

---

## API Endpoints (Planned)

```
Base URL: https://api.docshare.uz/v1
Auth: JWT Bearer token
Roles: citizen | doctor | regional_admin | superadmin
```

| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/login | JWT authentication |
| GET | /user/profile | Own profile + family |
| GET | /health/daily | Vitals |
| POST | /symptoms/analyze | AI diagnosis |
| GET | /appointments/upcoming | List appointments |
| POST | /appointments/request | Create request |

---

## Important Notes for Agents

1. **No Tests Configured**: Add testing framework before writing tests
2. **Mock Data**: All data is in `lib/mock/data.ts` - update interfaces there first
3. **Backend Not Implemented**: API integration is planned but not built
4. **Sidebar Navigation**: Use `Link` from `next/link` with `href` property
5. **No Emojis**: Avoid emojis in code and UI - use Lucide icons instead
6. **Responsive**: Mobile-first with `lg:` breakpoints for desktop

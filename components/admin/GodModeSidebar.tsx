"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Brain,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { currentUser } from "@/lib/mock/data";

interface GodModeSidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "hospitals", label: "Hospitals", icon: Building2 },
  { id: "audit", label: "Audit Logs", icon: FileText },
  { id: "ai", label: "AI Config", icon: Brain },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

const bottomNavItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Log Out", icon: LogOut },
];

const GodModeSidebar = ({ activeItem = "overview", onItemClick }: GodModeSidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-gradient-primary flex flex-col z-40 transition-all duration-300"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Crown className="w-6 h-6 text-yellow-300" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0"
            >
              <h1 className="text-xl font-bold text-white">God Mode</h1>
              <p className="text-xs text-white/70">SuperAdmin</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-white/20 text-white backdrop-blur-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-white/10 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-semibold">
                {currentUser.full_name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.full_name}
              </p>
              <p className="text-xs text-white/60">SuperAdmin</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-500 hover:text-white hover:bg-blue-500 transition-colors shadow-md"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </motion.aside>
  );
};

export default GodModeSidebar;

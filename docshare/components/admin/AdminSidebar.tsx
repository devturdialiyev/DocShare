"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserPlus,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { currentUser } from "@/lib/mock/data";

interface AdminSidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hospitals", label: "Hospitals", icon: Building2 },
  { id: "doctors", label: "Doctors", icon: Users },
  { id: "patients", label: "Patients", icon: UserPlus },
  { id: "scheduling", label: "Scheduling", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const bottomNavItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Log Out", icon: LogOut },
];

const AdminSidebar = ({ activeItem = "dashboard", onItemClick }: AdminSidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-green-500 p-3 rounded-full shadow-lg"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isMobileOpen ? 0 : 0 }}
        className={cn(
          "fixed left-0 top-0 h-screen w-[280px] bg-gradient-primary flex flex-col z-40",
          !isMobileOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-white/70">Regional Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onItemClick?.(item.id);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-white/20 text-white backdrop-blur-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavAdmin"
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
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Profile */}
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
              <p className="text-xs text-white/60">Regional Admin</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;

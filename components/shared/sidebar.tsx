"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Heart,
  Users,
  Calendar,
  FileText,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Stethoscope,
} from "lucide-react";
import { currentUser } from "@/lib/mock/data";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/user/dashboard" },
  { id: "health", label: "My Health", icon: Heart, href: "/user/health" },
  { id: "family", label: "My Family", icon: Users, href: "/user/dashboard" },
  { id: "appointments", label: "Appointments", icon: Calendar, href: "/user/dashboard" },
  { id: "activity", label: "Activity", icon: Activity, href: "/user/dashboard" },
  { id: "documents", label: "Documents", icon: FileText, href: "/user/dashboard" },
];

const bottomNavItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Log Out", icon: LogOut },
];

const Sidebar = ({ activeItem = "dashboard", onItemClick }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-primary p-3 rounded-full shadow-lg"
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
          "transition-transform duration-300",
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
              <h1 className="text-xl font-bold text-white">DocShare</h1>
              <p className="text-xs text-white/70">Uzbekistan Health</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id || pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  onItemClick?.(item.id);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative",
                  isActive
                    ? "bg-white/15 text-white backdrop-blur-sm shadow-md"
                    : "text-white/70 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="ml-auto w-2 h-2 rounded-full bg-white shadow-sm"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Doctor Link */}
        <div className="p-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white transition-all duration-200"
          >
            <Stethoscope className="w-5 h-5" />
            <span className="font-medium">Doctor Mode</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-semibold">
                {currentUser.full_name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.full_name}
              </p>
              <p className="text-xs text-white/60">{currentUser.region}</p>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-4 space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

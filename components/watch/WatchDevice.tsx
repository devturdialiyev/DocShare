"use client";

import * as React from "react";

interface WatchDeviceProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeDown: () => void;
}

export default function WatchDevice({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
}: WatchDeviceProps) {
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 30) return;
    if (absDx > absDy) {
      if (dx > 0) onSwipeRight();
      else onSwipeLeft();
    } else {
      if (dy > 0) onSwipeDown();
    }
    touchStart.current = null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 select-none">
      <div className="relative">
        <div className="w-[520px] h-[520px] rounded-full bg-gray-800 shadow-2xl border-[12px] border-gray-700 flex items-center justify-center">
          <div
            className="w-[480px] h-[480px] rounded-full overflow-hidden relative box-border"
            style={{ boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.04)" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full h-full px-[12px] pt-[16px] pb-[8px] overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[6px] h-16 bg-gray-600 rounded-full" />
      </div>
      <p className="mt-6 text-sm text-gray-400 text-center">
        Swipe left/right to navigate &middot; Swipe down for notifications
        <br />
        <span className="text-xs">Samsung Galaxy Watch 8 &middot; 480&times;480</span>
      </p>
    </div>
  );
}

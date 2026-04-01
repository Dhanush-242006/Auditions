import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "default" | "pills";
}

export function Tabs({ tabs, activeTab, onChange, className, variant = "default" }: TabsProps) {
  return (
    <div className={cn("flex space-x-1 rounded-xl p-1", variant === "default" ? "bg-white/5" : "bg-transparent", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex items-center justify-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none",
            activeTab === tab.id ? "text-white" : "text-white/50 hover:text-white/80"
          )}
        >
          {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className={cn(
                "absolute inset-0 z-[-1] rounded-lg",
                variant === "default" ? "bg-white/10 shadow-sm" : "bg-primary shadow-lg shadow-primary/20"
              )}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

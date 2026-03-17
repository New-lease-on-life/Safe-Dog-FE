"use client";
import { useState } from "react";

export type TabType = "basic" | "disease";
export const useTabState = (initialTab: TabType = "basic") => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  return {
    activeTab,
    setActiveTab,
  };
};

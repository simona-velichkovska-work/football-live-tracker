// components/ui/TabPanel.tsx
"use client";

import { ReactNode } from "react";

type TabPanelProps = {
  tabId: string;
  children: ReactNode;
};

export default function TabPanel({ children }: TabPanelProps) {
  return (
    <div className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      {children}
    </div>
  );
}

// components/ui/TabPanel.tsx
"use client";

import { ReactNode } from "react";

type TabPanelProps = {
  tabId: string;
  children: ReactNode;
};

export default function TabPanel({ children }: TabPanelProps) {
  return <div className="text-sm text-gray-300">{children}</div>;
}

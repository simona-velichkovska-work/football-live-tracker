// components/ui/Tabs.tsx
"use client";

import { ReactNode, useState } from "react";

type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  children: ReactNode;
};

export default function Tabs({ tabs, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="flex gap-2 border-b border-gray-700 mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "text-[#1cca5b] border-b-2 border-[#1cca5b]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {Array.isArray(children)
        ? children.find(
            (child: any) => child.props.tabId === activeTab
          )
        : children}
    </div>
  );
}

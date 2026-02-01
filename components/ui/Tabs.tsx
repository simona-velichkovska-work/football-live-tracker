// components/ui/Tabs.tsx
"use client";

import { isValidElement, ReactElement, ReactNode, useState } from "react";

type Tab = {
  id: string;
  label: string;
  icon?: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  children: ReactNode;
};

function isTabPanel(
  node: ReactNode
): node is ReactElement<{ tabId: string }> {
  return isValidElement<{ tabId: string }>(node) && typeof node.props.tabId === "string";
}

export default function Tabs({ tabs, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const panels = Array.isArray(children) ? children : [children];
  const activePanel = panels.find(
    (child): child is ReactElement<{ tabId: string }> =>
      isTabPanel(child) && child.props.tabId === activeTab
  );

  return (
    <div className="w-full">
      {/* TAB LIST */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] bg-[#1d222a] p-1 rounded-xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg transition-all
                ${
                  isActive
                    ? "bg-[#1cca5b] text-[#2b303b] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-4">{activePanel}</div>
    </div>
  );
}
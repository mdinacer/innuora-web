"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  basicLabel?: string;
  advancedLabel?: string;
  basicContent: React.ReactNode;
  advancedContent: React.ReactNode;
  ariaLabel?: string;
}

const TAB_IDS = ["basic", "advanced"] as const;
type TabId = (typeof TAB_IDS)[number];

const DiagnosticsTabs: React.FC<Props> = ({
  basicLabel = "Basic diagnostic",
  advancedLabel = "Advanced diagnostic",
  basicContent,
  advancedContent,
  ariaLabel = "Diagnostics sections",
}) => {
  const [selectedTab, setSelectedTab] = React.useState<TabId>("basic");

  const tabs: Array<{
    id: TabId;
    label: string;
    content: React.ReactNode;
  }> = React.useMemo(
    () => [
      { id: "basic", label: basicLabel, content: basicContent },
      { id: "advanced", label: advancedLabel, content: advancedContent },
    ],
    [basicLabel, advancedLabel, basicContent, advancedContent],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          break;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        const nextTab = tabs[nextIndex];
        setSelectedTab(nextTab.id);
        const button = document.getElementById(`${nextTab.id}-tab`);
        button?.focus();
      }
    },
    [tabs],
  );

  return (
    <div>
      <div
        className={cn("tab-buttons flex flex-wrap gap-3")}
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            id={`${tab.id}-tab`}
            role="tab"
            aria-selected={selectedTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            tabIndex={selectedTab === tab.id ? 0 : -1}
            onClick={() => setSelectedTab(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "px-4 py-2 rounded-md bg-card shadow-soft text-sm border-b transition-all duration-200 ease-in",
              {
                "border-b-primary text-primary font-semibold":
                  selectedTab === tab.id,
              },
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${tab.id}-tab`}
          hidden={selectedTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default DiagnosticsTabs;

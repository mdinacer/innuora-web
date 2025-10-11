"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  basicLabel?: string;
  advancedLabel?: string;
  basicContent: React.ReactNode;
  advancedContent: React.ReactNode;
}

const DiagnosticsTabs: React.FC<Props> = ({
  basicLabel = "Basic diagnostic",
  advancedLabel = "Advanced diagnostic",
  basicContent,
  advancedContent,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<"basic" | "advanced">(
    "basic",
  );
  return (
    <>
      <div className={cn("tab-buttons flex flex-wrap gap-3")}>
        <button
          onClick={() => setSelectedTab("basic")}
          className={cn(
            "active px-4 py-2 rounded-md bg-card shadow-soft text-sm border-b",
            "transition-all duration-200 ease-in",
            {
              "border-b-primary text-primary font-semibold":
                selectedTab === "basic",
            },
          )}
          data-tab="basic"
        >
          {basicLabel}
        </button>
        <button
          onClick={() => setSelectedTab("advanced")}
          className={cn(
            "active px-4 py-2 rounded-md bg-card shadow-soft text-sm border-b",
            "transition-all duration-200 ease-in",
            {
              "border-b-primary text-primary font-semibold":
                selectedTab === "advanced",
            },
          )}
          data-tab="advanced"
        >
          {advancedLabel}
        </button>
      </div>
      {selectedTab === "basic" ? basicContent : advancedContent}
    </>
  );
};

export default DiagnosticsTabs;

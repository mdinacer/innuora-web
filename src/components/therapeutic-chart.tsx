"use client";

import { useId } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

// =====================================
//  Precomputed demo-safe dataset
// =====================================
const analysisData = [
  {
    exchange: 1,
    emotionalIntensity: 2.5,
    cognitiveLoad: 2.5,
    readiness: 0.4,
    integration: 1,
  },
  {
    exchange: 2,
    emotionalIntensity: 2.3,
    cognitiveLoad: 2.3,
    readiness: 0.4,
    integration: 0,
  },
  {
    exchange: 3,
    emotionalIntensity: 2.2,
    cognitiveLoad: 2.2,
    readiness: 0.6,
    integration: 1,
  },
  {
    exchange: 4,
    emotionalIntensity: 2.1,
    cognitiveLoad: 2.2,
    readiness: 0.5,
    integration: 1,
  },
  {
    exchange: 5,
    emotionalIntensity: 2.0,
    cognitiveLoad: 1.8,
    readiness: 0.7,
    integration: 0,
  },
  {
    exchange: 6,
    emotionalIntensity: 1.9,
    cognitiveLoad: 1.9,
    readiness: 0.8,
    integration: 1,
  },
  {
    exchange: 7,
    emotionalIntensity: 1.8,
    cognitiveLoad: 1.7,
    readiness: 0.8,
    integration: 0,
  },
  {
    exchange: 8,
    emotionalIntensity: 1.7,
    cognitiveLoad: 1.6,
    readiness: 0.6,
    integration: 1,
  },
  {
    exchange: 9,
    emotionalIntensity: 1.6,
    cognitiveLoad: 1.5,
    readiness: 0.8,
    integration: 1,
  },
  {
    exchange: 10,
    emotionalIntensity: 1.6,
    cognitiveLoad: 1.7,
    readiness: 0.6,
    integration: 0,
  },
  {
    exchange: 11,
    emotionalIntensity: 1.5,
    cognitiveLoad: 1.4,
    readiness: 0.8,
    integration: 1,
  },
  {
    exchange: 12,
    emotionalIntensity: 1.4,
    cognitiveLoad: 1.3,
    readiness: 0.8,
    integration: 1,
  },
  {
    exchange: 13,
    emotionalIntensity: 1.3,
    cognitiveLoad: 1.2,
    readiness: 0.8,
    integration: 0,
  },
  {
    exchange: 14,
    emotionalIntensity: 1.2,
    cognitiveLoad: 1.1,
    readiness: 0.8,
    integration: 1,
  },
  {
    exchange: 15,
    emotionalIntensity: 1.1,
    cognitiveLoad: 1.0,
    readiness: 0.9,
    integration: 1,
  },
  {
    exchange: 16,
    emotionalIntensity: 1.0,
    cognitiveLoad: 0.9,
    readiness: 0.9,
    integration: 1,
  },
  {
    exchange: 17,
    emotionalIntensity: 1.0,
    cognitiveLoad: 0.8,
    readiness: 1.0,
    integration: 0,
  },
  {
    exchange: 18,
    emotionalIntensity: 1.0,
    cognitiveLoad: 0.8,
    readiness: 1.0,
    integration: 1,
  },
];

const colors = ["bg-primary", "bg-red-500", "bg-green-600", "bg-purple-600"];

// =====================================
//  Chart Component
// =====================================
export default function TherapeuticProgressChart() {
  const { t } = useTranslation("demo", { keyPrefix: "chart" });
  const chartTitleId = useId();
  const chartDescriptionId = useId();

  const {
    header: analyticsHeader,
    metrics,
    insights,
  } = {
    header: {
      title: t("analytics.header.title"),
      subtitle: t("analytics.header.subtitle"),
    },
    metrics: {
      emotional_cognitive: {
        title: t("analytics.metrics.emotional_cognitive.title"),
        badge: t("analytics.metrics.emotional_cognitive.badge"),
        rows: {
          emotional_intensity: {
            label: t(
              "analytics.metrics.emotional_cognitive.rows.emotional_intensity.label",
            ),
            value: t(
              "analytics.metrics.emotional_cognitive.rows.emotional_intensity.value",
            ),
          },
          cognitive_load: {
            label: t(
              "analytics.metrics.emotional_cognitive.rows.cognitive_load.label",
            ),
            value: t(
              "analytics.metrics.emotional_cognitive.rows.cognitive_load.value",
            ),
          },
          overall_regulation: {
            label: t(
              "analytics.metrics.emotional_cognitive.rows.overall_regulation.label",
            ),
            value: t(
              "analytics.metrics.emotional_cognitive.rows.overall_regulation.value",
            ),
          },
        },
      },
      readiness: {
        title: t("analytics.metrics.readiness.title"),
        badge: t("analytics.metrics.readiness.badge"),
        rows: {
          engaged: {
            label: t("analytics.metrics.readiness.rows.engaged.label"),
            value: t("analytics.metrics.readiness.rows.engaged.value"),
          },
          ambivalent: {
            label: t("analytics.metrics.readiness.rows.ambivalent.label"),
            value: t("analytics.metrics.readiness.rows.ambivalent.value"),
          },
          final_state: {
            label: t("analytics.metrics.readiness.rows.final_state.label"),
            value: t("analytics.metrics.readiness.rows.final_state.value"),
          },
        },
      },
      integration: {
        title: t("analytics.metrics.integration.title"),
        badge: t("analytics.metrics.integration.badge"),
        rows: {
          early_insights: {
            label: t("analytics.metrics.integration.rows.early_insights.label"),
            value: t("analytics.metrics.integration.rows.early_insights.value"),
          },
          mid_breakthroughs: {
            label: t(
              "analytics.metrics.integration.rows.mid_breakthroughs.label",
            ),
            value: t(
              "analytics.metrics.integration.rows.mid_breakthroughs.value",
            ),
          },
          sustained_insight: {
            label: t(
              "analytics.metrics.integration.rows.sustained_insight.label",
            ),
            value: t(
              "analytics.metrics.integration.rows.sustained_insight.value",
            ),
          },
        },
      },
    },
    insights: {
      title: t("analytics.insights.title"),
      list: t("analytics.insights.list", {
        returnObjects: true,
      }) as string[],
    },
  };

  const header = {
    badge: t("header.badge"),
    title: t("header.title"),
    subtitle: t("header.subtitle"),
  };

  const accessibleSummaryTitle = t("analytics.accessibility.summaryTitle", {
    defaultValue: "Therapeutic progress chart data",
  });
  const accessibleSummaryDescription = t(
    "analytics.accessibility.summaryDescription",
    {
      defaultValue:
        "Table listing exchanges with emotional intensity, cognitive load, therapeutic readiness, and insight milestones.",
    },
  );
  const exchangeColumnLabel = t("analytics.accessibility.exchange", {
    defaultValue: "Exchange",
  });
  const readinessColumnLabel = t("analytics.accessibility.readiness", {
    defaultValue: "Therapeutic readiness score",
  });
  const integrationColumnLabel = t("analytics.accessibility.integration", {
    defaultValue: "Insight milestone present",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12 w-full py-8">
      <div className="mb-6 text-center space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground shadow-soft">
          {header.badge}
        </p>
        <h2 className="text-3xl font-serif">{header.title}</h2>
        <p className="text-sm ">{header.subtitle}</p>
      </div>

      <div className="rounded-app shadow-soft bg-card  border border-border p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2" id={chartTitleId}>
            {analyticsHeader.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {analyticsHeader.subtitle}
          </p>
        </div>
        <div
          className="relative h-96"
          role="img"
          aria-labelledby={chartTitleId}
          aria-describedby={chartDescriptionId}
        >
          <ResponsiveContainer width="100%" height="100%" aria-hidden="true">
            <ComposedChart data={analysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="exchange"
                tickFormatter={(v) => `Ex ${v}`}
                tick={{ fontSize: 12, fill: "#475569" }}
              />
              <YAxis domain={[0, 3]} tick={{ fontSize: 12, fill: "#475569" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                }}
                labelFormatter={(value) => `Exchange ${value}`}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-gray-800">{value}</span>
                )}
              />

              <Area
                type="natural"
                dataKey="emotionalIntensity"
                fill="rgba(0,141,204,0.1)"
                stroke="#008DCC"
                strokeWidth={2}
                name="Emotional Intensity"
              />
              <Line
                type="natural"
                dataKey="cognitiveLoad"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
                name="Cognitive Load"
              />
              <Line
                type="natural"
                dataKey="readiness"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Therapeutic Readiness"
              />
              <Scatter
                dataKey="integration"
                fill="#9333EA"
                name="Insight Milestones"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div id={chartDescriptionId} className="sr-only">
          <p className="font-semibold">{accessibleSummaryTitle}</p>
          <p>{accessibleSummaryDescription}</p>
          <table>
            <caption className="sr-only">{accessibleSummaryTitle}</caption>
            <thead>
              <tr>
                <th scope="col">{exchangeColumnLabel}</th>
                <th scope="col">
                  {metrics.emotional_cognitive.rows.emotional_intensity.label}
                </th>
                <th scope="col">
                  {metrics.emotional_cognitive.rows.cognitive_load.label}
                </th>
                <th scope="col">{readinessColumnLabel}</th>
                <th scope="col">{integrationColumnLabel}</th>
              </tr>
            </thead>
            <tbody>
              {analysisData.map((row) => (
                <tr key={row.exchange}>
                  <th scope="row">{row.exchange}</th>
                  <td>{row.emotionalIntensity}</td>
                  <td>{row.cognitiveLoad}</td>
                  <td>{row.readiness}</td>
                  <td>
                    {row.integration === 1
                      ? t("analytics.accessibility.integrationYes", {
                          defaultValue: "Yes",
                        })
                      : t("analytics.accessibility.integrationNo", {
                          defaultValue: "No",
                        })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- Metrics Grid --> */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* <!-- Emotional & Cognitive Overview --> */}
        <div className="rounded-app shadow-soft bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {metrics.emotional_cognitive.title}
            </h3>
            <span className="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium bg-brand-50 text-brand-800">
              {metrics.emotional_cognitive.badge}
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.emotional_cognitive.rows.emotional_intensity.label}
              </span>
              <span className="font-semibold">
                {metrics.emotional_cognitive.rows.emotional_intensity.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.emotional_cognitive.rows.cognitive_load.label}
              </span>
              <span className="font-semibold">
                {metrics.emotional_cognitive.rows.cognitive_load.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.emotional_cognitive.rows.overall_regulation.label}
              </span>
              <span className="font-semibold text-primary">
                {metrics.emotional_cognitive.rows.overall_regulation.value}
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Readiness & Engagement --> */}
        <div className="rounded-app shadow-soft bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{metrics.readiness.title}</h3>
            <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              {metrics.readiness.badge}
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.readiness.rows.engaged.label}
              </span>
              <span className="font-semibold">
                {metrics.readiness.rows.engaged.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.readiness.rows.ambivalent.label}
              </span>
              <span className="font-semibold">
                {metrics.readiness.rows.ambivalent.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.readiness.rows.final_state.label}
              </span>
              <span className="font-semibold text-green-600">
                {metrics.readiness.rows.final_state.value}
              </span>
            </div>
          </div>
        </div>

        {/* <!-- Integration & Insight Formation --> */}
        <div className="rounded-app shadow-soft bg-card border border-border p-6 ">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {metrics.integration.title}
            </h3>
            <span className="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium text-brand-800 bg-brand-50">
              {metrics.integration.badge}
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.integration.rows.early_insights.label}
              </span>
              <span className="font-semibold">
                {metrics.integration.rows.early_insights.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.integration.rows.mid_breakthroughs.label}
              </span>
              <span className="font-semibold">
                {metrics.integration.rows.mid_breakthroughs.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {metrics.integration.rows.sustained_insight.label}
              </span>
              <span className="font-semibold text-primary">
                {metrics.integration.rows.sustained_insight.value}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Insights Summary --> */}
      <div className="rounded-app p-8 bg-primary/5 border border-primary/30  ">
        <h3 className="text-2xl font-semibold mb-4">{insights.title}</h3>
        <ul className="space-y-3 text-sm">
          {insights.list.map((item, idx) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className={cn(
                  "inline-block w-2 h-2 rounded-full mt-2",
                  colors[idx % colors.length],
                )}
              ></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

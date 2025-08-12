// source/app/page.tsx
"use client";

import DashboardLayout from "./components/DashboardLayout";
import StatsBar from "./components/StatsBar";

const stats = [
  {
    name: "Current Rent",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive" as const,
  },
  {
    name: "Next Month",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative" as const,
  },
  {
    name: "Current Occupancy",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive" as const,
  },
  {
    name: "Next Month",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative" as const,
  },
  {
    name: "Total Leases",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative" as const,
  },
];

export default function MainPage() {
  return (
    <DashboardLayout currentPath="/">
      <StatsBar stats={stats} />
      {/* Add any other dashboard content here */}
    </DashboardLayout>
  );
}

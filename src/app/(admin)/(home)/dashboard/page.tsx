"use client";

import DashboardBarChart from "@/components/dashboard/DashboardBarChart";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import React from "react";
import useAuth from "@/hooks/useAuth";

export default function Dashboard() {
  useAuth();

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <DashboardMetrics />
      </div>
      <div className="col-span-12">
        <DashboardBarChart />
      </div>
    </div>
  );
}

import AcquisitionChannelChart from "@/components/dashboard/AcquisitionChannelChart";
import ActiveUsersChart from "@/components/dashboard/ActiveUsersChart";
import DashboardBarChart from "@/components/dashboard/DashboardBarChart";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import { Metadata } from "next";
import React from "react";
import RecentOrderAnalytics from "@/components/dashboard/RecentOrderAnalytics";
import SessionChart from "@/components/dashboard/SessionChart";
import TopChannel from "@/components/dashboard/TopChannel";
import TopPages from "@/components/dashboard/TopPages";

export const metadata: Metadata = {
  title: "Next.js Analytics Dashboard | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Analytics Dashboard page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function Dashboard() {
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

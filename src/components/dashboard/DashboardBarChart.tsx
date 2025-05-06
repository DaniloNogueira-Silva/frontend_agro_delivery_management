"use client";

import React, { useEffect, useState } from "react";

import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { Delivery } from "@/utils/interfaces/delivery.interface";
import { HttpRequest } from "@/utils/http-request";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DashboardBarChart() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [dailyDeliveries, setDailyDeliveries] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const httpRequest = new HttpRequest();
      const foundDeliveries = await httpRequest.getDeliveries();
      setDeliveries(foundDeliveries);
      processDeliveries(foundDeliveries);
    };

    fetchData();
  }, []);

  const processDeliveries = (deliveries: Delivery[]) => {
    const dailyCounts: number[] = Array(31).fill(0); 
    const daysOfMonth: string[] = [];

    deliveries.forEach((delivery) => {
      const date = new Date(delivery.deliveryDate);
      console.log('date', date)
      const localDay = date.getUTCDate();
      console.log('localDay', localDay)

      dailyCounts[localDay - 1] += 1;
    });

    console.log('dailyCounts', dailyCounts)
    daysOfMonth.push(...Array.from({ length: 31 }, (_, i) => (i + 1).toString()));
    console.log('daysOfMonth', daysOfMonth)

    setCategories(daysOfMonth);
    setDailyDeliveries(dailyCounts);
  };

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Deliveries",
      data: dailyDeliveries, 
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
            Análise
          </h3>
          <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
            Métrica de entregas no último mês
          </span>
        </div>
        <ChartTab />
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";

import Badge from "../ui/badge/Badge";
import { Delivery } from "@/utils/interfaces/delivery.interface";
import { Driver } from "@/utils/interfaces/driver.interface";
import { HttpRequest } from "@/utils/http-request";
import { Maintenance } from "@/utils/interfaces/maintenance.interface";
import { Truck } from "@/utils/interfaces/truck.interface";

const DashboardMetrics: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const httpRequest = new HttpRequest();
      const foundDrivers = await httpRequest.getDrivers();
      setDrivers(foundDrivers);

      const foundTrucks = await httpRequest.getTrucks();
      setTrucks(foundTrucks);

      const foundDeliveries = await httpRequest.getDeliveries();
      setDeliveries(foundDeliveries);

      const foundMaintenances = await httpRequest.getMaintenances();
      setMaintenances(foundMaintenances);
    };


    fetchData();
  }, []);

  const mockData = [
    {
      id: 1,
      title: "Motoristas",
      value: drivers?.length,
      change: "+20%",
      direction: "up",
      comparisonText: "Vs último mês",
    },
    {
      id: 2,
      title: "Caminhões",
      value: trucks?.length,
      change: "+4%",
      direction: "up",
      comparisonText: "Vs último mês",
    },
    {
      id: 3,
      title: "Entregas",
      value: deliveries?.length,
      change: "-1.59%",
      direction: "down",
      comparisonText: "Vs último mês",
    },
    {
      id: 4,
      title: "Manutenções nesse mês",
      value: maintenances?.length,
      change: "+7%",
      direction: "up",
      comparisonText: "Vs último mês",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {mockData.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <p className="text-gray-500 text-theme-sm dark:text-gray-400">
            {item.title}
          </p>
          <div className="flex items-end justify-between mt-3">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                {item.value}
              </h4>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                color={item.direction === "up" ? "success" : item.direction === "down" ? "error" : "warning"}
              >
                <span className="text-xs"> {item.change}</span>
              </Badge>
              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                {item.comparisonText}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;

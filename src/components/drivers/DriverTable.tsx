"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

import Badge from "../ui/badge/Badge";
import Button from "@/components/ui/button/Button"; // Importando o Button para ações
import { Driver } from "@/utils/interfaces/driver.interface";
import DriverFormModal from "./DriverModal";
import { HttpRequest } from "@/utils/http-request";

export default function DriverTable() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar a abertura do modal
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null); // Motorista selecionado

  useEffect(() => {
    const fetchDrivers = async () => {
      const httpRequest = new HttpRequest();
      const foundDrivers = await httpRequest.getDrivers();
      setDrivers(foundDrivers);
    };

    fetchDrivers();
  }, []);

  const openModal = (driver: Driver) => {
    setSelectedDriver(driver); // Seleciona o motorista para edição
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
    setSelectedDriver(null); // Limpa a seleção do motorista
  };

  const handleDelete = async (driverId?: string) => {
    try {
      const httpRequest = new HttpRequest();
      await httpRequest.deleteDriver(driverId); // Deleta o motorista no backend
      setDrivers(drivers.filter(driver => driver._id !== driverId)); // Remove da lista de motoristas
    } catch (error) {
      console.error("Erro ao deletar motorista:", error);
    }
  };

  const handleSave = (updatedDriver: Driver) => {
    // Atualiza a lista de motoristas após salvar
    setDrivers(drivers.map(driver => (driver._id === updatedDriver._id ? updatedDriver : driver)));
    closeModal(); // Fecha o modal
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Motorista
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                CNH
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data de Contratação
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Caminhão atual
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total de entregas
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data de expiração da CNH
              </TableCell>
              {/* Coluna de Ações */}
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {drivers.map((driver) => (
              <TableRow key={driver._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {driver.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {driver.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {driver.licenseNumber}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {driver.hireDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      driver.status === "Ativo"
                        ? "success"
                        : driver.status === "Inativo"
                        ? "warning"
                        : "error"
                    }
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {driver.assignedTruck}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {driver.totalDeliveries}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {driver.licenseExpirationDate}
                </TableCell>

                {/* Coluna de Ações */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Button
                    size="sm"
                    onClick={() => openModal(driver)} // Abre o modal para editar
                    className="mr-2"
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(driver._id)} // Deleta o motorista
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && selectedDriver && (
        <DriverFormModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          driver={selectedDriver}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

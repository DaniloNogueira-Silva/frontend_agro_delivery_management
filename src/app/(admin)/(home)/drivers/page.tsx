"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import { Driver } from "@/utils/interfaces/driver.interface";
import DriverFormModal from "@/components/drivers/DriverModal";
import DriverTable from "@/components/drivers/DriverTable";
import { HttpRequest } from "@/utils/http-request";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function Drivers() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar a abertura/fechamento do modal
    const [drivers, setDrivers] = useState<Driver[]>([]); // Lista de motoristas
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null); // Motorista selecionado para edição

    useEffect(() => {
        const fetchDrivers = async () => {
            const httpRequest = new HttpRequest();
            const foundDrivers = await httpRequest.getDrivers();
            setDrivers(foundDrivers);
        };

        fetchDrivers(); // Carrega os motoristas quando a página é carregada
    }, []);

    const openModal = (driver: Driver | null) => {
        setSelectedDriver(driver); // Se for null, é para criar um novo motorista
        setIsModalOpen(true); // Abre o modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Fecha o modal
        setSelectedDriver(null); // Limpa o motorista selecionado após o fechamento
    };

    const handleSave = (updatedDriver: Driver) => {
        if (updatedDriver._id) {
            setDrivers(drivers.map(driver => (driver._id === updatedDriver._id ? updatedDriver : driver)));
        } else {
            setDrivers([...drivers, updatedDriver]);
        }
        closeModal();
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Motoristas" />

            {/* Botão para abrir o modal */}
            <div className="flex justify-end mt-6">
                <Button size="md" variant="outline" onClick={() => openModal(null)}>
                    Cadastrar Motorista
                </Button>
            </div>

            {/* Tabela de motoristas */}
            <div className="space-y-6 mt-5">
                <DriverTable />
            </div>

            {/* Modal para criar/editar motorista */}
            <DriverFormModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                driver={selectedDriver} // Passa o motorista selecionado (ou null para criar)
                onSave={handleSave} // Função para salvar ou editar
            />
        </div>
    );
}

"use client";

import React, { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import { HttpRequest } from "@/utils/http-request";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";

interface Driver {
  _id?: string; // O _id agora é opcional, pois pode ser novo ou editado
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  hireDate: string;
  status: string;
  assignedTruck: string;
  totalDeliveries: number;
  licenseExpirationDate: string;
}

interface DriverFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  driver: Driver | null; // Aceita um motorista para edição ou null para criação
  onSave: (driver: Driver) => void; // Função chamada quando o motorista for salvo
}

const DriverFormModal: React.FC<DriverFormModalProps> = ({ isOpen, closeModal, driver, onSave }) => {
  const [driverData, setDriverData] = useState<Driver>({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    hireDate: "",
    status: "",
    assignedTruck: "",
    totalDeliveries: 0,
    licenseExpirationDate: "",
  });

  // Preenche os campos com os dados do motorista selecionado quando o modal for aberto
  useEffect(() => {
    if (driver) {
      setDriverData(driver);
    }
  }, [driver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const httpRequest = new HttpRequest();
      if (driverData._id) {
        // Se o motorista tem um _id, significa que estamos editando
        await httpRequest.updateDriver(driverData._id, driverData);
      } else {
        // Se não tem _id, significa que estamos criando um novo motorista
        await httpRequest.createDriver(driverData);
      }
      onSave(driverData); // Chama a função de salvar para atualizar a lista
      closeModal(); // Fecha a modal após o envio
    } catch (error) {
      console.error("Erro ao salvar motorista:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[584px] p-5 lg:p-10">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {driverData._id ? "Editar Motorista" : "Cadastrar Motorista"}
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Nome</Label>
            <Input
              type="text"
              name="name"
              defaultValue={driverData.name} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Nome do Motorista"
            />
          </div>

          <div className="col-span-1">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              defaultValue={driverData.email} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>

          <div className="col-span-1">
            <Label>Telefone</Label>
            <Input
              type="text"
              name="phone"
              defaultValue={driverData.phone} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Telefone"
            />
          </div>

          <div className="col-span-1">
            <Label>CNH</Label>
            <Input
              type="text"
              name="licenseNumber"
              defaultValue={driverData.licenseNumber} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Número da CNH"
            />
          </div>

          <div className="col-span-1">
            <Label>Data de Contratação</Label>
            <Input
              type="date"
              name="hireDate"
              defaultValue={driverData.hireDate} // Usa defaultValue
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-1">
            <Label>Status</Label>
            <Input
              type="text"
              name="status"
              defaultValue={driverData.status} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Status"
            />
          </div>

          <div className="col-span-1">
            <Label>Caminhão Atribuído</Label>
            <Input
              type="text"
              name="assignedTruck"
              defaultValue={driverData.assignedTruck} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Caminhão Atribuído"
            />
          </div>

          <div className="col-span-1">
            <Label>Total de Entregas</Label>
            <Input
              type="number"
              name="totalDeliveries"
              defaultValue={driverData.totalDeliveries.toString()} // Usa defaultValue
              onChange={handleInputChange}
              placeholder="Total de Entregas"
            />
          </div>

          <div className="col-span-1">
            <Label>Data de Expiração da CNH</Label>
            <Input
              type="date"
              name="licenseExpirationDate"
              defaultValue={driverData.licenseExpirationDate} // Usa defaultValue
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Fechar
          </Button>
          <Button size="sm">
            {driverData._id ? "Salvar Alterações" : "Salvar Motorista"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DriverFormModal;

import { Delivery } from "./interfaces/delivery.interface";
import { Driver } from "./interfaces/driver.interface";
import { Maintenance } from "./interfaces/maintenance.interface";
import { Truck } from "./interfaces/truck.interface";
import axios from "axios";

export class HttpRequest {
  async getToken(): Promise<string> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  }

  async login(email: string, password: string): Promise<string | undefined> {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response?.data.access_token);
      return response?.data.access_token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    role: string
  ): Promise<void> {
    try {
      return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        email,
        password,
        name,
        role,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getDrivers(): Promise<Driver[] | []> {
    const token = await this.getToken();

    const getDriversResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/driver`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getDriversResponse.data;
  }

  async getTrucks(): Promise<Truck[] | []> {
    const token = await this.getToken();

    const getTrucksResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/truck`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getTrucksResponse.data;
  }

  async getDeliveries(): Promise<Delivery[] | []> {
    const token = await this.getToken();

    const getDeliveriesResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delivery`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getDeliveriesResponse.data;
  }

  async getMaintenances(): Promise<Maintenance[] | []> {
    const token = await this.getToken();

    const getMaintenancesResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/maintenance`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getMaintenancesResponse.data;
  }

  async createDriver(data: Driver): Promise<void> {
    try {
      const token = await this.getToken();
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/driver`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateDriver(driverId: string, data: Driver): Promise<void> {
    try {
      const token = await this.getToken();
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/driver/${driverId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteDriver(driverId?: string): Promise<void> {
    try {
      const token = await this.getToken();
      return await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/driver/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

import { Delivery } from "./interfaces/delivery.interface";
import { Driver } from "./interfaces/driver.interface";
import { Maintenance } from "./interfaces/maintenance.interface";
import { Truck } from "./interfaces/truck.interface";
import axios from "axios";

export class HttpRequest {
  async getToken(): Promise<string> {
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    //   {
    //     email: "admin@email.com",
    //     password: "123456",
    //   }
    // );

    // return response.data.access_token;
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODEzZGYzYjAxMjZkZGE4YzAxOGY4MjMiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImlhdCI6MTc0NjU2MDExMywiZXhwIjoxNzQ2NTYzNzEzfQ.vHdn6DhjoIU0HxKvZcjI6Wx-g71HKdvAVnYbf24WwS0";
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
}

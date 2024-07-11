import axios from "axios";
import { Data } from "../../types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addData = async (data: Data[]) => {
  try {
    const response = await apiClient.post("/add-data", data);
    return {
      data: response.data.body.data,
      lastUpdate: response.data.lastUpdate,
    };
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const getAllData = async () => {
  try {
    const response = await apiClient.get("/get-all-data");
    return response.data?.body?.data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const deleteData = async (type: string) => {
  try {
    const response = await apiClient.delete(`/delete-data/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const updateDataByType = async (type: string, data: Data) => {
  try {
    const response = await apiClient.put(`/update-data/${type}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
export const updateData = async (data: Data[]) => {
  try {
    const response = await apiClient.put(`/update-bulk-data`, data);
    return {
      data: response.data.body.data,
      lastUpdate: response.data.lastUpdate,
    };
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

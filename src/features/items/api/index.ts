import axios from "axios";
import { ItemData } from "../types";

// Example data for testing
const rawItemsList = [
  {
    code: "iw01002",
    upgrade: "7fffffff",
  },
  {
    code: "iu01001",
    upgrade: "70ffffff",
  },
  {
    code: "il01001",
    upgrade: "700fffff",
  },
];

export const API_URL = "https://db.arcanum.rf-platform.online/api";

export const fetchItems = async (language: string): Promise<ItemData[]> => {
  try {
    const response = await axios.post(
      `${API_URL}/items?lang=${language}`,
      { list: rawItemsList },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    // Let the caller handle the error
    throw error;
  }
};

// Mock API for local development or testing
export const fetchItemsMock = async (): Promise<ItemData[]> => {
  // This would be replaced with actual mock data
  return [];
};

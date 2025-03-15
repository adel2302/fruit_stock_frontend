import axios from "axios";

const API_URL = "http://localhost:4000"; // 🔥 Mets ici le bon port de ton backend

export const signup = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || "Erreur lors de l'inscription";
  }
};

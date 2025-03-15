import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
  balance_usdt: number;
  status: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  restoreUser: () => void; // 🔥 Vérifie que restoreUser est bien déclaré ici
};

// 🔥 Création du store Zustand
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setUser: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({ user, token }); // 🔥 Met à jour Zustand immédiatement
    console.log("User stocké dans Zustand :", user); // 🔥 Debugging
  },

  restoreUser: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));


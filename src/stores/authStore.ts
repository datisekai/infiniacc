import { create } from "zustand";

interface IState {
  token: string;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<IState>((set) => ({
  token: "",
  login: async () => {
    set((state) => ({ ...state, token: "token" }));
  },
  logout: () => {
    set((state) => ({ ...state, token: "" }));
  },
}));

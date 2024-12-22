import { create } from "zustand";
import { apiConfig, processMiddlewareSendRequest } from "../apis";
import {
  getStringLocalData,
  removeLocalItem,
  setStringLocalData,
} from "../utils";
import { localKey } from "../constants";

interface IState {
  token: string;
  user: IUser;
  login: (idToken: string) => Promise<boolean>;
  logout: () => void;
  getMe: () => Promise<void>;
}

export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: string;
  email: string;
  role: string;
  contact: any;
  active: boolean;
  name: string;
  avatar?: string;
}

export const useAuthStore = create<IState>((set) => ({
  token: getStringLocalData(localKey.TOKEN) || "",
  user: {} as IUser,
  login: async (idToken) => {
    try {
      const response = await processMiddlewareSendRequest({
        ...apiConfig.loginGoogle,
        body: { idToken },
      });
      set((state) => ({
        ...state,
        token: response.data.accessToken,
        user: response.data.user,
      }));
      setStringLocalData(localKey.TOKEN, response.data.accessToken);
      return true;
    } catch (error) {
      return false;
    }
  },
  logout: () => {
    set((state) => ({ ...state, token: "" }));
    removeLocalItem(localKey.TOKEN);
  },
  getMe: async () => {
    try {
      const response = await processMiddlewareSendRequest(apiConfig.getMe);
      set((state) => ({
        ...state,
        user: response.user,
      }));
    } catch (error) {}
  },
}));

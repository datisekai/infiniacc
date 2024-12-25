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
  login: (query: any) => Promise<boolean>;
  logout: () => void;
  getMe: () => Promise<void>;
  setUser: (user: IUser) => void;
  usedTurn: () => void;
}

export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: string;
  email: string;
  username: any;
  coin: number;
  avatar: string;
  note: any;
  role: string;
  contact: any;
  active: boolean;
  name: string;
  turn: {
    available: number;
    total: number;
  };
}

export const useAuthStore = create<IState>((set) => ({
  token: getStringLocalData(localKey.TOKEN) || "",
  user: {} as IUser,
  login: async (query: any) => {
    try {
      const response = await processMiddlewareSendRequest({
        ...apiConfig.loginGoogle,
        body: query,
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
  setUser: (user: IUser) => {
    set((state) => ({
      ...state,
      user: { ...state.user, ...user },
    }));
  },
  usedTurn: () => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        turn: {
          available: state.user.turn.available - 1,
          total: state.user.turn.total,
        },
      },
    }));
  },
}));

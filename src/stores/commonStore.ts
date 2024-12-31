import { create } from "zustand";

export interface IAction {
  title?: string;
  icon?: string;
  onClick?: () => void;
  variant?: "success" | "warning" | "danger";
}

interface ICommonState {
  isLoadingApi: boolean;
  isLoadingUpload: any;
  header: {
    title: string;
    actions: IAction[];
    headerBack?: boolean;
  };
  query?: any;
  post: any;
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: IAction[]) => void;
  setHeaderBack: (headerBack: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setLoadingUpload: (key: string, isLoading: boolean) => void;
  resetActions: () => void;
  setQuery: (query: any) => void;
  setPost: (post: any) => void;
}

export const useCommonStore = create<ICommonState>((set) => ({
  isLoadingApi: false,
  isLoadingUpload: {},
  header: {
    title: "",
    actions: [],
  },
  query: {},
  post: {},
  setQuery: (query: any) => {
    set((state) => ({
      ...state,
      query,
    }));
  },
  setHeaderTitle: (title: string) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        title,
      },
    }));
  },
  setHeaderActions: (actions: IAction[]) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        actions,
      },
    }));
  },
  setHeaderBack: (headerBack: boolean) => {
    set((state) => ({
      ...state,
      header: {
        ...state.header,
        headerBack,
      },
    }));
  },

  resetActions: () => {
    set((state) => ({
      ...state,
      header: { ...state.header, actions: [] },
    }));
  },
  setLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoadingApi: isLoading }));
  },
  setLoadingUpload: (key: string, isLoading: boolean) => {
    set((state) => ({
      ...state,
      isLoadingUpload: { ...state.isLoadingUpload, [key]: isLoading },
    }));
  },
  setPost: (post: any) => {
    set((state) => ({
      ...state,
      post,
    }));
  },
}));

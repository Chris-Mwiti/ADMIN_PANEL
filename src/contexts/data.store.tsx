import useLocalStorage from "@/hooks/useLocalStorage";
import { TLoginSchema } from "@/pages/Register/schemas/login.schema";
import { TRegisterSchema } from "@/pages/Register/schemas/register.schema";
import TUser from "@/pages/Users/schemas/users.schema";
import { create, createStore } from "zustand";

interface IUserInfo {
  username: string;
  phone: string;
  avatarUrl?: string;
  email: string;
  password: string;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}
interface ITokenActions {
  addTokens: (accessToken: string, refreshToken: string) => void;
}

interface IRegisterActions {
  logoutUser: () => void;
  updateUserInfo:(values:TUser) => void
}

interface IDataStore {
  userInfo: TUser;
  tokens: ITokens;
}

interface IDataStoreActions {
  tokenActions: ITokenActions;
  registerActions: IRegisterActions;
}

type TDataStore = IDataStore & IDataStoreActions;

const useDataStore = create<TDataStore>((set, get) => ({
  userInfo: {},
  tokens: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  },

  tokenActions: {
    addTokens: (accessToken: string, refreshToken: string) =>
      set((state) => ({
        ...state,
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      })),
  },

  registerActions: {
    updateUserInfo(values) {
      return set((state) => ({
        ...state,
        userInfo: values
      }))
    },
    logoutUser() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
}));

export const useUserInfo = () => useDataStore((state) => state.userInfo);
export const useRegisterActions = () =>
  useDataStore((state) => state.registerActions);
export const useTokens = () => useDataStore((state) => state.tokens);
export const useTokensActions = () =>
  useDataStore((state) => state.tokenActions);

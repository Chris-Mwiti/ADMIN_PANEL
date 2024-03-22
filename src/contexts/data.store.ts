import useLocalStorage from "@/hooks/useLocalStorage";
import { TLoginSchema } from "@/pages/Register/schemas/login.schema";
import { TRegisterSchema } from "@/pages/Register/schemas/register.schema";
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
  loginUser: (values: TLoginSchema) => boolean;
  logoutUser: () => boolean;
  registerUser: (values: TRegisterSchema) => boolean;
}

interface IDataStore {
  userInfo: TRegisterSchema[];
  tokens: ITokens;
}

interface IDataStoreActions {
  tokenActions: ITokenActions;
  registerActions: IRegisterActions;
}

type TDataStore = IDataStore & IDataStoreActions;

const useDataStore = create<TDataStore>((set, get) => ({
  userInfo: [
    {
      firstName: "Chris",
      lastName: "Mwiti",
      phone: "0712345678",
      avatarUrl: "image.jpg",
      email: "chrismwiti@gmail.com",
      password: "12345678",
    },
  ],
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
    loginUser(values) {
      const accessToken = "abdefghrtyu";
      const refreshToken = "refgefdsrt";
      const isUserAvailable = get().userInfo.find(
        (user) => user.email == values.email && user.password == values.password
      );
      if (!isUserAvailable) return false;
      if (isUserAvailable) {
        useLocalStorage("accessToken", accessToken).setItem();
        useLocalStorage("refreshToken", refreshToken).setItem();

        return true;
      }
    },
    logoutUser() {
      return false;
    },
    registerUser(values) {
      const isUserExisting = 
        get().userInfo.find((user) => user.email == values.email);
      console.log(isUserExisting);
      if (isUserExisting) return false;
      if (!isUserExisting) {
        set((state) => ({
          ...state,
          userInfo: [...get().userInfo, values],
        }));
      }
      return true;
    },
  },
}));

export const useUserInfo = () => useDataStore((state) => state.userInfo);
export const useRegisterActions = () =>
  useDataStore((state) => state.registerActions);
export const useTokens = () => useDataStore((state) => state.tokens);
export const useTokensActions = () =>
  useDataStore((state) => state.tokenActions);

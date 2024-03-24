import { create } from "zustand";
import { persist } from "zustand/middleware";
import TUser from "../schemas/users.schema";
import UserData from "./userData";

interface IUserStore {
  user: TUser;
  actions: {
    addUser: (user: TUser) => void;
    getUser: () => TUser;
    logOutUser: () => void;
  };
}

const useUserStore = create<IUserStore>((set, get) => ({
  user: {},
  actions: {
    addUser(user) {
      return set((state) => ({
        ...state,
        user: user,
      }));
    },
    getUser() {
      return get().user;
    },
    logOutUser() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
  },
}));

const useUser = () => useUserStore((state) => state.user);
const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
export { useUser, useUserActions };

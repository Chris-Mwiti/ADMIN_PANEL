import { create } from "zustand";
import { persist } from "zustand/middleware";
import TUser from "../schemas/users.schema";
import UserData from "./userData";

interface IUserStore {
    users:TUser[],
    actions:{
        addUser: (user:TUser) => void,
        findUser: (id:string) => TUser | undefined
    }
}

const useUserStore = create(
  persist<IUserStore>((set, get) => ({
    users: UserData,
    actions: {
        addUser(user) {
            return set((state) => ({
                ...state,
                users: [...get().users,user]
            }))
        },
        findUser(id) {
            return get().users.find(user => user.id == id)
        },
        
    }
  }), {
    name: "users-store",
  })
);

const useUsers = () => useUserStore(state => state.users);
const useUserActions = () => useUserStore(state => state.actions);

export default useUserStore;
export  {
    useUsers,
    useUserActions
}

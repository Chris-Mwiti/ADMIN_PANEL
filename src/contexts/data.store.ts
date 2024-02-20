import { create, createStore } from "zustand";

interface IUserInfo {
    username: string;
    phone:string;
    avatarUrl?:string;
    email:string;
}

interface IDataStore {
    userInfo:IUserInfo
}

interface IDataStoreActions {}

type TDataStore = IDataStore & IDataStoreActions;

const useDataStore = create<TDataStore>((set) => ({
    userInfo:{
        username: "Chris",
        phone: "0712345678",
        avatarUrl: "image.jpg",
        email: "chrismwiti@gmail.com"
    }
}))


export const useUserInfo = () => useDataStore(state => state.userInfo);

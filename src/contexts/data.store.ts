import { create, createStore } from "zustand";

interface IUserInfo {
    username: string;
    phone:string;
    avatarUrl?:string;
    email:string;
}

interface ITokens {
    accessToken:string;
    refreshToken:string;
}
interface ITokenActions {
    addTokens: (accessToken:string, refreshToken:string) => void
}

interface IDataStore {
    userInfo:IUserInfo,
    tokens:ITokens,
}

interface IDataStoreActions {
  tokenActions: ITokenActions;
}

type TDataStore = IDataStore & IDataStoreActions;

const useDataStore = create<TDataStore>((set) => ({
    userInfo:{
        username: "Chris",
        phone: "0712345678",
        avatarUrl: "image.jpg",
        email: "chrismwiti@gmail.com"
    },
    tokens:{
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken")
    },

    tokenActions: {
        addTokens: (accessToken:string, refreshToken:string) => set((state) => ({
            ...state,
            tokens: {
                accessToken:accessToken,
                refreshToken:refreshToken
            }
        }))
    }
}))


export const useUserInfo = () => useDataStore(state => state.userInfo);
export const useTokens = () => useDataStore(state => state.tokens);
export const useTokensActions = () => useDataStore(state => state.tokenActions);
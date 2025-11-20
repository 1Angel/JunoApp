import { IUser } from "@/types";
import { create } from "zustand";

interface IAuthStore {
    user: IUser | null;
    isAuthenticated: boolean;
    LogIn: (userinfo: IUser)=> void;
    LogOutUser: ()=> void;
};

const useAuthStore = create<IAuthStore>((set, get)=>({
    isAuthenticated: false,
    user: null,
    LogIn(userinfo) {
        set({isAuthenticated: true, user: userinfo});
    },
    LogOutUser() {
        set({isAuthenticated: false, user: null});   
    }
}))

export default useAuthStore;
"use client"

import useAuthStore, { IAuthStore } from "@/store/AuthStore";
import { IUser } from "@/types";
import React, { createContext, useEffect } from "react"

const authContext = createContext<IAuthStore>({
    isAuthenticated: false,
    LogIn: (user: IUser) => { },
    LogOutUser: () => { },
    user: null
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const authInfo = useAuthStore();

    useEffect(() => {
        getCurrentUser();
    }, [])

    async function getCurrentUser() {
        const res = await fetch(`/api/auth/profile`, {
            method: "GET",
            credentials: "include"
        });
        const result: IUser = await res.json();
        if (res.status == 401) {
            authInfo.LogOutUser();
        } else {
            authInfo.LogIn(result);
        }
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
}
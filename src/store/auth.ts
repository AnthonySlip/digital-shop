import {create, StoreApi, UseBoundStore} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import AuthService from "../service/auth.ts";
import {IUser} from "../types/IUser.ts";
import {AxiosResponse, name} from "axios";
import {AuthResponse} from "../types/Response/AuthResponse.ts";
import {IErrorResponse} from "../types/Response/ErrorResponse.ts";


export const useAuthStore:UseBoundStore<StoreApi<any>> = create(persist((set, get) => {
    return {
        isAuth: <boolean>false,
        User: <IUser>{},
        signIn: async (name: string, email: string, password: string): Promise<any> => {
            try {
                const result: AxiosResponse<AuthResponse> | undefined = await AuthService.signIn(name, email, password)
                if (result.data.accessToken && result.data.refreshToken && result.data.user) {
                    localStorage.setItem('accessToken', result.data.accessToken)
                    set(() => ({isAuth: true, User: {...result.data.user}}))
                }
                return result
            } catch (err: IErrorResponse | any) {
                throw err
            }
        },
        logIn: async (email: string, password: string): Promise<any> => {
            try {
                const result = await AuthService.logIn(email, password)
                if (result.data.accessToken && result.data.refreshToken && result.data.user) {
                    localStorage.setItem('accessToken', result.data.accessToken)
                    set(() => ({isAuth: true, User: {...result.data.user}}))
                }
                return result
            } catch (err: IErrorResponse | any) {
                throw err
            }
        },
        signOut: async (): Promise<any> => {
            try {
                const res: void = await AuthService.signOut()

                set({isAuth: false, User: <IUser>{}})
                localStorage.removeItem('accessToken')

                return res
            } catch (err: IErrorResponse | any) {
                set({isAuth: false, User: <IUser>{}})
                localStorage.removeItem('accessToken')
                throw err
            }
        },
        updateUser: async (newName: string | null, newEmail: string | null, oldPassword: string | null, newPassword: string | null):Promise<any> => {
            try {
                const user= <IUser>get().User
                const newUser = await AuthService.updateUser(user.id, newName, newEmail, oldPassword, newPassword)
                set(() => ({User: {...newUser.data[newUser.data.length - 1]}}))
                return newUser
            } catch (err: IErrorResponse | any) {
                throw err
            }
        }
    };
},{
    name: 'user-storage',
    storage: createJSONStorage(() => localStorage),
}))
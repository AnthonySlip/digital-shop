import {URL_AUTH} from "../utils/path.ts";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../types/Response/AuthResponse.ts";
import $api from "./axios.ts";
import {IUser} from "../types/IUser.ts";

export default class AuthService {
    static async signIn (name:string, email:string, password:string):Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(URL_AUTH.signIn, {name, email, password})
    }
    static async logIn (email:string, password:string):Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(URL_AUTH.logIn, {email, password})
    }
    static async signOut ():Promise<void> {
        return $api.post(URL_AUTH.signOut)
    }
    static async updateUser (id: string | null, newName: string | null, newEmail: string | null, oldPassword: string | null, newPassword: string | null):Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>(URL_AUTH.updateUser+`/${id}`, {newName, newEmail, oldPassword, newPassword})
    }
}
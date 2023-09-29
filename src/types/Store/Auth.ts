import {IUser} from "../IUser.ts";

export interface AuthState {
    isAuth: boolean;
    User: IUser,
    signIn: (name: string, email: string, password: string) => Promise<any>;
    logIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
    updateUser: (newName: string | null, newEmail: string | null, oldPassword: string | null, newPassword: string | null) => Promise<any>;
}
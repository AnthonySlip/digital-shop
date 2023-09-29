import {IUser} from "../IUser.ts";

export interface AuthResponse {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    user: IUser;
}
import {AxiosResponse} from "axios";


export interface CartState {
    basket: [],
    favorite: [],
    getBasket: (userId: string) => Promise<any>;
    getFavorite: (userId: string) => Promise<any>;
    pushBasket: (deviceId: string, userId: string) => Promise<any>;
    removeItemBasket: (deviceId: string, userId: string) => Promise<any>;
    deleteBasket: (userId: string)=>Promise<any>;
    pushFavorite: (deviceId: string, userId: string)=>Promise<any>;
    removeItemFavorite: (deviceId: string, userId: string)=>Promise<any>;
    deleteFavorite: (userId: string)=>Promise<any>;
}
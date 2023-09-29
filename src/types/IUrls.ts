import {API_HOST} from "../utils/path.ts";

export interface IUtil {
    location: string;
    data: string;
}
export interface IAuth {
    signIn: string;
    logIn: string;
    signOut: string;
    updateUser: string;
    getToken: string;
}
export interface ICatalog {
    getItem: string;
    getAll: string;
    getFromTo: string;
    getBrand: string;
    getType: string;
    getBrands: string;
    getTypes: string;
    getOptions: string;
    filter: string;
    post: string;
    search: string;
}

export interface ICart {
    getBasket: string;
    getFavorite: string;
    pushBasket: string;
    removeItemBasket: string;
    deleteBasket: string;
    pushFavorite: string;
    removeItemFavorite: string;
    deleteFavorite: string;
}


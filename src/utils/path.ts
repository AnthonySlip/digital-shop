import {IAuth, ICart, ICatalog, IUtil} from "../types/IUrls.ts";
interface IPublic {
    main: string;
    auth: string;
    catalog: string;
    item: string;
}
export const publicPath:IPublic = {
    main: '/digital-shop/',
    auth: 'auth',
    catalog: 'catalog',
    item: 'item/:id',
}

interface IPrivate {
    cart: string;
    account: string;
    favorite: string;
    post: string;
}
export const privatePath:IPrivate = {
    cart: 'cart',
    account: 'account',
    favorite: 'favorite',
    post: 'post'
}

export const API_HOST: string = import.meta.env.VITE_API_HOST + '/api'

export const URL_UTIL: IUtil = {
    location: API_HOST + '/util/city',
    data: API_HOST+'/util/main'
}

export const URL_AUTH:IAuth = {
    signIn: API_HOST+'/auth/sign-up',
    logIn: API_HOST+'/auth/log-in',
    signOut: API_HOST+'/auth/sign-out',
    updateUser: API_HOST+'/auth/update-data',
    getToken: API_HOST+'/auth/refresh',
}

export const URL_CATALOG: ICatalog = {
    getItem: API_HOST + '/catalog/item',
    getAll: API_HOST + '/catalog/all-list',
    getFromTo: API_HOST + '/catalog/from-to-list',
    getBrand: API_HOST + '/catalog/brands-list/',
    getType: API_HOST + '/catalog/types-list/',
    getBrands: API_HOST + '/catalog/brands',
    getTypes: API_HOST + '/catalog/types',
    getOptions: API_HOST + '/catalog/options',
    filter: API_HOST + '/catalog/filter',
    post: API_HOST+'/catalog/post',
    search: API_HOST+'/catalog/search',
}

export const URL_CART: ICart = {
    getBasket: API_HOST+'/cart/getBasket',
    getFavorite: API_HOST+'/cart/getFavorite',

    pushBasket: API_HOST+'/cart/pushBasket',
    removeItemBasket: API_HOST+'/cart/removeItemBasket',
    deleteBasket: API_HOST+'/cart/deleteBasket',

    pushFavorite: API_HOST+'/cart/pushFavorite',
    removeItemFavorite: API_HOST+'/cart/removeItemFavorite',
    deleteFavorite: API_HOST+'/cart/deleteFavorite',
}

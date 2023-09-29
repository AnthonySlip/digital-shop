import $api from "./axios.ts";
import {URL_CART} from "../utils/path.ts";
import {AxiosResponse} from "axios";
import {DeviceResponse} from "../types/Response/CatalogResponse.ts";


export default class CartService {
    static async getBasket (userId: string):Promise<AxiosResponse<DeviceResponse[]>> {
        return $api.get(URL_CART.getBasket+`/${userId}`)
    }
    static async getFavorite (userId: string):Promise<AxiosResponse<DeviceResponse[]>> {
        return $api.get(URL_CART.getFavorite+`/${userId}`)
    }
    static async pushBasket (deviceId: string, userId: string):Promise<AxiosResponse<DeviceResponse>> {
        return $api.post(URL_CART.pushBasket, {deviceId, userId})
    }
    static async removeItemBasket (deviceId: string, userId: string):Promise<AxiosResponse<any>> {
        return $api.post(URL_CART.removeItemBasket, {deviceId, userId})
    }
    static async deleteBasket (userId: string):Promise<AxiosResponse<any>> {
        return $api.post(URL_CART.deleteBasket, {userId})
    }
    static async pushFavorite (deviceId: string, userId: string):Promise<AxiosResponse<DeviceResponse>> {
        return $api.post(URL_CART.pushFavorite, {deviceId, userId})
    }
    static async removeItemFavorite (deviceId: string, userId: string):Promise<AxiosResponse<any>> {
        return $api.post(URL_CART.removeItemFavorite, {deviceId, userId})
    }
    static async deleteFavorite (userId: string):Promise<AxiosResponse<any>> {
        return $api.post(URL_CART.deleteFavorite, {userId})
    }
}
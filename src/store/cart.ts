import {create, StoreApi, UseBoundStore} from "zustand";
import CartService from "../service/cart.ts";
import {CartState} from "../types/Store/Cart.ts";
import {DeviceResponse} from "../types/Response/CatalogResponse.ts";


export const useCartStore:UseBoundStore<StoreApi<any>> = create((set) => ({
    basket: <DeviceResponse[]>[],
    favorite: <DeviceResponse[]>[],
    getBasket: async (userId: string) => {
        try {
            const response = await CartService.getBasket(userId)
            set(() => ({basket: [...response.data]}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    getFavorite: async (userId: string) => {
        try {
            const response = await CartService.getFavorite(userId)
            set(() => ({favorite: [...response.data]}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    pushBasket: async (deviceId: string, userId: string) => {
        try {
            const response = await CartService.pushBasket(deviceId, userId)
            set((state: CartState) => ({basket: [...state.basket, response.data]}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    removeItemBasket: async (deviceId: string, userId: string) => {
        try {
            const response = await CartService.removeItemBasket(deviceId, userId)
            set((state: CartState) => ({basket: [...state.basket.filter((item: DeviceResponse) => {
                if (item.id!==deviceId) return item
            })]}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    deleteBasket: async (userId: string)=> {
        try {
            const response = await CartService.deleteBasket(userId)
            set(() => ({basket: []}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    pushFavorite: async (deviceId: string, userId: string)=> {
        try {
            const response = await CartService.pushFavorite(deviceId, userId)
            set((state: CartState) => ({favorite: [...state.favorite, response.data]}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    removeItemFavorite: async (deviceId: string, userId: string)=> {
        try {
            const response = await CartService.removeItemFavorite(deviceId, userId)
            set((state: CartState) => ({favorite: [...state.favorite.filter((item: DeviceResponse) => {
                if (item.id !== deviceId) return item
            })]}))
            return response.data
        } catch (err) {
            throw err
        }
    },
    deleteFavorite: async (userId: string)=> {
        try {
            const response = await CartService.deleteFavorite(userId)
            set(() => ({favorite: []}))
            return response.data
        } catch (err) {
            throw err
        }
    },
}))
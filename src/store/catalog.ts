import {create, StoreApi, UseBoundStore} from "zustand";
import CatalogService from "../service/catalog.ts";
import {IDeviceAdmin, IOptionsAdmin} from "../types/Admin/Admin.ts";
import {CatalogResponse} from "../types/Response/CatalogResponse.ts";
import {CatalogState} from "../types/Store/Catalog.ts";


export const useCatalogStore:UseBoundStore<StoreApi<any>> = create((set) => ({
    catalog: [],
    post: async (device: IDeviceAdmin, options: IOptionsAdmin) => {
        try {
            const post = await CatalogService.post(device, options)
            set((state:any) => ({catalog: [...state.catalog, {...post}]}))
            return post.data
        } catch (err) {
            throw err
        }
    },
    getAll: async () => {
        try {
            const list = await CatalogService.getAll()
            set(() => ({catalog: [...list.data]}))
        } catch (err) {
            throw err
        }
    },
    getBrands: async () => {
        try {
            const list = await CatalogService.getBrands()
            return list.data
        } catch (err) {
          throw err
        }
    },
    getTypes: async () => {
        try {
            const list = await CatalogService.getTypes()
            return list.data
        } catch (err) {
            throw err
        }
    },
    getOptions: async () => {
        try {
            const list = await CatalogService.getOptions()
            return list.data
        } catch (err) {
            throw err
        }
    },
    filter: async (data: {}) => {
        try {
            const type:string[] = []
            const brand:string[] = []
            const option:string[] = []

            for (const item:string in data) {
                if(data[item]) {
                    if (item.includes('type')) type.push(item.replace('type ', ''))
                    if (item.includes('brand')) brand.push(item.replace('brand ', ''))
                    if (item.includes('option')) option.push(item.replace('option ', ''))
                }
            }

            const list = await CatalogService.filter(type, brand, option)
            set((state: CatalogState) => ({catalog: [...state.catalog.filter((item: CatalogResponse) => {
                if (list.data.includes(item.device.id)) return item
            })]}))
        } catch (err) {

        }
    },
    getItem: async (id: string) => {
        try {
            const response = await CatalogService.getItem(id)
            return response.data
        } catch (err) {
            throw err
        }
    },
    search: async (array: string[]) => {
        try {
            const response = await CatalogService.search(array)
            setTimeout(() => {
                if (response.data.length) {
                    set((state: CatalogState) => ({catalog: [...state.catalog.filter((item: CatalogResponse) => {
                        if (response?.data.includes(item.device.id)) return item
                    })]}))
                }
            }, 1200)
            return response.data
        } catch (err) {
            throw err
        }
    },
}))
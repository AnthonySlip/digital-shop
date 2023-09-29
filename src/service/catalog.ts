import {AxiosResponse} from "axios";
import $api from "./axios.ts";
import {URL_CATALOG} from "../utils/path.ts";
import {
    BrandsResponse,
    CatalogResponse,
    DeviceResponse,
    OptionsResponse,
    TypesResponse
} from "../types/Response/CatalogResponse.ts";

import { IDeviceAdmin, IOptionsAdmin} from "../types/Admin/Admin.ts";

export default class CatalogService {
    static async post(device: IDeviceAdmin, options: IOptionsAdmin):Promise<AxiosResponse<CatalogResponse>> {
        return $api.post(URL_CATALOG.post, {device, options})
    }
    static async getItem (id: string):Promise<AxiosResponse<CatalogResponse>> {
        return $api.get(URL_CATALOG.getItem+`/${id}`)
    }
    static async getAll ():Promise<AxiosResponse<CatalogResponse[]>> {
        return $api.get(URL_CATALOG.getAll)
    }
    static async getFromTo (from: number, to: number):Promise<AxiosResponse<CatalogResponse[]>> {
        return $api.get(URL_CATALOG.getFromTo+`/${from}/${to}`)
    }
    static async getBrand (brand: string):Promise<AxiosResponse<any>> {
        return $api.get(URL_CATALOG.getBrand+`/${brand}`)
    }
    static async getType (type: string):Promise<AxiosResponse<any>> {
        return $api.get(URL_CATALOG.getType+`${type}`)
    }
    static async getBrands (): Promise<AxiosResponse<BrandsResponse[]>> {
        return $api.get(URL_CATALOG.getBrands)
    }
    static async getTypes ():Promise<AxiosResponse<TypesResponse[]>> {
        return $api.get(URL_CATALOG.getTypes)
    }
    static async getOptions ():Promise<AxiosResponse<OptionsResponse>> {
        return $api.get(URL_CATALOG.getOptions)
    }
    static async filter (type: string[], brand: string[], option: string[]):Promise<AxiosResponse<DeviceResponse[]>> {
        return $api.post(URL_CATALOG.filter, {type, brand, option})
    }
    static async search (array: string[]): Promise<AxiosResponse<DeviceResponse[]>> {
        return $api.post(URL_CATALOG.search, {array})
    }
}
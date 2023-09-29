import {IDeviceAdmin, IOptionsAdmin} from "../Admin/Admin.ts";
import {
    BrandsResponse,
    CatalogResponse,
    DeviceResponse,
    OptionsResponse,
    TypesResponse
} from "../Response/CatalogResponse.ts";

export interface CatalogState {
    catalog: CatalogResponse[];
    post: (Device: IDeviceAdmin, Options: IOptionsAdmin) => Promise<CatalogResponse>;
    getItem: (id: string) => Promise<CatalogResponse>;
    getAll: () => Promise<CatalogResponse[]>;
    getBrands: () => Promise<BrandsResponse[]>;
    getTypes: () => Promise<TypesResponse[]>;
    getOptions: () => Promise<OptionsResponse[]>;
    filter: () => Promise<any>;
    search: (data: string[]) => Promise<DeviceResponse[]>
}
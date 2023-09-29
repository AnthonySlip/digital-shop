
export interface CatalogResponse {
    device: DeviceResponse,
    options: OptionResponse[],
}
export interface DeviceResponse {
    id: string;
    price: number;
    name: string;
    img: string;
    TypeId: string;
    BrandId: string;
    type: string | null;
    brand: string | null;
    BasketId: string | null;
    SavedId: string | null;
}
export interface OptionResponse {
    id: string,
    title: string;
    description: string | number;
}
export interface TypesResponse {
    id: string;
    name: string;
}
export interface BrandsResponse {
    id: string;
    name: string;
}
export interface OptionsResponse {
    option: string[]
}
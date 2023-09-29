
export interface IFormAdmin extends IDeviceAdmin, IOptionsAdmin {
}
export interface IDeviceAdmin {
    name: string;
    price: number;
    img: string;
    type: string;
    brand: string;
}
export interface IOptionsAdmin {
    ROM: number | null;
    ROMType: string | null;
    RAM: number | null;
    display: number | null;
    color: string | null;
}

export type DeviceAdmin = {
    name: object;
    price: object;
    img: object;
    type: object;
    brand: object;
}
export type OptionsAdmin = {
    ROM: object;
    ROMType: object;
    RAM: object;
    display: object;
    color: object;
}


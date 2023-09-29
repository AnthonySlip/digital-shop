import {create, StoreApi, UseBoundStore} from "zustand";
import {ErrorState} from "../types/Store/Global.ts";

export const useErrorStore:UseBoundStore<StoreApi<any>> = create((set) => ({
    errors: [],
    newError: (code: string | number, message: string) => set((state: ErrorState) => ({errors: [{code: code, message: message}, ...state.errors]})),
    removeError: () => set((state: ErrorState) => ({errors: [...state.errors.filter((el, index) => {
        if (index!==state.errors.length-1) return el
        })]})),
}))

export const usePopupStore:UseBoundStore<StoreApi<any>> = create((set) => ({
    isPopup: false,
    setPopup: (current: boolean) => set(() => ({isPopup: current})),
}))
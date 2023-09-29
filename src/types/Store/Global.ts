
export interface ErrorState {
    errors: [];
    newError: (code: string | number, message: string) => any;
    removeError: () => any;
}

export interface PopupState {
    isPopup: boolean;
    setPopup: () => any;
}
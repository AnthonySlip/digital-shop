interface IData {
    message: string;
}
interface IError {
    status: number;
    data: IData;
}
export interface IErrorResponse {
    response: IError
}

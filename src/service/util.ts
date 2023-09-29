import axios, {AxiosResponse} from "axios";
import {URL_UTIL} from "../utils/path.ts";
import {MainDataResponse} from "../types/Response/UtilResponse.ts";

export default class UtilService {
    static async getCity (): Promise<any> {
        try {
            if (!sessionStorage.getItem("currentCity")) {
                const location = await new Promise<any>((res, err) => navigator.geolocation.getCurrentPosition(res, err))
                const {latitude, longitude} = location.coords
                const url:string = URL_UTIL.location + `/${latitude}/${longitude}`
                const cityData = await axios.get(url)
                sessionStorage.setItem("currentCity", cityData.data)
                console.log(cityData)
                return cityData.data
            }
            return sessionStorage.getItem("currentCity")
        } catch (err) {
            throw err
        }
    }
    static async getData (): Promise<MainDataResponse> {
        try {
            const response = await axios.get(URL_UTIL.data)
            return response.data
        } catch (err) {
            throw err
        }
    }
}
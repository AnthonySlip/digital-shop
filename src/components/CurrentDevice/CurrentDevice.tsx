import React, {useEffect, useState} from 'react';
import {Location, useLocation} from "react-router-dom";
import {CatalogResponse} from "../../types/Response/CatalogResponse.ts";
import {useCatalogStore} from "../../store/catalog.ts";
import {CatalogState} from "../../types/Store/Catalog.ts";
import style from "./currentdevice.module.scss";
import {IErrorResponse} from "../../types/Response/ErrorResponse.ts";
import {useErrorStore, usePopupStore} from "../../store/global.ts";
import Loading from "../../UI/Loading/Loading.tsx";
import ToCart from "../Popup/ToCart.tsx";
import {ErrorState, PopupState} from "../../types/Store/Global.ts";

const CurrentDevice: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    const newErr = useErrorStore((state: ErrorState) => state.newError)
    const rmErr = useErrorStore((state: ErrorState) => state.removeError)
    const isPopup = usePopupStore((state: PopupState) => state.isPopup)
    const setPopup = usePopupStore((state: PopupState) => state.setPopup)

    const location: Location = useLocation()
    const deviceId: string = location.pathname.split('/')[location.pathname.split('/').length-1]

    const getItem = useCatalogStore((state: CatalogState) => state.getItem)
    const [name, setName] = useState<string>()
    const [img, setImg] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [storage, setStorage] = useState<number>()
    const [storageType, setStorageType] = useState<string>()
    const [color, setColor] = useState<string>()
    const [ram, setRam] = useState<number>()

    const toCart = () => {
        setPopup(true)
    }

    useEffect(() => {
        getItem(deviceId)
            .then((data: CatalogResponse) => {
                setIsLoading(false)
                setName(data.device.type+' '+data.device.brand+' '+data.device.name)
                setImg(data.device.img)
                setPrice(data.device.price)

                for (const item of data.options) {
                    if (item.title === 'ROM') setStorage(item.description)
                    if (item.title === 'ROMType') setStorageType(item.description)
                    if (item.title === 'color') setColor(item.description)
                    if (item.title === 'RAM') setRam(item.description)
                }
            })
            .catch((err: IErrorResponse | any) => {
                setIsError(true)
                if (err.response) newErr(err.response.status, err.response.data.message)
                if (!err.response) newErr(err.code, err.message)
                setTimeout(() => rmErr(), 3000)
            })
    },[])

    return isError? <div className={style.error}>
        <div className={style.error__body}>
            <p className={style.error__title}>It is an error :(</p>
            <span className={style.error__span}>I can't find this device</span>
            <ul className={style.error__list}>
                <li className={style.error__step}>1. Check your interment connection</li>
                <li className={style.error__step}>2. Mail <a href="mailto:anthonywebdevoloper@gmail.com">anthonywebdevoloper@gmail.com</a></li>
            </ul>
        </div>
    </div>
        :
        (
            isLoading?
                <Loading/>
                :(
                    <div className={style.device}>
                        <div className={style.body}>
                            <p className={style.name}>{name}</p>
                            <img src={img} alt={img} className={style.img}/>
                            <p className={style.price} onClick={() => toCart()}>{price}$</p>
                            <ul className={style.options}>
                                <span className={style.options__title}>Options</span>
                                <li className={style.options__item}>Color: <span>{color}</span></li>
                                <li className={style.options__item}>Storage: <span>{storage} {storageType}</span></li>
                                <li className={style.options__item}>RAM Memory: <span>{ram} gb</span></li>
                            </ul>
                        </div>
                        {isPopup && <ToCart Name={name}/>}
                    </div>
                )
        )
}

export default CurrentDevice;
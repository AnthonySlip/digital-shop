import React from 'react';
import style from './catalog.module.scss';
import {DeviceResponse} from "../../types/Response/CatalogResponse.ts";


const Item: React.FC<{device: DeviceResponse}> = ({device}) => {

    const id:string = device.id
    const img:string = device.img
    const name:string = device.name
    const price:number = device.price

    return (
        <div className={style.main}>
            <div className={style.body}>
                <img src={img} alt={'img-'+id} className={style.img}/>
                <p className={style.name}>{name}</p>
                <p className={style.price}>{price}$</p>
            </div>
        </div>
    )
}

export default Item;
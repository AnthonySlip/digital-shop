import React from 'react';
import style from './city.module.scss';
import {ReactComponent as LocationSVG} from '../../assets/icons/location.svg';
const City:FC = (props:object) => {

    const city:string = props.city || 'Moscow'

    return (
        <main className={style.main}>
            <LocationSVG className={style.logo}/>
            <p className={style.text}>
                {city}
            </p>
        </main>
    )
}

export default City;
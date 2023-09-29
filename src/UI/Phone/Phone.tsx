import React from 'react';
import style from './phone.module.scss';
import {ReactComponent as PhoneSVG} from "../../assets/icons/phone.svg";


const Phone:FC = () => {
    return (
        <a href="tel:+79999999999" className={style.phone}>
            <PhoneSVG className={style.logo}/>
            <p className={style.text}>+7 (999) 999 99 99</p>
        </a>
    )
}

export default React.memo(Phone);
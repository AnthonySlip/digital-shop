import React from 'react';
import style from './logo.module.scss';
import {Link} from "react-router-dom";
const Logo:React.FC = () => {
    return (
        <Link to={'/'}>
        <main className={style.logo}>
            <div className={style.body}>
                <span>Digital</span>
                <span>Shop</span>
            </div>
        </main>
        </Link>
    )
}

export default Logo;
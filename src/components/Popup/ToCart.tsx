import React from 'react';
import style from './tocart.module.scss';
import {Link, useLocation} from "react-router-dom";
import {ReactComponent as CartSVG} from "../../assets/icons/cart.svg";
import {ReactComponent as CatalogSVG} from "../../assets/icons/list.svg";
import Burger from "../../UI/Close/Burger.tsx";
import {useErrorStore, usePopupStore} from "../../store/global.ts";
import {ErrorState, PopupState} from "../../types/Store/Global.ts";
import {useAuthStore} from "../../store/auth.ts";
import {AuthState} from "../../types/Store/Auth.ts";
import {useCartStore} from "../../store/cart.ts";
import {CartState} from "../../types/Store/Cart.ts";
import {privatePath} from "../../utils/path.ts";

const ToCart:React.FC<{Name: string}> = ({Name}) => {

    const newErr = useErrorStore((state: ErrorState) => state.newError)
    const rmErr = useErrorStore((state: ErrorState) => state.removeError)

    const setPopup: (state: boolean) => any = usePopupStore((state: PopupState) => state.setPopup)

    const pushBasket = useCartStore((state: CartState) => state.pushBasket)
    const userId = useAuthStore((state: AuthState) => state.User).id
    const name: string = Name || 'Device'
    const location = useLocation()
    const deviceId: string = location.pathname.split('/')[location.pathname.split('/').length-1]

    const action = async () => {
        try {
            const data = await pushBasket(deviceId, userId)
        } catch (err: any) {
            if(err.response) newErr(err.response.status, err.response.data.message)
            else newErr(err.code, err.message)
            setTimeout(() => rmErr(), 6000)
        }
    }

    return (
        <div className={style.popup}>
            <div className={style.body}>
                <span className={style.burger} onClick={() => setPopup(false)}><Burger state={true}/></span>
                <p className={style.title}>Do you want to buy the {name}?</p>
                <div className={style.actions}>
                    <Link to={'../'+privatePath.cart} className={style.action} onClick={() => action()}>
                        <CartSVG className={style.svg}/>
                        <p className={style.act}>To Cart</p>
                    </Link>
                    <div className={style.action} onClick={() => {
                        setPopup(false),
                        action()
                    }}>
                        <CatalogSVG className={style.svg}/>
                        <p className={style.act}>Continue shopping</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToCart;
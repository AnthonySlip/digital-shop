import React from 'react';

import {useCartStore} from "../../store/cart.ts";
import {CartState} from "../../types/Store/Cart.ts";
import {DeviceResponse} from "../../types/Response/CatalogResponse.ts";
import {useAuthStore} from "../../store/auth.ts";
import {AuthState} from "../../types/Store/Auth.ts";
import Item from "../../components/Catalog/Item.tsx";
import Remove from "../../UI/Remove/Remove.tsx";
import {useErrorStore} from "../../store/global.ts";
import {ErrorState} from "../../types/Store/Global.ts";

const Favorite:React.FC<null> = () => {

    const user = useAuthStore((state: AuthState) => state.User)

    const saves: DeviceResponse[] = useCartStore((state: CartState) => state.favorite)

    const rmItem: (deviceId: string, userId: string) => Promise<any> = useCartStore((state: CartState) => state.removeItemFavorite)
    const rmAll: (userId: string) => Promise<any> = useCartStore((state: CartState) => state.deleteFavorite)

    const newError = useErrorStore((state: ErrorState) => state.newError)
    const rmError = useErrorStore((state: ErrorState) => state.removeError)
    const removeItem = async (deviceId: string): Promise<any> => {
        try {
            const data = await rmItem(deviceId, user.id)
        } catch (err: any) {
            if (err.response) newError(err.response.status, err.response.data.message)
            else newError(err.code, err.message)
            setTimeout(() => rmError(), 6000)
        }
    }
    const removeAll = async (): Promise<any> => {
        try {
            const data = await rmAll(user.id)
        } catch (err: any) {
            if (err.response) newError(err.response.status, err.response.data.message)
            else newError(err.code, err.message)
            setTimeout(() => rmError(), 6000)
        }
    }

    return <div className="cart">
            <div className="cart__body">
                <p className="cart__title">{user.name}'s favorite devices</p>
                <p className="cart__count">You have {saves.length} devices in your saves list</p>
                <ul className="cart__list">
                    {saves.map((item: DeviceResponse, index: number) => (
                        <li key={index} className="cart__item">
                            <Item device={item}/>
                            <span style={{width: '100%'}} onClick={() => removeItem(item.id)}><Remove text={'Delete'}/></span>
                        </li>
                    ))}
                </ul>
                <span style={{width: 'fit-content'}} onClick={() => removeAll()}><Remove text={'Delete All'}/></span>
            </div>
        </div>
}

export default Favorite;
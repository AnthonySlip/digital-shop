import React from 'react';
import {Link} from "react-router-dom";
import './nav.scss';
import {privatePath, publicPath} from "../../utils/path.ts";
import {useAuthStore} from "../../store/auth.ts";
import {IUser} from "../../types/IUser.ts";
import {useCartStore} from "../../store/cart.ts";
import {CartState} from "../../types/Store/Cart.ts";
import {DeviceResponse} from "../../types/Response/CatalogResponse.ts";

interface INav {
    logo: string;
    title: string;
    link: string;
}
const Nav:React.FC = () => {

    const user:IUser = useAuthStore(state => state.User)
    const isAdmin:boolean = user.role === 'Admin'
    const basket: DeviceResponse[] = useCartStore((state: CartState) => state.basket)
    const cart: number = basket.length

    const nav: INav[] = [
        {logo: '../../src/assets/icons/account.svg', title: 'Account', link: privatePath.account},
        {logo: '../../src/assets/icons/favorite.svg', title: 'Favorite', link:  privatePath.favorite},
        {logo: '../../src/assets/icons/cart.svg', title: 'Cart', link:  privatePath.cart},
        {logo: '../../src/assets/icons/list.svg', title: 'Catalog', link:  publicPath.catalog},
    ]


    return (
        <nav className="nav">
            {nav.map((item:INav, index:number) => <Link to={item.link} key={index} className="nav__link">
                <img src={item.logo} alt={item.title} className="nav__logo"/>
                <p className="nav__title">{item.title}</p>
                {item.title==='Cart' && <span className='nav__cart-counter'><p>{cart}</p></span>}
            </Link>)}
            {isAdmin && <Link to={privatePath.post} className="nav__link">
                <img src='../../src/assets/icons/admin.svg' alt='admin-svg' className="nav__logo"/>
                <p className="nav__title">New Item</p>
            </Link>}
        </nav>
    )
}

export default Nav;
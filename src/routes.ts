import {privatePath, publicPath} from "./utils/path.ts";
import Auth from "./modules/Auth/Auth.tsx";
import Cart from "./modules/Cart/Cart.tsx";
import Account from "./modules/Account/Account.tsx";
import Catalog from "./modules/Catalog/Catalog.tsx";
import Favorite from "./modules/Favorite/Favorite.tsx";
import Admin from "./modules/Admin/Admin.tsx";
import {IRoutes} from "./types/IRoutes.ts";
import CurrentDevice from "./components/CurrentDevice/CurrentDevice.tsx";

export const publicRoutes:IRoutes[] = [
    {
        path: publicPath.auth,
        element: Auth
    },
    {
        path: publicPath.catalog,
        element: Catalog
    },
    {
        path: publicPath.item,
        element: CurrentDevice
    }
]
export const privateRoutes:IRoutes[] = [
    {
        path: privatePath.cart,
        element: Cart
    },
    {
        path: privatePath.account,
        element: Account
    },
    {
        path: privatePath.favorite,
        element: Favorite
    }
]

export const adminRoutes:IRoutes[] = [
    {
        path: privatePath.post,
        element: Admin
    }
]
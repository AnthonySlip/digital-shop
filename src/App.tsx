import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {adminRoutes, privateRoutes, publicRoutes} from "./routes.ts";
import {publicPath} from "./utils/path.ts";
import Layout from "./modules/Layout/Layout.tsx";
import {useAuthStore} from "./store/auth.ts";
import {IRoutes} from "./types/IRoutes.ts";
import {useCartStore} from "./store/cart.ts";
import {CartState} from "./types/Store/Cart.ts";
import {useErrorStore} from "./store/global.ts";
import {ErrorState} from "./types/Store/Global.ts";
import {AuthState} from "./types/Store/Auth.ts";
import Main from "./modules/Main/Main.tsx";


const App: React.FC = () => {

    const isLoading:boolean = false
    const isAuth:boolean = useAuthStore((state: AuthState) => state.isAuth)

    const user = useAuthStore((state: AuthState) => state.User)
    const isAdmin: boolean = user.role === 'Admin'

    const newError = useErrorStore((state: ErrorState) => state.newError)
    const rmError = useErrorStore((state: ErrorState) => state.removeError)

    const getBasket: (userId: string) => Promise<any> = useCartStore((state: CartState) => state.getBasket)
    const getSaves: (userId: string) => Promise<any> = useCartStore((state: CartState) => state.getFavorite)
    useEffect(() => {
        const start = async () => {
            getBasket(user.id)
                .then((data: any) => data)
                .catch((err: any) => {
                    if (err.response) newError(err.response.status, err.response.data.message)
                    else newError(err.code, err.message)
                    setTimeout(() => rmError(), 6000)
                })
            getSaves(user.id)
                .then((data: any) => data)
                .catch((err: any) => {
                    if (err.response) newError(err.response.status, err.response.data.message)
                    else newError(err.code, err.message)
                    setTimeout(() => rmError(), 6000)
                })
        }
        start()
    },[])



    return isLoading? (
        <h2>Loading</h2>
        ):(
        <Routes>
            <Route path={publicPath.main} element={<Layout/>}>
                <Route index element={<Main/>}/>
                {publicRoutes.map((item: IRoutes, index: number) => <Route key={index} path={item.path} element={<item.element />}/>)}
                {isAuth && privateRoutes.map((item:IRoutes , index:number) => <Route key={index} path={item.path} element={<item.element />}/>)}
                {isAdmin && adminRoutes.map((item:IRoutes , index:number) => <Route key={index} path={item.path} element={<item.element />}/>)}
                <Route path={'*'} element={<Navigate to={publicPath.auth} replace/>}/>
            </Route>
            <Route path={'*'} element={<Navigate to={publicPath.main} replace/>}/>
        </Routes>
    )
}

export default App;

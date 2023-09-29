import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import './layout.scss';
import {useErrorStore} from "../../store/global.ts";
import Error from "../../components/Error/Error.tsx";

interface IErrorComponent {
    code: string | number;
    message: string;
}
const Layout:FC = () => {


    const errors = useErrorStore(state => state.errors)
    const removeError = useErrorStore(state => state.removeError)

    useEffect(() => {

    },[errors])

    return (
        <div className="wrapper">
            <Header/>
            <main className="main">
                <div className="_container">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
            <aside className="errors" onClick={() => removeError()}>
                <ul className="errors__list">
                    <li className="errors__error">
                        {errors.map((item:IErrorComponent, index:number) => <Error key={index} code={item.code} message={item.message}/>)}
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Layout;
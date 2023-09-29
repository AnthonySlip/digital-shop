import React, {useEffect, useState} from 'react';
import './header.scss';
import City from "../../UI/City/City.tsx";
import UtilService from "../../service/util.ts";
import {useErrorStore} from "../../store/global.ts";
import Phone from "../../UI/Phone/Phone.tsx";
import Logo from "../../UI/Logo/Logo.tsx";
import Search from "../Search/Search.tsx";
import Nav from "../Nav/Nav.tsx";

const Header:React.FC = () => {

    const width:number = window.innerWidth

    const [city, setCity] = useState<string>('Moscow')

    const newError = useErrorStore(state => state.newError)
    const rmError = useErrorStore(state => state.removeError)

    useEffect(() => {
        UtilService.getCity()
            .then(res => setCity(res))
            .catch(err => {
                newError(err.code, `can't get your location`)
                setTimeout(() => rmError(),3000)
            })
    },[])

    return (
        <header className="header">
            <div className="header__top">
                <div className="header-top__container _container">
                    <div className="header-top__body">
                        <City city={city}/>
                        {width<=725 && <Logo/>}
                        <Phone/>
                    </div>
                </div>
            </div>
            {width<=725 && <Nav/>}
            <div className="header__bottom">
                <div className="header-bottom__container _container">
                    <div className="header-bottom__body">
                        {width>725 && <Logo/>}
                        <Search/>
                        {width>725 && <Nav/>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default React.memo(Header);
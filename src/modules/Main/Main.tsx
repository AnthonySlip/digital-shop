import React, {useEffect, useState} from 'react';
import './main.scss';
import UtilService from "../../service/util.ts";
import {MainDataResponse} from "../../types/Response/UtilResponse.ts";
import Loading from "../../UI/Loading/Loading.tsx";
import {ReactComponent as MasterCardSVG} from "../../assets/icons/mastercard.svg";
import {ReactComponent as VisaSVG} from "../../assets/icons/visa.svg";

const Main:React.FC = (props) => {

    const width: number = window.innerWidth
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [content, setContent] = useState<MainDataResponse>()

    useEffect(() => {
        setContent({})
        setIsLoading(true)
        UtilService.getData()
            .then(data => {
                setContent(data)
                setIsLoading(false)
            })
            .catch(err => err)
    },[])

    return isLoading? <Loading/>
        :
        (
        <div className="home">
            <div className="home__body">
                <p className="home__title">{content?.article}</p>
                <ul className="home__advantages">
                    {content?.advantages.map((item: string, index: number) => (<li key={index} style={width>535 && index%2? {alignSelf: 'flex-end',flexDirection:'row-reverse'}:{alignSelf: 'flex-start'}} className="home__advantage">
                        {index%2? <MasterCardSVG className="home__advantage-svg"/>:<VisaSVG className="home__advantage-svg"/>}
                        <p className="home__advantage-text">{index+1}. {item}</p>
                    </li>))}
                </ul>
                <p className="home__article">{content?.article}</p>
            </div>
        </div>
    )
}

export default Main;
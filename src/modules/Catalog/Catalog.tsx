import React, {useEffect, useState} from 'react';
import './catalog.scss';
import {useCatalogStore} from "../../store/catalog.ts";
import {CatalogResponse} from "../../types/Response/CatalogResponse.ts";
import {Link} from "react-router-dom";
import Item from "../../components/Catalog/Item.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import {useErrorStore} from "../../store/global.ts";
import {IErrorResponse} from "../../types/Response/ErrorResponse.ts";
import {CatalogState} from "../../types/Store/Catalog.ts";
import Burger from "../../UI/Close/Burger.tsx";

const Catalog: React.FC = () => {

    const [isLoadError, setIsLoadError] = useState<boolean>(false)

    const [isActive, setIsActive] = useState<boolean>(false)

    const newErr = useErrorStore((state: any) => state.newError)
    const rmErr = useErrorStore((state: any) => state.removeError)
    const width = window.innerWidth

    const catalog = useCatalogStore((state: CatalogState) => state.catalog)
    const getAll = useCatalogStore((state: CatalogState) => state.getAll)

    useEffect(() => {
        setIsLoadError(false)
        const start = async () => {
            try {
                const res = await getAll()
            } catch (err: IErrorResponse | any) {
                setIsLoadError(true)
                if (err.response) newErr(err.response.status, err.response.data.message)
                else newErr(err.code, err.message)
                setTimeout(() => rmErr(), 3000)
            }
        }
        start()
    },[])

    return (
        <main className="catalog">
            <div className="catalog__body">
                <h3 className="catalog__title">Catalog</h3>
                <aside className={isActive? 'catalog__filter active':'catalog__filter'}><Filter/></aside>
                <div className="catalog__catalog">
                    <ul className="catalog__list">
                        {width<=725 && <span className='catalog__burger' onClick={() => setIsActive(!isActive)}><Burger /></span>}
                        {isLoadError && <h2 style={{color: '#e51376'}}>Server is down :(</h2>}
                        {catalog.map((item: CatalogResponse, index: number):any => {
                            return <Link key={index} to={'../item/'+item.device.id} style={index%2===0?{gridColumn: 1}:{gridColumn: 2}} className="catalog__item">
                                <Item device={item.device} />
                            </Link>
                        })}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Catalog;
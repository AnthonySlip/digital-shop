import React, {useEffect, useState} from 'react';
import style from './filter.module.scss';
import {useForm} from "react-hook-form";
import {useCatalogStore} from "../../store/catalog.ts";
import {BrandsResponse, OptionsResponse, TypesResponse} from "../../types/Response/CatalogResponse.ts";
import Submit from "../../UI/Submit/Submit.tsx";
import {CatalogState} from "../../types/Store/Catalog.ts";
import {useErrorStore} from "../../store/global.ts";
import {ErrorState} from "../../types/Store/Global.ts";
import Burger from "../../UI/Close/Burger.tsx";

const Filter:React.FC = () => {

    const width: number = window.innerWidth

    const [isLoadError, setIsLoadError] = useState<boolean>(false)

    const newError = useErrorStore((state: ErrorState) => state.newError)
    const rmError = useErrorStore((state: ErrorState) => state.removeError)

    const getAll = useCatalogStore((state: CatalogState) => state.getAll)
    const filter = useCatalogStore((state: CatalogState) => state.filter)
    const getBrands = useCatalogStore((state: CatalogState) => state.getBrands)
    const getTypes = useCatalogStore((state: CatalogState) => state.getTypes)
    const getOptions = useCatalogStore((state: CatalogState) => state.getOptions)

    const [brands, setBrands] = useState<BrandsResponse[]>([])
    const [types, setTypes] = useState<TypesResponse[]>([])
    const [options, setOptions] = useState<OptionsResponse[]>([])

    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const sendData = async (data: {}) => {
        try {
            const res = await getAll()
            const filtered = await filter(data)
            reset()
        } catch (err: any) {
            if (err.response) newError(err.response.status, err.response.data.message)
            else newError(err.code, err.message)
            setTimeout(() => rmError(), 6000)
        }
    }


    useEffect(() => {
        setBrands([])
        setTypes([])
        const start = async () => {
            try {
                const Brands = await getBrands()
                const Types = await getTypes()
                const Options = await getOptions()
                setBrands([...Brands])
                setTypes([...Types])
                setOptions([...Options])

            } catch (err) {
                setIsLoadError(true)
            }
        }
        start()
    },[])



    return isLoadError? (
            <h2 style={{color: '#01c8ef'}}>Nothing to filter : (</h2>
        )
        :(
        <div className={style.filter}>
            <form onSubmit={handleSubmit(sendData)} className={style.form}>
                <span className={style.category}>Types</span>
                {types.map((item:TypesResponse) => <div key={item.id} className={style.block}>
                    <input {...register('type '+item.name)} type="checkbox" value={item.name} className={style.input}/>
                    <label htmlFor={item.name} className={style.label}>{item.name}</label>
                </div>)}
                <span className={style.category}>Brands</span>
                {brands.map((item: BrandsResponse) => <div key={item.id} className={style.block}>
                    <input {...register('brand '+item.name)} type="checkbox" value={item.name} className={style.input}/>
                    <label htmlFor={item.name} className={style.label}>{item.name}</label>
                </div>)}
                <span className={style.category}>Options</span>
                {options.map((item: {}, index: number) => <div key={index} className={style.blocky}>
                    <span className={style.categoryy}>{Object.keys(item)[0]}</span>
                    {Object.values(item).map((el: any) => el.map((e: string, i: number) => <div key={index+i+1} className={style.block}>
                        <input {...register(`option ${Object.keys(item)[0]} ${e}`)} type="checkbox" value={e} className={style.input}/>
                        <label htmlFor={e} className={style.label}>{e}</label>
                    </div>))}
                </div>)}
                <Submit text={'Filter'}/>
            </form>
        </div>
    )
}

export default Filter;
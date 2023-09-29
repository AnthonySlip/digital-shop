import React from 'react';
import {useForm} from "react-hook-form";
import {ReactComponent as LoopSVG} from "../../assets/icons/loop.svg";
import './search.scss';
import {useCatalogStore} from "../../store/catalog.ts";
import {CatalogState} from "../../types/Store/Catalog.ts";
import {publicPath} from "../../utils/path.ts";
import {useNavigate} from "react-router-dom";
const Search:React.FC = () => {

    const searching = useCatalogStore((state: CatalogState) => state.search)
    const navigate = useNavigate()

    const {
        register,
        reset,
        formState: {errors},
        handleSubmit
    } = useForm()

    const search: (data: {input: string}) => Promise<any> = async (data): Promise<any> => {
        const array: string[] = data.input.split(' ').map((item: string) => {
            const first: string = item[0].toUpperCase()
            return first + item.slice(1)
        })

        searching(array)
            .then(list => {
                navigate(publicPath.catalog)
            })
            .catch(err => err)
        reset()
    }

    return (
        <form className="search" onSubmit={handleSubmit(search)}>
            <input type="text" {...register('input', {
                required: "It is empty"
            })} className="search__input" placeholder={errors?.input? errors.input?.message:"Search by Brand or Type"}/>
            <button type="submit" className="search__submit">
                <LoopSVG className="search__submit-logo"/>
            </button>
        </form>
    )
}

export default Search;
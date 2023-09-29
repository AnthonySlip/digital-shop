import React, {useEffect} from 'react';
import './admin.scss';
import {useForm} from "react-hook-form";
import Submit from "../../UI/Submit/Submit.tsx";
import CatalogService from "../../service/catalog.ts";
import {DeviceAdmin, IDeviceAdmin, IFormAdmin, IOptionsAdmin, OptionsAdmin} from "../../types/Admin/Admin.ts";
import {useCatalogStore} from "../../store/catalog.ts";



const Admin: React.FC = () => {

    const post = useCatalogStore(state => state.post)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<IFormAdmin>()

    const device: DeviceAdmin = {
        name: {
            ...register('name', {
                required: 'Name is required'
            })
        },
        price: {
            ...register('price', {
                required: 'Price is required'
            })
        },
        img: {
            ...register('img', {
                required: 'Image url is required'
            })
        },
        type: {
            ...register('type', {
                required: 'Type is required'
            })
        },
        brand: {
            ...register('brand', {
                required: 'Brand is required'
            })
        }
    }
    const options: OptionsAdmin = {
        ROM: {
            ...register('ROM')
        },
        ROMType: {
            ...register('ROMType')
        },
        RAM: {
            ...register('RAM')
        },
        display: {
            ...register('display')
        },
        color: {
            ...register('color')
        },
    }

    const sendData = async (data: IFormAdmin) => {
        const {name, price, brand, type, img, ROM, ROMType, RAM, color} = data
        const device: IDeviceAdmin = {name: name, price: price, brand: brand, type: type, img: img}
        const options: { ROM: number | null; color: string | null; ROMType: string | null; RAM: number | null } = {ROM: ROM, ROMType: ROMType, RAM: RAM, color: color}

        try {
            const res = await post(device, options)
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <main className="admin">
            <div className="admin__body">
                <h2>Post New Item</h2>
                <form className="admin__form" onSubmit={handleSubmit(sendData)}>
                    <input type="text" {...device.name} className="admin_input" placeholder='Name'/>
                    {errors?.name && <p>{errors.name?.message}</p>}
                    <input type="text" {...device.price} className="admin_input" placeholder='Price ($)'/>
                    {errors?.price && <p>{errors.price?.message}</p>}
                    <input type="text" {...device.type} className="admin_input" placeholder='Type'/>
                    {errors?.type && <p>{errors.type?.message}</p>}
                    <input type="text" {...device.brand} className="admin_input" placeholder='Brand'/>
                    {errors?.brand && <p>{errors.brand?.message}</p>}
                    <input type="text" {...device.img} className="admin_input" placeholder='Img'/>
                    <span>Options</span>
                    <input type="text" {...options.ROM} className="admin_input" placeholder='Stoarge'/>
                    <select defaultValue='gb' {...options.ROMType} className="admin_input">
                        <option value="gb">GB</option>
                        <option value="tb">TB</option>
                    </select>
                    <input type="text" {...options.display} className="admin_input" placeholder='Dispaly'/>
                    <input type="text" {...options.RAM} className="admin_input" placeholder='RAM'/>
                    <input type="text" {...options.color} className="admin_input" placeholder='Color'/>
                    <Submit/>
                </form>
            </div>
        </main>
    )
}

export default Admin;
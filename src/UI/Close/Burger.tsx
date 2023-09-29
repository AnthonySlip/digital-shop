import React, {useState} from 'react';
import style from './burger.module.scss';
const Burger:React.FC<{state: boolean} | null> = ({state}) => {

    const [isActive, setIsActive] = useState<boolean>(state)

    return (
        <div className={style.close} onClick={() => setIsActive(!isActive)}>
            <span className={`${style.item}${isActive? ' '+style.active:''}`}></span>
            <span className={`${style.item}${isActive? ' '+style.active:''}`}></span>
            <span className={`${style.item}${isActive? ' '+style.active:''}`}></span>
            <span className={`${style.item}${isActive? ' '+style.active:''}`}></span>
        </div>
    );
}

export default Burger;
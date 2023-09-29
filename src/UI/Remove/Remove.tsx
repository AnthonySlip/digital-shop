import React from 'react';
import {ReactComponent as TrashSVG} from "../../assets/icons/trash.svg";
import style from './remove.module.scss';

const Remove: React.FC<{text: string} | null> = (props) => {

    const content: string = props.text || 'Remove'


    return (
        <div className={style.trash}>
            <TrashSVG className={style.svg}/>
            <p className={style.text}>{content}</p>
        </div>
    )
}

export default Remove;
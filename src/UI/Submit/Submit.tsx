import React from 'react';
import style from './submit.module.scss';

const Submit:FC = ({text}:string) => {

    const btnText:string = text || 'Submit'

    return (
        <button type="submit" className={style.button}>
            {btnText}
        </button>
    )
}

export default Submit;
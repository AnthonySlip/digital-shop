import React from 'react';
import './errors.scss';
const Error:FC = (props:any) => {
    const code = props.code || 500
    const message = props.message || 'Expected error'
    return (
        <main className="error">
            <div className="error__body">
                <h3>{code}</h3>
                <p>{message}</p>
            </div>
        </main>
    )
}

export default Error;
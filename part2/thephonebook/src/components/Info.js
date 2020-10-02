import React from 'react';
import './Info.css';
export default function Info({ type, message }) {
    return (
        <div className={type}>
            {message}
        </div>
    )
};

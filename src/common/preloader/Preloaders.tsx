import React from 'react';
import s from './Preloader.module.scss'

export const Preloader = () => {
    return (
        <div className={s.containerPreloader}>
            <div className={s.loader}></div>
        </div>
    )
}
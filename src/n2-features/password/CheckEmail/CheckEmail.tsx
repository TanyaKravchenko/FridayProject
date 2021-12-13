import React from 'react';
import s from './CheckEmail.module.scss';


type PropsType = {}
export const CheckEmail: React.FC<PropsType> = () => {
const img = 'https://aravia-prof.ru/bitrix/templates/aravia_mobile/components/bitrix/news.detail/vacancies/img/email.svg'
    return (
        <div className={s.checkEmailBlock}>
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Check Email</h3>
            <img src= {img} alt=""/>
            <div className={s.redirectBlock}>
                <span className={s.redirectSpan}>
                    We’ve sent an Email with instructions
                </span>
                <span className={s.redirectSpan}>
                    to example@mail.com
                </span>
                <button className={s.signBtn}>Close</button>
            </div>
        </div>

    );
};


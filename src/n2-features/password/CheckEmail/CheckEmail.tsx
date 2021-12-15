import React from 'react';
import s from './CheckEmail.module.scss';


export type CheckEmailPropsType = {
    email: string
}


export const CheckEmail = (props: CheckEmailPropsType) => {
    const email = props.email

    const img = 'https://aravia-prof.ru/bitrix/templates/aravia_mobile/components/bitrix/news.detail/vacancies/img/email.svg'
    return (
        <div className={s.checkEmailBlock}>{email}
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Check Email</h3>
            <img src={img} alt=''/>
            <div className={s.redirectBlock}>
                <span className={s.redirectSpan}>
                    We’ve sent an Email with instructions
                </span>
                <span className={s.redirectSpan}>
                    to email: {email}
                </span>
                <span className={s.redirectSpan}>
                   <h4>Close this tab</h4>
                </span>

            </div>
        </div>

    );
};


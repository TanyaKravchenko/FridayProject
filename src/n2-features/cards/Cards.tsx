import React from "react";
import s from './Cards.module.scss';
import arrow from './../../assets/images/icons/arrow-icon.png'
import {useDispatch, useSelector} from "react-redux";
import {OneCardType} from "../../n1-main/m3-dal/cards-api";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {NavLink} from 'react-router-dom';
import {path} from "../../n1-main/m1-ui/routes/Routes";
import {AddCard} from "./addCard/AddCard";

export const Cards = () => {
    // HOOKS
    const cards = useSelector<RootStateType, OneCardType[]>(state => state.cards.cards)
    const dispatch = useDispatch()


    // HANDLERS
    const handleDeleteCard = () => {
    }
    return (

        <div className={s.cards}>
            <div className={s.wrap}>
                <div className={s.top}>
                    <NavLink className={s.backArrowLink} to={path.PACKS}>
                        <img className={s.arrowIcon} src={arrow} alt="arrow-icon"/>
                    </NavLink>
                    <h2 className={s.backBlock}>Pack Name</h2>
                </div>
                <div className={s.btnBox}>
                    <div className={s.inputWrap}>
                        <input className={s.cardsInput} placeholder={"Search..."}/>
                    </div>
                </div>

                <div className={s.table}>
                    <div className={s.tableHeader}>
                        <div className={s.tableItem}>Question</div>
                        <div className={s.tableItem}>Answer</div>
                        <div className={s.tableItem}>Last Updated</div>
                        <div className={s.tableItem}>Grade</div>
                        <div className={s.tableItem}>Actions</div>
                    </div>
                    {
                        cards.map((card) => {
                            return (
                                <div className={s.cardsRow}>
                                    <div className={s.cardsRowItem}>
                                        {card.question}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        {card.answer}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        {card.updated}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        {card.grade}
                                    </div>
                                    <div className={s.cardsRowItem}>
                                        <button className={s.deleteBtn} onClick={() => handleDeleteCard()}>delete
                                        </button>
                                        <button className={s.editBtn}>edit</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <AddCard id={'123'}/>

            </div>
        </div>
    );
}
import React, {ChangeEvent, useState} from "react";
import s from "../Cards.module.scss";
import {OneCardType} from "../../../n1-main/m3-dal/cards-api";

type CardPropsType = {
    card: OneCardType,
    userId: string,
    deleteCard:(packID: string, cardID: string)=>void,
    toSetQuestion:(packId: string, cardId: string, question: string)=>void

}

export const Card = (props: CardPropsType) => {
    //hooks
    const [question, setQuestion] = useState(props.card.question)
    const [editMode, setEditMode] = useState(false)
    //handlers
    const handleDeleteCard = (packId: string, cardId: string) => {
        props.deleteCard(packId, cardId)
    }
    const onClickOpenEditMode = () => {
        setEditMode(true)
        setQuestion(props.card.question)
    }
    const onClickUpdateQuestion = () => {
        setEditMode(false)
        props.toSetQuestion(props.card.cardsPack_id, props.card._id, question)

    }
    const onBlurCloseEditMode = () =>{
        setEditMode(false)
        props.toSetQuestion(props.card.cardsPack_id, props.card._id, question)
    }
    const onChangeSetQuestion = (e:ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    return (
            <div className={s.cardsRow}>
                {editMode
                    ? <input type="text" value={question} onChange={onChangeSetQuestion} autoFocus onBlur={onBlurCloseEditMode}/>
                    : <div className={s.cardsRowItem}>{question}</div>
                }
                <div className={s.cardsRowItem}>
                    {props.card.answer}
                </div>
                <div className={s.cardsRowItem}>
                    {props.card.updated}
                </div>
                <div className={s.cardsRowItem}>
                    {props.card.grade}
                </div>
                <div className={s.cardsRowItem}>
                    {props.userId === props.card.user_id &&
                        <>
                            <button className={s.deleteBtn}
                                    onClick={()=>handleDeleteCard(props.card.cardsPack_id, props.card._id)}>delete
                            </button>
                            {
                                editMode ? <button
                                        className={s.editBtn}
                                        onClick={onClickUpdateQuestion}
                                    >safe</button>
                                    : <button
                                        className={s.editBtn}
                                        onClick={onClickOpenEditMode}
                                    >edit</button>
                            }
                        </>
                    }
                </div>
            </div>
            )
}
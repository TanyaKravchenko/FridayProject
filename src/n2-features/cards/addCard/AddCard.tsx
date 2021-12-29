import React, {ChangeEvent, useState} from 'react';
import s from './AddCard.module.scss';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addCardTC} from "../../../n1-main/m2-bll/reducers/cards-reducer";

type AddCardType = {
    id:string
    closeEditModal: () => void
    updatePack?: (cardId: string, question: string, answer: string) => void
    answer?: string
    question?: string
}
export const AddCard = (props:AddCardType)=> {
    //hooks
    const dispatch= useDispatch();
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
        },
        onSubmit: values => {
            dispatch(addCardTC({
                question:values.question,
                answer:values.answer,
                // cardsPack_id:'61c38047bf41d303d448d008',
                cardsPack_id:props.id
            }))
            formik.resetForm()
        },
    })

    const question = props.question ? props.question : ""
    const answer = props.answer ? props.answer : ""

    const [newQuestion, setNewQuestion] = useState<string>(question)
    const [newAnswer, setNewAnswer] = useState<string>(answer)

    const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
    }

    const closeEditMode = () => {
        props.closeEditModal()
    }

    // const updateCard = () => {
    //     props.updatePack(props.id, newQuestion, newAnswer)
    //     props.closeEditModal()
    // }
    return(
        <form className={s.addCardForm}
              onSubmit={formik.handleSubmit}>
            <input
                className={s.cardsInput}
                type={"text"}
                placeholder={"your question"}
                {...formik.getFieldProps('question')}
            />
            <input
                className={s.cardsInput}
                type="text"
                placeholder={"your answer"}
                {...formik.getFieldProps('answer')}
            />
            {/*<button*/}
            {/*    type="submit"*/}
            {/*    className={s.addCardBtn}*/}
            {/*>Add new Card</button>*/}
            <div className={s.buttonsBlock}>
                <button className={s.cancelBtn} onClick={closeEditMode}>Cancel</button>
                <button className={s.saveBtn} >Save</button>
            </div>
        </form>
    )
}

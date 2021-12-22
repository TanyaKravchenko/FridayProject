import React from "react";
import s from './AddCard.module.scss';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addCardTC} from "../../../n1-main/m2-bll/reducers/cards-reducer";


type AddCardType = {
    id:string
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
                cardsPack_id:props.id,
                question:values.question,
                answer:values.answer
            }))
            formik.resetForm()
        },
    })
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
            <button
                type="submit"
                className={s.addCardBtn}
            >Add new Card</button>
        </form>
    )
}

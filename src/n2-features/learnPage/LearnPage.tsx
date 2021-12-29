import React, {useState} from 'react';
import styles from './LearnPage.module.scss';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';

type LearnPagePropsType = {
    cardsPack_id?: string
    onModalClose?: () => void
}

const grades = ['Didn\'t know', 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

const LearnPage: React.FC<LearnPagePropsType> = (props) => {
    const {cardsPack_id} = props
    const packName = useSelector<RootStateType, any | undefined>(state => state.packs.cardPacks && state.packs.cardPacks.find(pack => pack._id === cardsPack_id));
    const cards = useSelector<RootStateType, Array<any>>(state => state.cards.cards);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [grade, setGrade] = useState(grades.indexOf(grades[0]) + 1)
    const [card, setCard] = useState<any>({
        _id: 'fake',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        user_id: '',
        __v: 0,
        created: '',
        updated: '',
    });


    const checkAnswer = () => {
        setIsChecked(true)
    }

    return (
        <div className={styles.learnPageContainer}>
            <h3>Learn "{packName?.name}"</h3>
            {!isChecked &&
            <div className={styles.questionBlock}>
                <h4>Question: "{card.question}"</h4>
                <div className={styles.buttonsBlock}>
                    <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                    <button className={styles.saveBtn} onClick={checkAnswer}>show answer</button>
                </div>
            </div>
            }
            {isChecked && (
                <div className={styles.answerBlock}>
                    <h4>Question: "{card.question}"</h4>
                    <h4>Answer: "{card.answer}"</h4>
                    <div className={styles.answer}>
                        <h4>Rate yourself: </h4>

                        Radio

                    </div>
                    <div className={styles.buttonsBlock}>
                        <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                        <button
                            className={styles.saveBtn}
                            onClick={() => alert('next')}
                        >
                            next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearnPage;

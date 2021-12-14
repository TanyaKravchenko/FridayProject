import React, {useState} from 'react'
import s from './AllSuperComponent.module.css'
import Button from './Button/Button';
import Checkbox from './Checkbox/Checkbox';
import InputText from './InputText/InputText';
import Radio from './Radio/Radio';
import Select from './Select/Select';
import {useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {path} from "../../n1-main/m1-ui/routes/Routes";


const AllSuperComponents = () => {
    const arr = ['x', 'y', 'z'];
    const [text, setText] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const [value, onChangeOption] = useState(arr[1]);
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
        setText('')
    }
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)

    if(!isInitialized){
       return <Redirect to={path.LOGIN}/>
    }
    return (
        <div className={s.column}>
            <InputText
                value={text}
                onChangeText={setText}
                onEnter={showAlert}
                error={error}

            />

            <Button
                onClick={showAlert}
            >
                show text
            </Button>

            <Checkbox
                checked={checked}
                onChangeChecked={setChecked}
            >
                Hello!!!
            </Checkbox>

            <Radio
                name={'radio'}
                options={arr}
                value={value}
                onChangeOption={onChangeOption}
            />

            <Select
                options={arr}
                value={value}
                onChangeOption={onChangeOption}
            />

        </div>

    )
}

export default AllSuperComponents;
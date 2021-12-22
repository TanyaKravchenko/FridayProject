import React, {ChangeEvent, useState} from 'react';
import s from './Search.module.scss'
import {setValueSearchAC} from "../../n1-main/m2-bll/reducers/packs-reducer";
import {useDispatch} from "react-redux";

type SearchPropsType = {}
export const Search: React.FC<SearchPropsType> = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

//handlers
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const setValueSearchHandler = () => {
        dispatch(setValueSearchAC(searchValue))
        setSearchValue('')
    }
    return (
        <div className={s.searchContainer}>
            <div className={s.inputSearchWrap}>
                <input className={s.inputSearch}
                       placeholder={'Search...'}
                       onChange={searchHandler}
                       value={searchValue}
                       type={'text'}
                />
            </div>
            <button className={s.addBtn} onClick={setValueSearchHandler}>Search</button>
        </div>
    )
}

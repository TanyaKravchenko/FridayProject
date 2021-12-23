import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Packs.module.scss';
import {addPackTC, getPacksTC} from '../../n1-main/m2-bll/reducers/packs-reducer';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {Paginator} from '../paginator/Paginator';
import {PacksTable} from './table/PacksTable';
import {Search} from "../search/Search";

export const Packs = () => {

    //hooks
    const dispatch = useDispatch()
    const packName = useSelector<RootStateType, string | undefined>(state => state.packs.packName)
    let sortPacks = useSelector<RootStateType, any>(state => state.packs.sortPacks)

    useEffect(() => {
        dispatch(getPacksTC({packName, sortPacks}))
        //hardCode values
    }, [dispatch, packName, sortPacks])

    const addNewPackHandler = () => {
        dispatch(addPackTC({}))
    }

    return (
        <div className={s.packs}>
            <div className={s.wrap}>
                <div className={s.sidebar}>
                    <h3 className={s.btnTitle}>Show packs cards</h3>
                    <div className={s.btnBox}>
                        <button className={s.btn}>My</button>
                        <button className={s.btn}>All</button>
                    </div>
                    <h3 className={s.inputTitle}>Number of cards</h3>
                    <div>
                        Range slider
                    </div>
                </div>
                <div className={s.listBlock}>
                    <h2 className={s.listTitle}>Packs list</h2>
                    <div className={s.addPack}>
                        <Search/>
                        <button className={s.addBtn} onClick={addNewPackHandler}>Add new pack</button>
                    </div>
                    <PacksTable/>
                    <Paginator/>
                </div>
            </div>
        </div>
    )
}

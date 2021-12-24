import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Packs.module.scss';
import {addPackTC, getPacksTC, setMyPacksAC} from '../../n1-main/m2-bll/reducers/packs-reducer';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {Paginator} from '../paginator/Paginator';
import {PacksTable} from './table/PacksTable';
import {Search} from '../search/Search';
import {DoubleSliderContainer} from '../doubleSlider/DoubleSliderContainer';

export const Packs = () => {

    //hooks
    const dispatch = useDispatch()
    const packName = useSelector<RootStateType, string | undefined>(state => state.packs.packName)
    const sortPacks = useSelector<RootStateType, string | undefined>(state => state.packs.sortPacks)
    const myPacks = useSelector<RootStateType, boolean>(state => state.packs.myPacks)

    useEffect(() => {
        dispatch(getPacksTC({}))
        //hardCode values
    }, [dispatch, packName, sortPacks, myPacks])

    const addNewPackHandler = () => {
        dispatch(addPackTC({}))
    }
    const showMyPacksHandler = () => {
        dispatch(setMyPacksAC(true))
    }
    const showAllPacksHandler = () => {
        dispatch(setMyPacksAC(false))
    }

    return (
        <div className={s.packs}>
            <div className={s.wrap}>
                <div className={s.sidebar}>
                    <h3 className={s.btnTitle}>Show packs cards</h3>
                    <div className={s.btnBox}>
                        <button className={myPacks ? s.btnActive : s.btn} onClick={showMyPacksHandler}>My</button>
                        <button className={myPacks ? s.btn : s.btnActive} onClick={showAllPacksHandler}>All</button>
                    </div>
                    <h3 className={s.inputTitle}>Number of cards</h3>
                    <div>
                        <DoubleSliderContainer/>
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

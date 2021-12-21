import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Packs.module.scss';
import {
    addPackTC,
    deletePackTC,
    getPacksTC,
    InitialStateType
} from '../../n1-main/m2-bll/reducers/packs-reducer';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {NavLink} from 'react-router-dom';
import {Paginator} from '../paginator/Paginator';
import {Preloader} from '../../common/preloader/Preloaders';


export const Packs = () => {
    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPacksTC({}))
        //hardCode values
    }, [dispatch])
    const {cardPacks} = useSelector<RootStateType, InitialStateType>(state => state.packs)
    //handlers
    const addNewPackHandler = () => {
        dispatch(addPackTC())
    }
    const deletePackHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
    }
    if (!cardPacks) {
        return <Preloader/>
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
                        <div className={s.inputSearchWrap}>
                            <input className={s.inputSearch} placeholder={'Search...'} type={'text'}/>
                        </div>
                        <button className={s.addBtn} onClick={addNewPackHandler}>Add new pack</button>
                    </div>

                    <div className={s.table}>
                        <div className={s.tableHeader}>
                            <div className={s.tableItem}>Name</div>
                            <div className={s.tableItem}>Cards</div>
                            <div className={s.tableItem}>Last Updated</div>
                            <div className={s.tableItem}>Created by</div>
                            <div className={s.tableItem}>Actions</div>
                        </div>
                        {
                            cardPacks.map((pack, index) => {
                                return (
                                    <div className={s.packRow} key={index}>
                                        <div className={s.packRowItem}>
                                            {pack.name}
                                        </div>
                                        <div className={s.packRowItem}>
                                            {pack.cardsCount}
                                        </div>
                                        <div className={s.packRowItem}>
                                            {pack.updated}
                                        </div>
                                        <div className={s.packRowItem}>
                                            {pack.user_name}
                                        </div>
                                        <div className={s.packRowItem}>
                                            <button className={s.packRowBtn}
                                                    onClick={() => deletePackHandler(pack._id)}>Delete
                                            </button>
                                            <NavLink className={s.packRowLink} to={path.CARDS}>Learn</NavLink>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Paginator/>
                </div>
            </div>
        </div>
    )
}
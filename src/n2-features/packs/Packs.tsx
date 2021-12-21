import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './Packs.module.scss';
import {
    addPackTC,
    deletePackTC,
    getPacksTC,
    InitialStateType,
    setValueSearchAC, sortPacksAC
} from '../../n1-main/m2-bll/reducers/packs-reducer';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {NavLink} from 'react-router-dom';
import {Paginator} from '../paginator/Paginator';

export const Packs = () => {

    //hooks
    const dispatch = useDispatch()

    const {cardPacks} = useSelector<RootStateType, InitialStateType>(state => state.packs)
    const packName = useSelector<RootStateType, string | undefined>(state => state.packs.sortValues.packName)
    let sortPacks = useSelector<RootStateType, any>(state => state.packs.sortValues.sortPacks)
    // const packs = useSelector<RootStateType, OneCardPacksType[]>(state => state.packs.packs)

    useEffect(() => {
        dispatch(getPacksTC({packName, sortPacks}))
        //hardCode values
    }, [dispatch, packName, sortPacks])

    const [searchValue, setSearchValue] = useState('')

    //handlers

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const setValueSearchHandler = () => {
        dispatch(setValueSearchAC(searchValue))
        setSearchValue('')
    }
    const sortPacksNameHandler = () => {
        sortPacks === '0name' ? dispatch(sortPacksAC('1name')) : dispatch(sortPacksAC('0name'))
    }
    const sortPacksCountHandler = () => {
        sortPacks === '0cardsCount' ? dispatch(sortPacksAC('1cardsCount')) : dispatch(sortPacksAC('0cardsCount'))
    }
    const sortPacksUpdatedHandler = () => {
        sortPacks === '0updated' ? dispatch(sortPacksAC('1updated')) : dispatch(sortPacksAC('0updated'))
    }
    const sortPacksUserNameHandler = () => {
        sortPacks === '0user_name' ? dispatch(sortPacksAC('1user_name')) : dispatch(sortPacksAC('0user_name'))
    }

    const addNewPackHandler = () => {
        dispatch(addPackTC())
    }
    const deletePackHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
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
                            <input className={s.inputSearch}
                                   placeholder={'Search...'}
                                   onChange={searchHandler}
                                   value={searchValue}
                                   type={'text'}
                            />
                        </div>
                        {/*<Search />*/}
                        <button className={s.addBtn} onClick={setValueSearchHandler}>Search</button>
                        <button className={s.addBtn} onClick={addNewPackHandler}>Add new pack</button>
                    </div>

                    <div className={s.table}>
                        <div className={s.tableHeader}>
                            <div className={s.tableItem} onClick={sortPacksNameHandler}>Name</div>
                            <div className={s.tableItem} onClick={sortPacksCountHandler}>Cards</div>
                            <div className={s.tableItem} onClick={sortPacksUpdatedHandler}>Last Updated</div>
                            <div className={s.tableItem} onClick={sortPacksUserNameHandler}>Created by</div>
                            <div className={s.tableItemActions}>Actions</div>
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

function MouseEventHandler<T>() {
    throw new Error('Function not implemented.');
}

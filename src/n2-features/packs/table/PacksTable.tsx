import React from 'react';
import s from './PacksTable.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../n1-main/m2-bll/store';
import {deletePackTC, InitialStateType, sortPacksAC} from '../../../n1-main/m2-bll/reducers/packs-reducer';
import {NavLink} from 'react-router-dom';
import {path} from '../../../n1-main/m1-ui/routes/Routes';
import {getCardsTC, setPackIdAc} from '../../../n1-main/m2-bll/reducers/cards-reducer';

type PacksTableProps = {}

export const PacksTable: React.FC<PacksTableProps> = () => {
    //hooks
    let sortPacks = useSelector<RootStateType, any>(state => state.packs.sortPacks)
    let userId = useSelector<RootStateType, any>(state => state.profile._id)
    const dispatch = useDispatch()

    //handlers
    const handleOnLearnButton = (id: string) => {
        dispatch(getCardsTC(id))
        dispatch(setPackIdAc(id))
    }

    const sortPacksHandler = (value:string) => {
        sortPacks.charAt(0) === '0' ? dispatch(sortPacksAC(`1${value}`)) : dispatch(sortPacksAC(`0${value}`))
    }

    const deletePackHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
    }

    const {cardPacks} = useSelector<RootStateType, InitialStateType>(state => state.packs)
    console.log(cardPacks)

    return (
        <div className={s.packs}>
            <div className={s.table}>
                <div className={s.tableHeader}>
                    <div className={s.tableItem} onClick={() => {sortPacksHandler('name')}}>Name</div>
                    <div className={s.tableItem} onClick={() => {sortPacksHandler('cardsCount')}}>Cards</div>
                    <div className={s.tableItem} onClick={() => {sortPacksHandler('updated')}}>Last Updated</div>
                    <div className={s.tableItem} onClick={() => {sortPacksHandler('user_name')}}>Created by</div>
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

                                    <button className={s.packRowBtn} disabled={pack.user_id!==userId}
                                            onClick={() => deletePackHandler(pack._id)}>Delete
                                    </button>
                                    {/*<NavLink className={s.packRowLink} to={`${path.CARDS}/cardsPack_id/:${pack._id}`}*/}
                                    <NavLink className={s.packRowLink} to={`${path.CARDS}${pack._id}`}

                                             onClick={() => handleOnLearnButton(pack._id)}
                                    >Learn</NavLink>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

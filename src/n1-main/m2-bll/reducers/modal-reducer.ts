const initialState = {
    isShowModal: false,
    modalType: '' as ModalWindowType,
    packId: '',
    cardId: ''
}

export const modalReducer = (state: ModalInitialStateType = initialState, action: ModalActionsType): ModalInitialStateType => {
    switch (action.type) {
        case 'APP/SET-IS-SHOW-MODAL-WINDOW':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//actionCreators
export const setIsShowModalWindow = (payload: { isShowModal: boolean, modalType: ModalWindowType, packId?: string, cardId?: string }) => ({
    type: 'APP/SET-IS-SHOW-MODAL-WINDOW',
    payload
} as const)

//thunks

//types
export type ModalInitialStateType = typeof initialState
export type SetIsShowModalActionType = ReturnType<typeof setIsShowModalWindow>
export type ModalWindowType = ''
    | 'CREATE-NEW-PACK'
    | 'DELETE-PACK'
    | 'UPDATE-PACK'
    | 'CREATE-NEW-CARD'
    | 'UPDATE-CARD'

export type ModalActionsType =
    | SetIsShowModalActionType
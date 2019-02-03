import { FETCH_PHOTOS, FETCH_PHOTOS_SUCCESS } from '../actions/action-types';

const initialState = {
    isFetchingPhotos: false
}

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS:
            return {
                ...state,
                ...action.uiState
            }
        case FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                imgsData: state.isFetchingPhotos && !action.isLoadMore ? action.imgsData : [...state.imgsData, ...action.imgsData],
                nextPage: action.nextPage,
                isFetchingPhotos: false
            }
        default:
            return state;
    }
}


export default photoReducer;
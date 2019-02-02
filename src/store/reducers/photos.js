import { FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS, FETCH_PHOTOS_WITH_REFRESHING } from '../actions/action-types';

const initialState = {
    isFetching: false
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
                imgsData: state.isFetching && !action.isLoadMore ? action.imgsData : [...state.imgsData, ...action.imgsData],
                nextPage: action.nextPage,
                isFetching: false
            }
        default:
            return state;
    }
}


export default photoReducer;
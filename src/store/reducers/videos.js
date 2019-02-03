import { FETCH_VIDEOS, FETCH_VIDEOS_SUCCESS } from '../actions/action-types';

const initialState = {
    isFetchingVideos: false
}

export const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIDEOS:
            return {
                ...state,
                ...action.uiState
            }
        case FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                videosData: state.isFetchingVideos && !action.isLoadMore ? action.videosData : [...state.videosData, ...action.videosData],
                nextPage: action.nextPage,
                isFetchingVideos: false
            }
        default:
            return state;
    }
}


export default videoReducer;
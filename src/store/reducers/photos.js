import { FETCH_PHOTOS_SUCCESS } from '../actions/action-types';

const initialState = {
    imgsData: []
}

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                imgsData: action.imgsData,
                nextPage: action.nextPage
            }

        default:
            return state;
    }
}


export default photoReducer;
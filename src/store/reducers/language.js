import { CHANGE_LANGUAGE } from '../actions/action-types';
import I18n from '../../i18n';

const initialState = {
    currentLanguage: I18n.currentLocale()
}

export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                currentLanguage: action.language
            }

        default:
            return state;
    }
}


export default languageReducer;
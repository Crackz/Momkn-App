import { CHANGE_LANGUAGE } from './action-types';


export const changeLanguage = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        language
    }
}

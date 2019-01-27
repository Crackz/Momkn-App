// import { ADD_CITY, DELETE_CITY } from '../actions/action-types';


// const initialState = {
//     cities: []
// }

// export const citiesReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_CITY:
//             return {
//                 ...state,
//                 cities: state.cities.concat({
//                     key: Math.random().toString(),
//                     name: action.cityName,
//                     image: {
//                         uri: "https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg"
//                     }
//                 })
//             }
//         case DELETE_CITY:
//             return {
//                 ...state,
//                 cities: state.cities.filter((element) => element.key !== action.cityKey)
//             }
//         default:
//             return state;
//     }
// }


// export default citiesReducer;
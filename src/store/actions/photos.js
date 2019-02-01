import { FETCH_PHOTOS_SUCCESS } from './action-types';



export const fetchPhotos = (url) => {
    function thunk(dispatch) {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: FETCH_PHOTOS_SUCCESS,
                    imgsData: responseJson.data.map((imgData) => ({ id: imgData.id, source: { uri: imgData.source } })),
                    nextPage: responseJson.paging && responseJson.paging.next || null
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    thunk.interceptInOffline = true;
    return thunk;
};


import { FETCH_PHOTOS, FETCH_PHOTOS_SUCCESS } from './action-types';



export const fetchPhotos = (url, uiState = {}, extraActionData = {}) => {
    function thunk(dispatch) {
        dispatch({
            type: FETCH_PHOTOS,
            uiState
        });

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: FETCH_PHOTOS_SUCCESS,
                    imgsData: responseJson.data.map(
                        (imgData) => ({
                            id: imgData.id,
                            source: { uri: imgData.source }, updatedDate: imgData.updated_time
                        })
                    ),
                    nextPage: responseJson.paging && responseJson.paging.next || null,
                    ...extraActionData
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    thunk.interceptInOffline = true;
    thunk.meta = {
        retry: true,
        name: 'fetchPhotos',
        args: [url, uiState, extraActionData],
    };
    return thunk;
};

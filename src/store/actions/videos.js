import { FETCH_VIDEOS, FETCH_VIDEOS_SUCCESS } from './action-types';



export const fetchVideos = (url, uiState = {}, extraActionData = {}) => {
    function thunk(dispatch) {
        dispatch({
            type: FETCH_VIDEOS,
            uiState
        });

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: FETCH_VIDEOS_SUCCESS,
                    videosData: responseJson.data
                        .map((videoData) =>
                            ({
                                id: videoData.id,
                                uri: videoData.source,
                                thumbnail: videoData.thumbnails.data.find(v => v.is_preferred === true).uri
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
        name: 'fetchVideos',
        args: [url, uiState, extraActionData],
    };
    return thunk;
};

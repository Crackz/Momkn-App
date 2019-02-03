import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import config from 'react-native-config';
import { connect } from 'react-redux';
import { fetchVideos } from '../../store/actions';
import Empty from '../../Components/Empty/Empty';
import Warning from '../../Components/Warning/Warning';
import I18n from '../../i18n';

class VideosGrid extends Component {

    constructor(props) {
        super(props);

        this.videosPath = config.videosPath
            .replace('pageId', config.pageId)
            .replace('videosLimit', config.videosLimit)
            .replace('accessToken', config.accessToken)
    }


    componentDidMount() {
        this.props.fetchVideos(this.videosPath, { isFetchingVideos: true });
    }

    videosRefreshHandler = () => {
        this.props.fetchVideos(this.videosPath, { isFetchingVideos: true });
    }


    renderVideosFooter = () => {
        if (!this.props.isFetchingVideos) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating={this.props.isFetchingVideos} size="large" />
            </View>
        );
    };

    loadMoreVideos = () => {
        if (!this.props.nextPage) return;
        this.props.fetchPhotos(this.props.nextPage, { isFetchingVideos: true }, { isLoadMore: true });
    }

    renderEmptyComponent = () => (
        <Empty
            style={styles.emptyComponent}
            text={I18n.t("emptyContentText", { locale: this.props.currentLanguage })}
        />
    )

    render() {
        const { isConnected, isFetchingVideos, videosData, currentLanguage } = this.props;

        if (!videosData && !isConnected)
            return <Warning style={{ flex: 1 }} text={I18n.t("warningText", { locale: currentLanguage })} />

        return (
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={[]}//this.props.videosData}
                numColumns={1}
                keyExtractor={item => item.id}
                horizontal={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flex: 1, marginVertical: 10 }}>
                            <VideoPlayer item={{ uri: item.uri, thumbnail: item.thumbnail }} />
                        </View>
                    );
                }}
                ListFooterComponent={this.renderVideosFooter}
                ListEmptyComponent={this.renderEmptyComponent}
                refreshing={isFetchingVideos}
                onRefresh={this.videosRefreshHandler}
                // OnEndedReached is triggered twice so this workaround is fine for now.
                onEndReached={debounce(this.loadMoreVideos, 500)}
                onEndReachedThreshold={.01}

            />
        );
    }
}



const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1
    },
    emptyComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        videosData: state.videos.videosData,
        isFetchingVideos: state.videos.isFetchingVideos,
        nextPage: state.videos.nextPage,
        isConnected: state.network.isConnected,
        currentLanguage: state.language.currentLanguage
    }
}


const mapDispatchToProps = (dispatch) => {
    return ({
        fetchVideos: (url, newUiState, extraActionData) => dispatch(fetchVideos(url, newUiState, extraActionData)),
    })
}




export default connect(mapStateToProps, mapDispatchToProps)(VideosGrid);
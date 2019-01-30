import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import VideoPlayer from '../VideoPlayer/VideoPlayer';


class VideosGrid extends Component {
    state = {
        refreshing: false,
        loading: false,
        videosData: [],
        error: null,
    }

    componentDidMount() {
        this.requestVideos();
    }

    handleVideosRefreshHandler = () => {
        this.setState({ refreshing: true }, () => this.requestVideos());
    }


    renderVideosFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating={this.state.loading} size="large" />
            </View>
        );
    };

    loadMoreVideos = () => {
        const { nextPage } = this.state;
        if (!nextPage) return;

        this.requestVideos(nextPage);
    }

    requestVideos = (videosPath) => {

        this.setState({ loading: true });
        fetch(videosPath || this.props.videosUrl)
            .then(res => res.json())
            .then(res => {
                const { videosData, nextPage, error } = this.props.transformResponse(res);

                if (error) {
                    this.setState({ loading: false, error, refreshing: false });
                    return alert('Error: ' + error.message);
                }


                this.setState((prevState) => {
                    return {
                        ...prevState,
                        videosData: prevState.refreshing ? videosData : [...prevState.videosData, ...videosData],
                        loading: false,
                        refreshing: false,
                        error,
                        nextPage
                    }
                })
            })
            .catch(error => {
                console.log('CAUGHT ERR: ', error);
                this.setState({ error, loading: false, refreshing: false });
            });
    };



    render() {

        return (
            <FlatList
                data={this.state.videosData}
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
                refreshing={this.state.refreshing}
                onRefresh={this.handleVideosRefreshHandler}
                // OnEndedReached is triggered twice so this workaround is fine for now.
                onEndReached={debounce(this.loadMoreVideos, 500)}
                onEndReachedThreshold={.01}
                // removeClippedSubviews={true}

                // ItemSeparatorComponent={() => (
                //   <View style={{
                //     height: 5,
                //     borderStyle: "solid",
                //     borderColor: "#8c8b8b",
                //     borderWidth: 1,
                //     borderRadius: 20,
                //     paddingHorizontal: 5
                //   }}>

            />
        );
    }
}

export default VideosGrid;
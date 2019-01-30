import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-view';



class PhotosGrid extends Component {
    state = {
        isImageViewVisible: false,
        imageIndex: null,
        refreshing: false,
        loading: false,
        imgsSourcesAndIds: [],
        error: null,
    }

    componentDidMount() {
        this.requestPhotos();
    }

    handlePhotosRefreshHandler = () => {
        this.setState({ refreshing: true }, () => this.requestPhotos());
    }


    renderPhotosFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating={this.state.loading} size="large" />
            </View>
        );
    };

    loadMorePhotos = () => {
        const { nextPage } = this.state;
        if (!nextPage) return;

        this.requestPhotos(nextPage);
    }

    requestPhotos = (photoPath) => {

        this.setState({ loading: true });
        fetch(photoPath || this.props.photosUrl)
            .then(res => res.json())
            .then(res => {
                const { imgsSourcesAndIds, nextPage, error } = this.props.transformResponse(res);

                if (error) {
                    this.setState({ loading: false, error, refreshing: false });
                    return alert('Error: ' + error.message);
                }


                this.setState((prevState) => {
                    return {
                        ...prevState,
                        imgsSourcesAndIds: prevState.refreshing ? imgsSourcesAndIds : [...prevState.imgsSourcesAndIds, ...imgsSourcesAndIds],
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
            <React.Fragment>

                <FlatList
                    columnWrapperStyle={styles.columnWrapperStyle}
                    data={this.state.imgsSourcesAndIds}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity key={item.id} style={styles.imageCell}
                                onPress={() => { this.setState({ imageIndex: index, isImageViewVisible: true }); }}>

                                <Image style={styles.image} source={item.source} resizeMethod="resize" />

                            </TouchableOpacity>
                        );
                    }}
                    // removeClippedSubviews={true}
                    ListFooterComponent={this.renderPhotosFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handlePhotosRefreshHandler}
                    // OnEndedReached is triggered twice so this workaround is fine for now.
                    onEndReached={debounce(this.loadMorePhotos, 500)}
                    onEndReachedThreshold={.01}
                />


                <ImageView
                    glideAlways
                    images={this.state.imgsSourcesAndIds}
                    imageIndex={this.state.imageIndex}
                    animationType="fade"
                    isVisible={this.state.isImageViewVisible}
                    onClose={() => this.setState({ isImageViewVisible: false })}
                />

            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    columnWrapperStyle: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: "space-around"
    },
    imageCell: {
        flex: 1,
        margin: 3
    },
    image: {
        height: 200
    }
})

export default PhotosGrid;
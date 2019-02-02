import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import config from 'react-native-config';
import ImageView from 'react-native-image-view';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../store/actions';
import Warning from '../../Components/Warning/Warning';

class PhotosGrid extends Component {

    constructor(props) {
        super(props);

        this.photosPath = config.photosPath
            .replace('albumId', config.albumId)
            .replace('photosLimit', config.photosLimit)
            .replace('accessToken', config.accessToken);


        this.state = {
            isImageViewVisible: false,
            imageIndex: null,
            error: null,
        }

    }


    componentDidMount() {
        this.props.fetchPhotos(this.photosPath, { isFetching: true });
    }

    handlePhotosRefreshHandler = () => {
        this.props.fetchPhotos(this.photosPath, { isFetching: true });
    }


    renderPhotosFooter = () => {
        if (!this.props.isFetching) return null;

        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating={this.props.isFetching} size="large" />
            </View>
        );
    };

    loadMorePhotos = () => {
        if (!this.props.nextPage) return; // ToDo add an indicator for page end
        this.props.fetchPhotos(this.props.nextPage, { isFetching: true }, { isLoadMore: true });
    }


    render() {
        const { isConnected, isFetching, imgsData } = this.props;

        if (!imgsData && !isConnected)
            return <Warning style={{ flex: 1 }} text={"سيقوم البرنامج تلقائيا بالتحديث عند توفر الانترنت"} />


        return (
            <React.Fragment>

                <FlatList
                    columnWrapperStyle={styles.columnWrapperStyle}
                    data={imgsData}
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
                    refreshing={isFetching}
                    onRefresh={this.handlePhotosRefreshHandler}
                    // OnEndedReached is triggered twice so this workaround is fine for now.
                    onEndReached={debounce(this.loadMorePhotos, 500)}
                    onEndReachedThreshold={.01}
                />


                <ImageView
                    glideAlways
                    images={imgsData}
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


const mapStateToProps = (state) => {
    return {
        imgsData: state.photos.imgsData,
        isFetching: state.photos.isFetching,
        nextPage: state.photos.nextPage,
        isConnected: state.network.isConnected,
    }
}


const mapDispatchToProps = (dispatch) => {
    return ({
        fetchPhotos: (url, newUiState, extraActionData) => dispatch(fetchPhotos(url, newUiState, extraActionData)),
    })
}



export default connect(mapStateToProps, mapDispatchToProps)(PhotosGrid);
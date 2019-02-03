import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import config from 'react-native-config';
import ImageView from 'react-native-image-view';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../store/actions';
import Empty from '../../Components/Empty/Empty';
import Warning from '../../Components/Warning/Warning';
import I18n from '../../i18n';

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
        this.props.fetchPhotos(this.photosPath, { isFetchingPhotos: true });
    }

    photosRefreshHandler = () => {
        this.props.fetchPhotos(this.photosPath, { isFetchingPhotos: true });
    }


    // renderPhotosFooter = () => {
    //     if (!this.props.isFetchingPhotos) return null;

    //     return (
    //         <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
    //             <ActivityIndicator animating={this.props.isFetchingPhotos} size="large" />
    //         </View>
    //     );
    // };

    loadMorePhotos = () => {
        if (!this.props.nextPage) return;
        this.props.fetchPhotos(this.props.nextPage, { isFetchingPhotos: true }, { isLoadMore: true });
    }

    renderEmptyComponent = () => (
        <Empty
            style={styles.emptyComponent}
            text={I18n.t("emptyContentText", { locale: this.props.currentLanguage })}
        />
    )

    render() {
        const { isConnected, isFetchingPhotos, imgsData, currentLanguage } = this.props;

        if (!imgsData && !isConnected)
            return <Warning style={{ flex: 1 }} text={I18n.t("warningText", { locale: currentLanguage })} />

        return (
            <React.Fragment>

                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
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
                    // ListFooterComponent={this.renderPhotosFooter}
                    ListEmptyComponent={this.renderEmptyComponent}
                    refreshing={isFetchingPhotos}
                    onRefresh={this.photosRefreshHandler}
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
    contentContainerStyle: {
        flexGrow: 1
    },
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
    },
    emptyComponent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


const mapStateToProps = (state) => {
    return {
        imgsData: state.photos.imgsData,
        isFetchingPhotos: state.photos.isFetchingPhotos,
        nextPage: state.photos.nextPage,
        isConnected: state.network.isConnected,
        currentLanguage: state.language.currentLanguage
    }
}


const mapDispatchToProps = (dispatch) => {
    return ({
        fetchPhotos: (url, newUiState, extraActionData) => dispatch(fetchPhotos(url, newUiState, extraActionData)),
    })
}



export default connect(mapStateToProps, mapDispatchToProps)(PhotosGrid);
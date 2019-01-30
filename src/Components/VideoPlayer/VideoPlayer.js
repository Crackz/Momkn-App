import React, { Component } from 'react';
import { StyleSheet, Animated, Dimensions, View } from 'react-native';
// import Video from 'react-native-video';
import Video from 'react-native-video-player';

import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';


const THRESHOLD = 100;

class VideoPlayer extends Component {
    state = {
        error: false,
        buffering: false,
        paused: true,
        animated: new Animated.Value(0)
    }
    position = {
        start: null,
        end: null
    }

    handleVideoError = (meta) => {
        const { error: { code } } = meta;
        console.log('IM INVOKED....')
        let error = "An error occurred playing this video";
        switch (code) {
            case -11800:
                error = "Could not load video";
                break;
        }
        this.setState({ error })

    }

    handleLoadStart = () => {
        this.trigerBufferAnimation();
    }

    trigerBufferAnimation = () => {
        this.loopingAnimation = Animated.loop(
            Animated.timing(this.state.animated, {
                toValue: 1,
                duration: 350
            })).start();
    }

    handleBuffering = (meta) => {
        meta.isBuffering && this.trigerBufferAnimation();
        if (this.loopingAnimation && !meta.isBuffering) {
            this.loopingAnimation.stopAnimation();
        }

        this.setState({ buffering: meta.isBuffering })
    }

    handleVideoLayout = (e) => {
        const { height } = Dimensions.get("window");
        this.position.start = e.nativeEvent.layout.y - height + THRESHOLD;
        this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD;
    }

    render() {

        const { width } = Dimensions.get('window'),
            videoHeight = width * 0.5625;


        const { error, buffering } = this.state;
        const interpolatedAnimation = this.state.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        });

        const rotateStyle = {
            transform: [
                { rotate: interpolatedAnimation }
            ]
        }
        return (
            <View>

                <Video
                    endWithThumbnail
                    video={{ uri: this.props.item.uri }}
                    thumbnail={{ uri: this.props.item.thumbnail }}
                    fullScreenOnLongPress
                    onLoadStart={this.handleLoadStart}
                    onBuffer={this.handleBuffering}
                    videoHeight={videoHeight}
                    videoWidth={width}
                    playInBackground={false}
                    playWhenInactive={false}
                />

                {buffering && <Animated.View style={[rotateStyle, styles.videoCover]}>
                    <FontAwsomeIcon name="circle-o-notch" size={32} color="#FFF" />
                </Animated.View>
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({

    videoCover: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
    },

    error: {
        backgroundColor: "#000"
    }

})

export default VideoPlayer;
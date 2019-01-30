import React, { Component } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { View } from "react-native-animatable";
import config from 'react-native-config';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import ContactIcons from '../../Components/ContactIcons/ContactIcons';
import PhotosGrid from "../../Components/PhotosGrid/PhotosGrid";
import VideoPlayer from '../../Components/VideoPlayer/VideoPlayer';
import I18n from '../../i18n';
import styles from "./styles";



class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: I18n.currentLocale()
    };


    this.photoPaths = config.photosPath
      .replace('albumId', config.albumId)
      .replace('photosLimit', config.photosLimit)
      .replace('accessToken', config.accessToken);

  }



  languageChangeHandler = () => {
    I18n.locale = I18n.currentLocale() === 'en' ? 'ar' : 'en';
    this.setState((prevState) => {
      return {
        ...prevState,
        currentLanguage: I18n.currentLocale()
      }
    })
  }

  photosTransformResponseHandler = (res) => {
    if (res.error)
      return { error: true }

    return {
      imgsSourcesAndIds: res.data.map((img) => ({ id: img.id, source: { uri: img.source } })),
      nextPage: res.paging && res.paging.next || null
    }
  }





  render() {
    const { videoUri, viewVideoPlayer } = this.state;

    return (
      <React.Fragment>
        <View style={styles.header}>

          <Animatable.View animation="fadeInDown" style={styles.logo}>
            <Image source={MainScreenLogo} style={{ width: 150, height: 150 }} />
          </Animatable.View >

          {/* Settings Button */}
          <TouchableOpacity style={styles.settingButton} onPress={this.languageChangeHandler}>
            <Ionicons name="ios-settings" size={24} color="black" />
          </TouchableOpacity>


          <ContactIcons
            phoneNumber={config.phoneNumber}
            whatsAppPhoneNumber={config.whatsAppPhoneNumber}
            navigateToLocation={{
              latitude: config.navigationToLocationDetailsLatitude,
              longitude: config.navigationToLocationDetailsLongitude
            }}
          />


        </View>

        <ScrollableTabView
          style={styles.scrollableTabView}
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#457B9D"}
          tabBarActiveTextColor={"#FFFFFF"}
          tabBarInactiveTextColor={"#fff8"}
          tabBarTextStyle={styles.tabText}
        >

          <View tabLabel={I18n.t('mainTabs.photosTabLabel', { language: this.state.currentLanguage })}>
            <PhotosGrid photosUrl={this.photoPaths} transformResponse={this.photosTransformResponseHandler} />
          </View>

          <View tabLabel={I18n.t('mainTabs.videosTabLabel', { language: this.state.currentLanguage })}>


            <FlatList
              data={[
                {
                  thumbnail: "https://scontent.xx.fbcdn.net/v/t15.5256-10/49934558_2216500305344013_7066558568836628480_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=0a949476c172b7fd7617982264fd3f6f&oe=5CF36185",
                  uri: "https://scontent.xx.fbcdn.net/v/t42.1790-29/51496670_241088553475702_3166802999475981461_n.mp4?_nc_cat=101&efg=eyJybHIiOjUzMSwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoic2QifQ\u00253D\u00253D&rl=531&vabr=295&_nc_ht=scontent.xx&oh=725b58f520f4d57496a96907065ad29c&oe=5C531343",
                  id: "1"
                },
                {
                  // thumbnail: "https://scontent.xx.fbcdn.net/v/t15.5256-10/49934558_2216500305344013_7066558568836628480_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=0a949476c172b7fd7617982264fd3f6f&oe=5CF36185",
                  uri: "https://www.radiantmediaplayer.com/media/bbb-360p.mp4",
                  id: "2"
                }
              ]}
              numColumns={1}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ flex: 1, marginVertical: 10 }}>
                    <VideoPlayer item={item} />
                  </View>
                );
              }}
            // ItemSeparatorComponent={() => (
            //   <View style={{
            //     height: 5,
            //     borderStyle: "solid",
            //     borderColor: "#8c8b8b",
            //     borderWidth: 1,
            //     borderRadius: 20,
            //     paddingHorizontal: 5
            //   }}>

            //   </View>
            // )}
            // // removeClippedSubviews={true}
            // ListFooterComponent={this.renderPhotosFooter}
            // refreshing={this.state.refreshing}
            // onRefresh={this.handlePhotosRefreshHandler}
            // OnEndedReached is triggered twice so this workaround is fine for now.
            // onEndReached={debounce(this.loadMorePhotos, 500)}
            // onEndReachedThreshold={.01}
            />

          </View>

        </ScrollableTabView>

      </React.Fragment>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isConnected: state.network.isConnected
  }
}

export default connect(mapStateToProps)(MainScreen);
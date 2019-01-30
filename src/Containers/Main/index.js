import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { View } from "react-native-animatable";
import config from 'react-native-config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import ContactIcons from '../../Components/ContactIcons/ContactIcons';
import PhotosGrid from "../../Components/PhotosGrid/PhotosGrid";
import VideosGrid from "../../Components/VideosGrid/VideosGrid";
import I18n from '../../i18n';
import styles from "./styles";



class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: I18n.currentLocale()
    };


    this.photosPath = config.photosPath
      .replace('albumId', config.albumId)
      .replace('photosLimit', config.photosLimit)
      .replace('accessToken', config.accessToken);

    this.videosPath = config.videosPath
      .replace('pageId', config.pageId)
      .replace('videosLimit', config.videosLimit)
      .replace('accessToken', config.accessToken)
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
      imgsSourcesAndIds: res.data.map((imgData) => ({ id: imgData.id, source: { uri: imgData.source } })),
      nextPage: res.paging && res.paging.next || null
    }
  }
  videosTransformResponseHandler = (res) => {
    if (res.error)
      return { error: true };

    return {
      videosData: res.data
        .map((videoData) =>
          ({
            id: videoData.id, uri: videoData.source,
            thumbnail: videoData.thumbnails.data.find(v => v.is_preferred === true).uri
          })
        ),

      nextPage: res.paging && res.paging.next || null

    }
  }

  render() {
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
          tabBarTextStyle={[styles.tabText, { fontFamily: I18n.currentLocale() === 'ar' ? 'Monadi' : 'Oranienbaum' }]}
        >

          <View tabLabel={I18n.t('mainTabs.photosTabLabel', { language: this.state.currentLanguage })}>
            <PhotosGrid photosUrl={this.photosPath} transformResponse={this.photosTransformResponseHandler} />
          </View>

          <View tabLabel={I18n.t('mainTabs.videosTabLabel', { language: this.state.currentLanguage })}>
            <VideosGrid videosUrl={this.videosPath} transformResponse={this.videosTransformResponseHandler} />
            {/* [
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
              ] */}
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
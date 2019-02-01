import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import config from 'react-native-config';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import ContactIcons from '../../Components/ContactIcons/ContactIcons';
import PhotosGrid from "../../Components/PhotosGrid/PhotosGrid";
import VideosGrid from "../../Components/VideosGrid/VideosGrid";
import SettingsIcon from '../../Components/SettingsIcon/SettingsIcon';
import I18n from '../../i18n';
import styles from "./styles";
import { changeLanguage } from '../../store/actions';


class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.photosPath = config.photosPath
      .replace('albumId', config.albumId)
      .replace('photosLimit', config.photosLimit)
      .replace('accessToken', config.accessToken);

    this.videosPath = config.videosPath
      .replace('pageId', config.pageId)
      .replace('videosLimit', config.videosLimit)
      .replace('accessToken', config.accessToken)
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
    const { currentLanguage, languageChangeHandler } = this.props;


    return (
      <View style={{ flex: 1 }}>

        <View style={styles.settingsMenu}>
          <SettingsIcon currentLanguage={currentLanguage} onLanguageChange={languageChangeHandler} />
        </View>


        <View style={styles.header}>

          <Animatable.View animation="fadeInDown" style={styles.logo}>
            <Image source={MainScreenLogo} style={{ width: 150, height: 150 }} />
          </Animatable.View >

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
          tabBarPosition="bottom"
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#457B9D"}
          tabBarActiveTextColor={"#FFFFFF"}
          tabBarInactiveTextColor={"#fff8"}
          tabBarTextStyle={[styles.tabText, { fontFamily: I18n.currentLocale() === 'ar' ? 'Monadi' : 'Oranienbaum' }]}
        >

          <View tabLabel={I18n.t('mainTabs.photosTabLabel', { locale: currentLanguage })}>
            <PhotosGrid photosUrl={this.photosPath} transformResponse={this.photosTransformResponseHandler} />
          </View>

          <View tabLabel={I18n.t('mainTabs.videosTabLabel', { locale: currentLanguage })}>
            <VideosGrid videosUrl={this.videosPath} transformResponse={this.videosTransformResponseHandler} />
          </View>

        </ScrollableTabView>

      </View>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isConnected: state.network.isConnected,
    currentLanguage: state.language.currentLanguage
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    languageChangeHandler: (language) => dispatch(changeLanguage(language))
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
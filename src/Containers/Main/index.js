import React, { Component } from "react";
import { Image, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import config from 'react-native-config';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import ContactIcons from '../../Components/ContactIcons/ContactIcons';
import SettingsIcon from '../../Components/SettingsIcon/SettingsIcon';
import I18n from '../../i18n';
import { changeLanguage } from '../../store/actions';
import PhotosGrid from "../PhotosGrid";
import VideosGrid from "../VideosGrid";
import styles from "./styles";


class MainScreen extends Component {

  componentDidMount() {
    SplashScreen.hide();
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
            <Image source={MainScreenLogo} style={{ width: 150, flex: 1 }} />
          </Animatable.View >

          <ContactIcons
            phoneNumber={config.phoneNumber}
            whatsAppPhoneNumber={config.whatsAppPhoneNumber}

            navigateToLocationOptions={{
              latitude: config.navigationToLocationDetailsLatitude,
              longitude: config.navigationToLocationDetailsLongitude,
              // title: 'Mahmoud Momkn',  // optional
              // googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
              // googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
              dialogTitle: I18n.t("navigateToLocation.dialogTitle", { locale: currentLanguage }),
              dialogMessage: I18n.t("navigateToLocation.dialogMessage", { locale: currentLanguage }),
              cancelText: I18n.t("navigateToLocation.cancelText", { locale: currentLanguage })
            }}
          />


        </View>

        <ScrollableTabView
          style={styles.scrollableTabView}
          initialPage={0}
          tabBarPosition="bottom"
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#E63946"}
          tabBarActiveTextColor={"#F1FAEE"}
          tabBarInactiveTextColor={"#fff8"}
          tabBarTextStyle={[styles.tabText, { fontFamily: currentLanguage === 'ar' ? 'Monadi' : 'Oranienbaum' }]}
        >

          <View tabLabel={I18n.t('mainTabs.photosTabLabel', { locale: currentLanguage })} style={{ flex: 1 }}>
            <PhotosGrid />
          </View>

          <View tabLabel={I18n.t('mainTabs.videosTabLabel', { locale: currentLanguage })} style={{ flex: 1 }}>
            <VideosGrid />
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
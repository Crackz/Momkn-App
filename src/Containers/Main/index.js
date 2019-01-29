import React, { Component } from "react";
import { Alert, Image, Linking, Platform, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import config from 'react-native-config';
import { showLocation } from 'react-native-map-link';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from 'react-native-video';
import { connect } from 'react-redux';
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import PhotosGrid from "../../Components/PhotosGrid/PhotosGrid";
import I18n from '../../i18n';
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
const AnimatedIcon = Animatable.createAnimatableComponent(Ionicons);


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

          <View style={styles.contactIcons}>

            <TouchableOpacity style={styles.roundedButton} onPress={() => messageToWhatsApp(config.whatsAppPhoneNumber)} >
              <AnimatedIcon animation="pulse" easing="ease-out" iterationCount="infinite"  name="logo-whatsapp" size={32} color="#4FCE5D" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.roundedButton}
              onPress={() => navigateToLocation({ latitude: config.navigationToLocationDetailsLatitude, longitude: config.navigationToLocationDetailsLongitude })} >
              <AnimatedIcon animation="jello" iterationCount="infinite" name="md-locate" size={32} color="#DD4B3E" />
            </TouchableOpacity>


            <TouchableOpacity style={styles.roundedButton} onPress={() => callNumber(config.phoneNumber)}>
              <AnimatedIcon animation="pulse" easing="ease-out" iterationCount="infinite" name="ios-call" size={32} color="#1180FF" />
            </TouchableOpacity>

          </View>

        </View>

        <ScrollableTabView
          style={styles.body}
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#457B9D"}
          tabBarActiveTextColor={"#FFFFFF"}
          tabBarInactiveTextColor={"#fff8"}
          tabBarTextStyle={styles.tabText}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
                borderWidth: 0,
                borderColor: "transparent"
              }}
            />
          )}
        >
          <View tabLabel={I18n.t('mainTabs.photosTabLabel', { language: this.state.currentLanguage })}>
            <PhotosGrid photosUrl={this.photoPaths} transformResponse={this.photosTransformResponseHandler} />
          </View>


          <View tabLabel={I18n.t('mainTabs.videosTabLabel', { language: this.state.currentLanguage })}>
            <Video url={"https://scontent.xx.fbcdn.net/v/t15.5256-10/49903906_2216500335344010_5799404124000747520_n.jpg?_nc_cat=103&_nc_ht=scontent.xx&oh=ab1183965e49ed73c6226adcd154ab06&oe=5CC59519"} />

          </View>

        </ScrollableTabView>

      </React.Fragment>
    );
  }
}


export const callNumber = phoneNumber => {
  let linkingToPhone = Platform.OS !== 'android' ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

  Linking.canOpenURL(linkingToPhone)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(linkingToPhone);
      }
    })
    .catch(err => console.log(err));
};


export const navigateToLocation = async ({ latitude, longitude }) => {

  await showLocation({
    latitude,
    longitude
    // title: 'Mahmoud Momkn',  // optional
    // googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
    // googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
    // dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
    // dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
    // cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
  })
}

export const messageToWhatsApp = (phoneNumber) => {
  const url = `whatsapp://send?phone=${phoneNumber}`;
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'Alert',
        'WhatsApp is not installed',
      )
    }
  });
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.network.isConnected
  }
}

export default connect(mapStateToProps)(MainScreen);
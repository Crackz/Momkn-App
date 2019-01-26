import { Body, Container, Header, Left, Right } from "native-base";
import React, { Component } from "react";
import { Alert, Image, Linking, Platform, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { showLocation } from 'react-native-map-link';
import Ionicons from "react-native-vector-icons/Ionicons";
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import ScrollableTabView, { ScrollableTabBar } from "../../Components/react-native-scrollable-tab-view";
import I18n from '../../i18n';
import styles from "./styles";

let config = {
  photosPath: "https://graph.facebook.com/v3.2/778320115870113/photos?fields=source,id,limit=10",

  fbPageAccessToken: "EAAFAVUvVRmgBAINMfiZCUNUCYIyyPzZC245ZAp6EYx52f2ClZClHZAkVEqYJB20HZB5LnZBcQQZC0sltetjhkHYZAWV7dYqy3f9X13pZAjFqzi9JLZCIIc7z1YvgbELOK5REwCKjbE03JUEUIPMogqCH9adOTXj04ZCkjO1fhhwRcRDFQzHaZCMVQFwhVRD2WCdcG5DUYKBeyw20PZAAZDZD",

  phoneNumber: "01157954393",
  whatsAppPhoneNumber: "01157954393",
  navigationLocation: [],
  navigationToLocationDetails: {
    latitude: 30.5833,
    longitude: 32.2667
  }
}


export default class MainScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currentLanguage: I18n.currentLocale()
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

  render() {
    return (
      // <Container }>
      <Container style={styles.main}>
        <Header style={styles.header}>
          {/* Take up the space */}
          <Left style={styles.left}></Left>

          {/* Title */}
          <Body style={styles.body}>
            {/* <Title style={styles.headerTitle}>{I18n.t('appName', { language: this.state.currentLanguage })}</Title> */}
            <Image source={MainScreenLogo} style={{ width: 150, height: 150 }} />
          </Body >

          <Right style={styles.right}></Right>

          {/* Settings Button */}
          <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={this.languageChangeHandler}>
            <Ionicons name="ios-settings" size={20} color="black" style={{ textAlign: "right" }} />
          </TouchableOpacity>


        </Header>

        <View style={styles.profile}>

          <TouchableOpacity style={styles.roundedButton} onPress={() => messageToWhatsApp(config.whatsAppPhoneNumber)} >
            <Ionicons name="logo-whatsapp" size={32} color="#4FCE5D" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={() => navigateToLocation(config.navigationToLocationDetails)}>
            <Ionicons name="md-locate" size={32} color="#DD4B3E" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.roundedButton} onPress={() => callNumber(config.phoneNumber)}>
            <Ionicons name="ios-call" size={32} color="#1180FF" />
          </TouchableOpacity>
          {/* </View> */}
        </View>


        <ScrollableTabView
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


            {/*
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={styles.rowMain}>
                    <ImageBackground source={rowData.cardBgImage} style={styles.imageBG}>
                      <View style={styles.cardContent}>
                        <Right>
                          <View style={styles.profileContainer}>
                            <View key={item.id} style={styles.imgview}> */}
            {/*
                          </View>
                          </View>
                        </Right>
                      </View>
                    </ImageBackground>
                  </View>
                )}
              />

                          */}


          </View>
          <View tabLabel={I18n.t('mainTabs.videosTabLabel', { language: this.state.currentLanguage })}>
            {/* <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View style={styles.rowMain}>
                  <ImageBackground source={rowData.cardBgImage} style={styles.imageBG}>
                    <View style={styles.cardContent}>
                      <Right>
                        <View style={styles.profileContainer}>
                          <View key={item.id} style={styles.imgview}> */}
            {/* <Image style={styles.profileImg} source={item.img} /> */}
            {/* </View>
                        </View>
                      </Right>
                    </View>
                  </ImageBackground>
                </View>
              )}
            /> */}
          </View>

        </ScrollableTabView>
      </Container>
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
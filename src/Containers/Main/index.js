import { Body, Container, Header, Left, Right } from "native-base";
import React, { Component } from "react";
import { Alert, Image, Linking, Platform, TouchableOpacity, Text, FlatList, ActivityIndicator } from "react-native";
import { View } from "react-native-animatable";
import { showLocation } from 'react-native-map-link';
import Ionicons from "react-native-vector-icons/Ionicons";
import MainScreenLogo from '../../assets/images/MomknLogo.png';
import I18n from '../../i18n';
import styles from "./styles";
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import debounce from 'lodash.debounce';
import ImageView from 'react-native-image-view';

let config = {
  photosPath: `https://graph.facebook.com/v3.2/{albumId}/photos?fields=source,id&limit={limit}&access_token={accessToken}`,
  videosPath: `https://graph.facebook.com/v3.2/{pageId}/videos?fields=source,thumbnails,id&limit={limit}&access_token={accessToken}`,


  pageId: "778311709204287",
  fbPageAccessToken: "***REMOVED***",
  photoLimit: 5,
  videoLimit: 5,
  albumId: "778320115870113",


  phoneNumber: "01157954393",
  whatsAppPhoneNumber: "+201157954393",
  navigationLocation: [],
  navigationToLocationDetails: {
    latitude: 30.5833,
    longitude: 32.2667
  }
}

class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLanguage: I18n.currentLocale(),
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      isImageViewVisible: false
    };

    this.photoPath = config.photosPath
      .replace('{albumId}', config.albumId)
      .replace("{limit}", config.photoLimit)
      .replace("{accessToken}", config.fbPageAccessToken);
  }

  componentDidMount() {
    this.makeRemoteRequestToFbPage();
  }

  makeRemoteRequestToFbPage = (photoPath) => {

    this.setState({ loading: true });
    fetch(photoPath || this.photoPath)
      .then(res => res.json())
      .then(res => {

        if (res.error) {
          this.setState({ loading: false });
          return alert('Facebook Error: ' + res.error.message);
        }


        console.log("INCOMING DATA: ", res);
        this.setState((prevState) => {

          console.log('PREV STATE: ', prevState);
          return {
            ...prevState,
            data: prevState.refreshing ? res.data : [...prevState.data, ...res.data],
            error: res.error || null,
            loading: false,
            refreshing: false,
            nextPage: res.paging.next || null
          }
        })
      })
      .catch(error => {
        console.log('CAUGHT ERR: ', err);
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  languageChangeHandler = () => {
    I18n.locale = I18n.currentLocale() === 'en' ? 'ar' : 'en';
    this.setState((prevState) => {
      return {
        ...prevState,
        currentLanguage: I18n.currentLocale()
      }
    })
  }


  handlePhotosRefreshHandler = () => {
    this.setState({ refreshing: true }, () => this.makeRemoteRequestToFbPage());
  }

  loadMorePhotos = () => {
    const { nextPage } = this.state;
    console.log('NEXT PAGE: ', nextPage);
    if (!nextPage) return;

    this.makeRemoteRequestToFbPage(nextPage);
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const imgsAsUris = this.state.data.map((img) => ({ id: img.id, source: { uri: img.source } }));

    return (
      <React.Fragment>

        <Container style={styles.main}>
          <Header style={styles.header}>
            {/* Take up the space */}
            <Left style={styles.left}></Left>

            {/* Title */}
            <Body style={styles.body}>
              <Image source={MainScreenLogo} style={{ width: 150, height: 150 }} />
            </Body >

            <Right style={styles.right}></Right>

            {/* Settings Button */}
            <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={this.languageChangeHandler}>
              <Ionicons name="ios-settings" size={32} color="black" />
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

        </Container>

        <ScrollableTabView
          style={{ flex: 3, marginTop: 20 }}
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
            {/* <Text>{"isConnected: " + this.props.isConnected}</Text> */}

            <FlatList
              columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, justifyContent: "space-around" }}
              data={imgsAsUris}
              numColumns={2}
              keyExtractor={item => item.id}
              horizontal={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity key={item.id} style={{ flex: 1, margin: 3 }}
                    onPress={() => { this.setState({ imageIndex: index, isImageViewVisible: true }); }}>

                    <Image style={{ height: 200 }} source={item.source} resizeMethod="resize" />

                  </TouchableOpacity>
                );
              }}
              // removeClippedSubviews={true}
              ListFooterComponent={this.renderFooter}
              refreshing={this.state.refreshing}
              onRefresh={this.handlePhotosRefreshHandler}
              // OnEndedReached is triggered twice so this workaround is fine for now.
              onEndReached={debounce(this.loadMorePhotos, 500)}
              onEndReachedThreshold={100}
            />
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

        <ImageView
          glideAlways
          images={imgsAsUris}
          imageIndex={this.state.imageIndex}
          animationType="fade"
          isVisible={this.state.isImageViewVisible}
          onClose={() => this.setState({ isImageViewVisible: false })}
        />

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

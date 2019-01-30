import React, { Component } from 'react';
import { Alert, Linking, Platform, TouchableOpacity, StyleSheet, View } from "react-native";
import { showLocation } from 'react-native-map-link';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from 'react-native-animatable';

const AnimatedIcon = Animatable.createAnimatableComponent(Ionicons);

class ContactIcons extends Component {


    callNumber = phoneNumber => {
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


    navigateToLocation = async ({ latitude, longitude }) => {

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

    messageToWhatsApp = (phoneNumber) => {
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

    render() {

        return (
            <View style={styles.contactIcons}>

                <TouchableOpacity style={styles.roundedButton} onPress={() => this.messageToWhatsApp(this.props.whatsAppPhoneNumber)} >
                    <AnimatedIcon animation="pulse" easing="ease-out" iterationCount="infinite" name="logo-whatsapp" size={32} color="#4FCE5D" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.roundedButton}
                    onPress={() => this.navigateToLocation({
                        latitude: this.props.navigateToLocation.latitude,
                        longitude: this.props.navigateToLocation.longitude
                    })} >
                    <AnimatedIcon animation="jello" iterationCount="infinite" name="md-locate" size={32} color="#DD4B3E" />
                </TouchableOpacity>


                <TouchableOpacity style={styles.roundedButton} onPress={() => this.callNumber(this.props.phoneNumber)}>
                    <AnimatedIcon animation="pulse" easing="ease-out" iterationCount="infinite" name="ios-call" size={32} color="#1180FF" />
                </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    contactIcons: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#F1FAEE',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: '#2d324f',
        paddingVertical: 1,
        width: "100%",
        paddingHorizontal: 10,

    },

    roundedButton: {
        // borderWidth: 1,
        // borderColor: 'rgba(0,0,0,0.2)',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: 40,
        // height: 40,
        // backgroundColor: '#fff',
        // borderRadius: 100,
    }
})
export default ContactIcons;
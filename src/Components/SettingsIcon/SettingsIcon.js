import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Ionicons from "react-native-vector-icons/Ionicons";

class SettingButton extends Component {

    render() {
        const { currentLanguage, onLanguageChange } = this.props;
        return (
            <View style={styles.settingButton}>
                <Menu >
                    <MenuTrigger >
                        <Ionicons name="ios-settings" size={24} color="black" />
                    </MenuTrigger>

                    <MenuOptions customStyles={{
                        optionWrapper: { marginVertical: 5 },
                        optionText: { textAlign: "center" }
                    }}>
                        <MenuOption onSelect={(language) => onLanguageChange(language)} text='English' value="en" disabled={currentLanguage === 'en'} />
                        <View style={styles.divider} />
                        <MenuOption onSelect={(language) => onLanguageChange(language)} text='عربي' value="ar" disabled={currentLanguage === 'ar'} />
                    </MenuOptions>
                </Menu>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        textAlign: "center"
    },
    divider: {
        height: 5,
        borderStyle: "solid",
        borderColor: "#8c8b8b",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 5
    }

})



export default SettingButton;

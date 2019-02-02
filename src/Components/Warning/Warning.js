import React from 'react';
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Warning = ({style, text}) => {

    return (
        <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
            <Ionicons name="md-alert" size={32} color="#ffcc00" />
            <Text>{text}</Text>
        </View>
    )
}

export default Warning;
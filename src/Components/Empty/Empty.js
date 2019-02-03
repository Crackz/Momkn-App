import React from 'react';
import { View, Text } from 'react-native'

const EmptyComponent = ({ style, text }) => {
    return (
        <View style={style}>
            <Text>{text}</Text>
        </View>
    )
}

export default EmptyComponent;
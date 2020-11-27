

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

export class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View
                style={styles.content}>
                <TouchableOpacity
                onPress={()=>{
                    this.props.goBack()
                }}
                activeOpacity={0.8}
                    style={styles.backButton}
                >
                    <Image
                        source={require('../assets/images/back.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                {this.props.title}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25
    },
    backButton: {
        height: 30,
        width: 30,
        padding: 3
    },
    backIcon: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    title:{
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 18,
        color: '#747474',
        fontFamily: 'demi',
    }
});

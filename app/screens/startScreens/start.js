
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native'
import store from '../../store'

export class Start extends Component {

    constructor(props) {
        super(props)
        let { config } = store.getState()
        this.contentHeight = config.contentHeight
    }

    render() {

        return (
            <View style={styles.content}>
                <View style={[styles.backImageContainer, { height: this.contentHeight }]}>
                    <Image
                        style={[styles.backImage, { height: 812 }]}
                        source={require('../../assets/images/hit.png')}
                    />
                </View>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logoWhite.png')}
                />

                <Text style={styles.desc}>
                Our MAN ON app will allow you and your friends to keep score while having fun with our coin toss game geared around the great game of baseball!
                    </Text>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('SignUp')
                    }}
                        activeOpacity={0.8}
                        style={[styles.button, { borderWidth: 0 }]}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Get started
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>{
                        this.props.navigation.navigate('Login')
                    }}
                        activeOpacity={0.8}
                        style={[styles.button, { backgroundColor: 'transparent' }]}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Login
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'center'
    },
    backImageContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'flex-start'
    },
    backImage: {
        width: Dimensions.get('window').width,
    },
    logo: {
        marginTop: 70,
        height: 131,
        width: 131,
        alignSelf: "center"
    },
    desc: {
        marginTop: 32,
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ITCFranklinGothicStd-Book',
        lineHeight: 18,
        alignSelf: "center",
        marginHorizontal: 30,
        lineHeight: 22,
        textAlign: "center"
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 11,
        marginTop: 32,
        marginBottom: '24%'
    },
    button: {
        flex: 1,
        height: 40,
        backgroundColor: '#FF5C00',
        borderRadius: 5,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 7,
        borderColor: '#FF5C00',
        borderWidth: 2
    },
    buttonText: {
        fontFamily: 'ITCFranklinGothicStd-Med',
        color: '#fff',
        fontSize: 20,
        lineHeight: 22,
    },
});

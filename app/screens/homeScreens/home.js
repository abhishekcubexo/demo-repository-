
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { RegisterCodeModal } from '../../components'

class HomeClass extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.user);
    }

    render() {
        return (
            <View
                style={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logoBlack.png')}
                />
                <Text style={styles.nameText}>
                    Player name: {this.props.user.playerName}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Opponents')
                    }}
                    activeOpacity={0.8}
                    style={[styles.button, { backgroundColor: '#FF5C00' }]}
                >
                    <Text style={[styles.buttonText, { color: '#fff' }]}>
                        Start new game
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('ProfileSettings')
                    }}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Profile settings
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('History')
                    }}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        History
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        AsyncStorage.clear()
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Start' }],
                        });
                    }}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Log out
                  </Text>
                </TouchableOpacity>
                <RegisterCodeModal
                visible={!this.props.user.active}
                />
            </View>
        )
    }
}

export const Home = connect(({ user }) => ({ user }))(HomeClass)

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        paddingBottom: '15%'
    },
    logo: {
        height: 104,
        width: 104,
        alignSelf: "center",
    },
    button: {
        backgroundColor: '#C8C8C8',
        marginHorizontal: 19,
        height: 40,
        borderRadius: 5,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonText: {
        color: '#747474',
        fontSize: 20,
        fontFamily: 'ITCFranklinGothicStd-Med',
        lineHeight: 22
    },
    nameText: {
        color: '#00AF40',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 24,
        lineHeight: 26,
        textAlign: "center",
        marginTop: '5%',
        marginBottom: '7%'
    }
});

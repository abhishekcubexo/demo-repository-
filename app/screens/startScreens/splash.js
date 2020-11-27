
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native'
import store from '../../store'
import API from '../../networking/api'
import { connect } from 'react-redux'

class SplashClass extends Component {

    api = new API()

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.checkToken()
    }

    checkToken() {
        this.api.getToken()
            .then((token) => {
                if (token) {
                    this.api.getUser(token)
                        .then((res) => {
                            console.log(res);
                            if (res && res.data && res.data._id) {
                                this.props.dispatch({
                                    type: 'SET_USER',
                                    value: {
                                        ...res.data,
                                        token
                                    }
                                })
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'HomeStack' }],
                                });
                            }
                            else {
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Start' }],
                                });
                            }
                        })
                        .catch((error) => {
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Start' }],
                            });
                        })
                }
                else {
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Start' }],
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Start' }],
                });
            })
    }

    render() {
        return (
            <View
                onLayout={({ nativeEvent }) => {
                    const windowHeight = nativeEvent.layout.height;
                    console.log(windowHeight);
                    store.dispatch({ type: 'SET_CONTENT_HEIGHT', value: windowHeight })
                }}
                style={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logoBlack.png')}
                />
            </View>
        )
    }
}

export const Splash = connect()(SplashClass)

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: 'center'
    },
    logo: {
        height: 238,
        width: 238
    }
});

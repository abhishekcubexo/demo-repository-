
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import MainStack from './navigation/mainStackNavigator'
import { Provider } from 'react-redux'
import store from './store'

export default class MyApp extends Component {

    render() {
        return (
            <Provider store={store}>
            <View style={styles.content}>
                <MainStack/>
            </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
});

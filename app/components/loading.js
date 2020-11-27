
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {
    MaterialIndicator,
} from 'react-native-indicators';

export class Loading extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.loading);
    }

    render() {
        return this.props.loading ? (
            <View
                style={styles.content}>
                <MaterialIndicator
                    size={80}
                    color='white' />
            </View>
        ) : null
    }
}

const styles = StyleSheet.create({
    content: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10
    },

});

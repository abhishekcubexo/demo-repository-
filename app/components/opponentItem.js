
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'


export class OpponentItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeItem: false
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
            onPress={()=>{
                this.props.onPress()
            }}
                // onPressIn={() => {
                //     this.setState({
                //         activeItem: true
                //     })
                // }}
                // onPressOut={() => {
                //     this.setState({
                //         activeItem: false
                //     })
                //     this.props.onPress()
                // }}
            >
                <View style={[
                    styles.userItem,
                    this.state.activeItem ?
                        { backgroundColor: '#FF5C00' } :
                        null
                ]}>
                    <Text style={styles.userItemText}>
                        jump5236
                </Text>
                    <View style={styles.scoreBox}>
                        <Text style={styles.userItemText}>
                            10
                </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    userItem: {
        height: 51,
        borderRadius: 5,
        backgroundColor: '#00AF40',
        marginBottom: 16,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userItemText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'ITCFranklinGothicStd-Med',
        lineHeight: 22
    },
    scoreBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 39,
        width: 43,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

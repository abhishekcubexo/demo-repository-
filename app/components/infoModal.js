
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'
import Modal from 'react-native-modal';

export class InfoModal extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Modal
            backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                isVisible={this.props.visible}>
                <View style={styles.content}>
                <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.close()
                            }}
                        >
                    <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.alertContent}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.close()
                            }}
                        >
                            <Image
                                source={require('../assets/images/close.png')}
                                style={styles.closeImage}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={styles.desc}>
                        {this.props.text}
                        </Text>
                        <View style={styles.buttonsRow}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.props.yesPress()
                            }}
                            >
                                <View style={styles.yesButton}>
                                    <Text style={styles.buttonText}>
                                    Yes
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.props.close()
                            }}
                            >
                                <View style={styles.noButton}>
                                    <Text style={[styles.buttonText, { color: '#747474' }]}>
                                    No
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    alertContent: {
        backgroundColor: '#fff',
        height: 417,
        paddingHorizontal: 20
    },
    closeImage: {
        height: 26,
        width: 26,
        marginTop: 20,
        alignSelf: 'flex-end'
    },
    desc:{
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22,
        color: '#747474',
        marginTop: 91,
        textAlign: 'center'
    },
    buttonsRow:{
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    yesButton:{
        backgroundColor: '#00AF40',
        flex: 1,
        height: 40,
        marginRight: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    noButton:{
        flex: 1,
        height: 40,
        marginLeft: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FF5C00'
    },
    buttonText:{
        color: '#fff',
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'ITCFranklinGothicStd-Med',

    }
});

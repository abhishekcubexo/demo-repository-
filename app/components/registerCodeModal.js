
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    Alert
} from 'react-native'
import API from '../networking/api'
import { Loading } from '.'
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import { TimerText } from './timerText'

class RegisterCodeModalClass extends Component {

    api = new API()

    constructor(props) {
        super(props)
        this.state = {
            code: '',
            loading: false,
            timer: true
        }
    }

    resendCode() {
        this.api.resendCode(this.props.user.token)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    checkCode() {
        Keyboard.dismiss()
        this.setState({
            loading: true
        })
        let data = {
            code: this.state.code
        }
        this.api.emailConfirmation(data, this.props.user.token)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    this.api.setToken(res.data.token)
                        .then(() => {
                            this.props.dispatch({ type: 'SET_USER', value: res.data })
                        })
                        .catch(() => {
                            Alert.alert(
                                "",
                                "Unknow Error",
                                [
                                    {
                                        text: "Close",
                                        onPress: () => { },
                                        style: "cancel"
                                    },
                                ],
                                { cancelable: true }
                            );
                        })
                }
                else {
                    this.setState({
                        loading: false
                    })
                    let message = res.data
                    // if (res.data && res.data.error) {
                    //     message = res.data.error
                    // }
                    Alert.alert(
                        "",
                        message,
                        [
                            {
                                text: "Close",
                                onPress: () => { },
                                style: "cancel"
                            },
                        ],
                        { cancelable: true }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                })
                Alert.alert(
                    "",
                    "Connection Error",
                    [
                        {
                            text: "Close",
                            onPress: () => { },
                            style: "cancel"
                        },
                    ],
                    { cancelable: true }
                );
            })
    }

    _renderTimerText() {
        return this.state.timer ? (
            <View style={styles.resetRow}>
                <Text style={[
                    styles.resendText,
                    { color: '#747474' }
                ]}>
                    You can resend code after
            </Text>
                <TimerText
                    canSend={() => {
                        this.setState({
                            timer: false
                        })
                    }}
                    style={[styles.resendText, { marginLeft: 12 }]} />
            </View>
        ) :
            (<Text
                onPress={() => {
                    this.setState({
                        timer: true
                    })
                    this.resendCode()
                }}
                style={styles.resendText}>
                Resend verification code
            </Text>)
    }

    render() {
        return (
            <Modal
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                isVisible={this.props.visible}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Enter the code you've just received in your e-mail.
                            </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.code}
                                onChangeText={(text) => {
                                    this.setState({
                                        code: text
                                    })
                                }}
                                style={styles.input}
                                placeholder='Enter code'
                                placeholderTextColor='#CCCCCC'
                            />
                        </View>
                        {this._renderTimerText()}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                this.checkCode()
                            }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Apply</Text>
                        </TouchableOpacity>
                        <Loading loading={this.state.loading} />
                    </View>
                </View>
            </Modal>
        )
    }
}

export const RegisterCodeModal = connect(({ user }) => ({ user }))(RegisterCodeModalClass)

const styles = StyleSheet.create({
    content: {
        height: 308,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    title: {
        color: '#747474',
        fontSize: 20,
        lineHeight: 24,
        marginTop: 40,
        textAlign: "center",
    },
    inputContainer: {
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 5,
        marginTop: 24,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#FF5C00'
    },
    input: {
        flex: 1,
        padding: 0,
        paddingLeft: 32,
        paddingRight: 10,
        fontFamily: 'ITCFranklinGothicStd-Book',
        fontSize: 16,
    },
    loginButton: {
        height: 40,
        width: 155,
        backgroundColor: '#00AF40',
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Dimensions.get('window').height * 0.15,
    },
    loginButtonText: {
        fontFamily: 'ITCFranklinGothicStd-Med',
        color: '#fff',
        fontSize: 20,
        lineHeight: 22,
    },
    resendText: {
        color: '#FF5C00',
        fontSize: 12,
        lineHeight: 20,
        fontFamily: 'Roboto-Regular',
        textAlign: "center"
    },
    resetRow: {
        flexDirection: 'row',
        alignSelf: "center",
    }
});

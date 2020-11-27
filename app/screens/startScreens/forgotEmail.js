
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
import store from '../../store'
import API from '../../networking/api'
import { Loading } from '../../components'

export class ForgotEmail extends Component {

    api = new API()

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            loading: false
        }
        let { config } = store.getState()
        this.contentHeight = config.contentHeight
    }

    submit() {
        Keyboard.dismiss()

        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (emailPattern.test(this.state.email)) {
            this.setState({
                loading: true
            })
            this.api.forgotPassword(this.state.email)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        loading: false
                    })
                    if (res.status == 200) {
                        this.props.navigation.navigate('ForgotCode', { email: this.state.email })
                    }
                    else {
                        Alert.alert(
                            "",
                            'Account with this email does not exist!',
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
                    this.setState({
                        loading: false
                    })
                    console.log(error);
                    Alert.alert(
                        "",
                        'Connection error',
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
            Alert.alert(
                "",
                'Email Invalid',
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
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.backImageContainer, { height: this.contentHeight }]}>
                    <Image
                        style={styles.backImage}
                        source={require('../../assets/images/backImage.png')}
                    />
                </View>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.content}>

                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/logoWhite.png')}
                        />
                        <Text
                            style={styles.title}
                        >
                            Forgot password
                    </Text>
                        <Text style={styles.desc}>
                            Enter your email to receive the recovery code.
                    </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState({
                                        email: text
                                    })
                                }}
                                style={styles.input}
                                placeholder='E-mail'
                                placeholderTextColor='#CCCCCC'
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                this.submit()
                            }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Send code</Text>
                        </TouchableOpacity>
                        <Text style={styles.signUpQuestion}>
                            Don't have an account ?   <Text
                                onPress={() => {
                                    this.props.navigation.reset({
                                        index: 1,
                                        routes: [
                                            { name: 'Start' },
                                            { name: 'SignUp' }
                                        ],
                                    });
                                }}
                                style={styles.signUpText}>
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
                <Loading loading={this.state.loading} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    backImageContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'flex-end'
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
    title: {
        marginTop: Dimensions.get('window').height * 0.09,
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 30,
        lineHeight: 34,
        color: '#FF5C00',
        alignSelf: "center"
    },
    desc: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ITCFranklinGothicStd-Book',
        lineHeight: 18,
        marginTop: 9,
        alignSelf: "center",
        marginBottom: 39,
    },
    inputContainer: {
        marginHorizontal: 16,
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 5,
        marginTop: 16,
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
        backgroundColor: '#FF5C00',
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 32,
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
    signUpQuestion: {
        position: 'absolute',
        bottom: 20,
        fontSize: 10,
        color: '#fff',
        fontFamily: 'ITCFranklinGothicStd-Book',
        alignSelf: 'center',
    },
    signUpText: {
        fontSize: 10,
        color: '#FF5C00',
        fontFamily: 'ITCFranklinGothicStd-Book',
        alignSelf: 'center',
        lineHeight: 25,
    }
});

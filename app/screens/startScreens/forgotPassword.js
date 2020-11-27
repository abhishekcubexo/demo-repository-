
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

export class ForgotPassword extends Component {

    api = new API()

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
            loading: false
        }
        let { config } = store.getState()
        this.contentHeight = config.contentHeight
        this.params = this.props.route.params
    }

    submit(){
        
        Keyboard.dismiss()
        let msg = null
        if(this.state.password.length <= 5){
            msg = 'Password must be at least 6 characters'
        }
        else if (this.state.confirmPassword!=this.state.password){
            msg='Incorrect password repeat'
        }
        if(msg){
            Alert.alert(
                "",
                msg,
                [
                    {
                        text: "Close",
                        onPress: () => { },
                        style: "cancel"
                    },
                ],
                { cancelable: true }
            );
            return
        }

        this.setState({
            loading: true
        })
        console.log(this.params.recoveryToken, this.state.password);
        this.api.sendNewPassword(this.params.recoveryToken, this.state.password)
            .then((res) => {
                console.log(res);
                this.setState({
                    loading: false
                })
                if (res.status == 200) {
                    Alert.alert(
                        "",
                        res.data.message,
                        [
                            {
                                text: "Sign In",
                                onPress: () => { 
                                   this.props.navigation.navigate('Login')
                                },
                                style: "cancel"
                            },
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    Alert.alert(
                        "",
                        'Server error',
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
                            Reset Pasword
                    </Text>
                    <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        })
                                    }}
                                    style={styles.input}
                                    placeholder='New Password'
                                    placeholderTextColor='#CCCCCC'
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    secureTextEntry={true}
                                    value={this.state.confirmPassword}
                                    onChangeText={(text) => {
                                        this.setState({
                                            confirmPassword: text
                                        })
                                    }}
                                    style={styles.input}
                                    placeholder='Reenter Password'
                                    placeholderTextColor='#CCCCCC'
                                />
                            </View>
                 </View>
                        <TouchableOpacity
                         activeOpacity={0.8}
                            onPress={() => {
                              this.submit()
                            }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Reset Pasword</Text>
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
         marginTop:  Dimensions.get('window').height * 0.09,
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 30,
        lineHeight: 34,
        color: '#FF5C00',
        alignSelf: "center"
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
        width: 199,
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

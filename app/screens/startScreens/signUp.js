
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
import API from '../../networking/api'
import { Loading } from '../../components'
import { connect } from 'react-redux'

class SignUpClass extends Component {

    api = new API()

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            playerName: '',
            email: '',
            password: '',
            loading: false
        }
        this.contentHeight = this.props.config.contentHeight
    }

    validate() {
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let error = ''
        switch (false) {
            case this.state.firstName.length > 1:
                error = 'First Name must be at least 2 characters'
                break;
            case this.state.lastName.length > 1:
                error = 'Last Name must be at least 2 characters'
                break;
            case this.state.playerName.length > 2:
                error = 'Player Name must be at least 3 characters'
                break;
            case emailPattern.test(this.state.email):
                error = 'Email Invalid'
                break;
            case this.state.password.length > 5:
                error = 'Password must be at least 6 characters'
                break;
            default:
                this.signUp()
                break;
        }
        if (error) {
            Alert.alert(
                "",
                error,
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

    signUp() {
        Keyboard.dismiss()
        this.setState({
            loading: true
        })
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            playerName: this.state.playerName,
            email: this.state.email,
            password: this.state.password,
        }
        this.api.signUp(data)
            .then((res) => {
                console.log(res);

                if (res.status == 200) {
                    this.api.setToken(res.data.token)
                    .then(() => {
                        this.props.dispatch({ type: 'SET_USER', value: res.data })
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeStack' }],
                        });
                    })
                    .catch(() => {
                        this.setState({
                            loading: false
                        })
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
                    let message = "Connection Error"
                    if (res.data && res.data.msg) {
                        message = res.data.msg
                    }
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
                            Create Account
                    </Text>
                        <Text style={styles.desc}>
                            Please sign up to cuntinue
                    </Text>
                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.firstName}
                                    onChangeText={(text) => {
                                        this.setState({
                                            firstName: text
                                        })
                                    }}
                                    style={styles.input}
                                    placeholder='First Name'
                                    placeholderTextColor='#CCCCCC'
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.lastName}
                                    onChangeText={(text) => {
                                        this.setState({
                                            lastName: text
                                        })
                                    }}
                                    style={styles.input}
                                    placeholder='Last Name'
                                    placeholderTextColor='#CCCCCC'
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={this.state.playerName}
                                    onChangeText={(text) => {
                                        this.setState({
                                            playerName: text
                                        })
                                    }}
                                    style={styles.input}
                                    placeholder='Player Name'
                                    placeholderTextColor='#CCCCCC'
                                />
                            </View>
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
                            <View style={styles.inputContainer}>
                                <TextInput
                                    secureTextEntry
                                    value={this.state.password}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        })
                                    }}
                                    style={styles.input}
                                    placeholder='Password'
                                    placeholderTextColor='#CCCCCC'
                                />
                            </View>
                        </View>
                        <Text style={styles.or}>
                            Or
                    </Text>
                        <View style={styles.row}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.socialButton}
                            >
                                <Image
                                    source={require('../../assets/images/f.png')}
                                    style={styles.socialImage}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.socialButton}
                            >
                                <Image
                                    source={require('../../assets/images/i.png')}
                                    style={styles.socialImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.validate()
                            }}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Sign up</Text>
                        </TouchableOpacity>
                        <Text style={styles.signUpQuestion}>
                            Alredy have an account?   <Text
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                                }}
                                style={styles.signUpText}>
                                Login
                            </Text>

                        </Text>
                    </View>

                </ScrollView>
                <Loading loading={this.state.loading} />
            </View>
        )
    }
}

export const SignUp = connect(({ config }) => ({ config }))(SignUpClass)

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
        marginTop: 24,
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
    or: {
        color: '#fff',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22,
        alignSelf: "center",
        marginVertical: 26,
    },
    row: {
        flexDirection: 'row',
        alignSelf: "center"
    },
    socialButton: {
        height: 24,
        width: 24,
        marginHorizontal: 9,
    },
    loginButton: {
        height: 40,
        width: 123,
        backgroundColor: '#FF5C00',
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 16,
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
    socialImage: {
        flex: 1,
        height: null,
        width: null,
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

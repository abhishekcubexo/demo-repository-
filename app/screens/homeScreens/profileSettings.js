
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    TextInput
} from 'react-native'

export class ProfileSettings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            playerName: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            reenterPassword: ''
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View
                    style={styles.content}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logoBlack.png')}
                    />
                    <Text style={styles.title}>
                        Change profile settings
              </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.firstName}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: text
                                })
                            }}
                            style={styles.input}
                            placeholder='First name'
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
                            placeholder='Last name'
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
                            value={this.state.oldPassword}
                            onChangeText={(text) => {
                                this.setState({
                                    oldPassword: text
                                })
                            }}
                            style={styles.input}
                            placeholder='Old password'
                            placeholderTextColor='#CCCCCC'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            secureTextEntry
                            value={this.state.newPassword}
                            onChangeText={(text) => {
                                this.setState({
                                    newPassword: text
                                })
                            }}
                            style={styles.input}
                            placeholder='New password'
                            placeholderTextColor='#CCCCCC'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            secureTextEntry
                            value={this.state.reenterPassword}
                            onChangeText={(text) => {
                                this.setState({
                                    reenterPassword: text
                                })
                            }}
                            style={styles.input}
                            placeholder='Reenter password'
                            placeholderTextColor='#CCCCCC'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 16, }}>
                             <TouchableOpacity
                        onPress={() => {

                        }}
                        activeOpacity={0.9}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Save
                                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        activeOpacity={0.9}
                        style={[styles.button, { backgroundColor: '#C8C8C8', marginLeft: 14 }]}>
                        <Text style={[styles.buttonText, { color: '#747474' }]}>
                            Back
                                </Text>
                    </TouchableOpacity>
                    </View>
               
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
    },
    logo: {
        height: 104,
        width: 104,
        alignSelf: "center",
    },
    title: {
        color: '#747474',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22,
        marginTop: 24,
        textAlign: "center"
    },
    inputContainer: {
        marginHorizontal: 16,
        backgroundColor: '#F6F6F6',
        height: 40,
        borderRadius: 5,
        marginTop: 24,
    },
    input: {
        flex: 1,
        padding: 0,
        paddingLeft: 32,
        paddingRight: 10,
        fontFamily: 'ITCFranklinGothicStd-Book',
        fontSize: 16,
    },
    button: {
        flex: 1,
        backgroundColor: '#FF5C00',
        height: 40,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 40
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'ITCFranklinGothicStd-Med'
    }
});

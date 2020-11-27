import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { 
    Splash, 
    Login,
    SignUp,
    Start,
    ForgotEmail,
    ForgotCode,
    ForgotPassword,
 } from '../screens'
 import HomeStack from './homeStackNavigator'

const Stack = createStackNavigator();

function MainStack() {
    return (
        <Stack.Navigator
        //initialRouteName='HomeStack'
        headerMode='none'
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotEmail" component={ForgotEmail} />
            <Stack.Screen name="ForgotCode" component={ForgotCode} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
    );
}

export default MainStack
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { 
 Home,
 History,
 Opponents,
 Game,
 ProfileSettings
 } from '../screens'

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
        headerMode='none'
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Opponents" component={Opponents} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        </Stack.Navigator>
    );
}

export default HomeStack
import React from 'react';
import { Button, View } from 'react-native';
//import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './pages/Exames/ListaTipoExames/styles';

const AppStack = createStackNavigator ();

import ListaTipoExame from './pages/Exames/ListaTipoExames';
import ListaExame from './pages/Exames/ListaExames';
import DetalhesExame from './pages/Exames/DetalhesExame';
//import Login from './pages/Login';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate('Notifications')} title="Go back Notification" />
        </View>
    );
}

function ScreenExames({ navigation }) {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name='ListTipoExame' component={ListaTipoExame} />
            <AppStack.Screen name='ListExame' component={ListaExame} />
            <AppStack.Screen name='DetalhesExame' component={DetalhesExame} />
        </AppStack.Navigator>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();
/*const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        ListaExame,
        ListaTipoExame
    })
);*/

export default function Routes(){
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Exames" component={ScreenExames} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        
        </NavigationContainer>
    );
}
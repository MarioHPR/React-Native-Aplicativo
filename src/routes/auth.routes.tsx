import React from 'react';
import SignIn from '../pages/SignIn';
import CadastroUsuario from '../pages/Cadastro';

 import { createStackNavigator } from '@react-navigation/stack';

 const AuthStack = createStackNavigator();

 export const AuthRoutes: React.FC = () => (
     <AuthStack.Navigator>
         <AuthStack.Screen name="SignIn" component={SignIn} />
     </AuthStack.Navigator>
 );

 export const CadastroUsuarioRoutes: React.FC = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Cadastro" component={CadastroUsuario} />
    </AuthStack.Navigator>
);
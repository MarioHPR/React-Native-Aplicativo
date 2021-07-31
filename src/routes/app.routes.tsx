import React from 'react';
import Dashboard from '../pages/Dashboard';
import Exame from '../pages/Exame';
import Consulta from '../pages/Consulta';
import TipoExame from '../pages/TipoExame';
import Instituicoes from '../pages/Instituicoes';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 import { createDrawerNavigator } from '@react-navigation/drawer';

 const AppStack = createDrawerNavigator();
 const Tab = createMaterialBottomTabNavigator();

 const AppRoutes: React.FC = () => (
    <Tab.Navigator>
        <Tab.Screen name="Alergias e Restrições" component={Dashboard} />
        <Tab.Screen name="Consulta(s)" component={Consulta} />
        <Tab.Screen name="Exame(s)" component={Exame} />
        <Tab.Screen name="Tipo de exame(s)" component={TipoExame} />
        <Tab.Screen name="Instituições" component={Instituicoes} />
    </Tab.Navigator>
 );

 export default AppRoutes;
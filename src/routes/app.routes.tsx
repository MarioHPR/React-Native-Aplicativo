import React from 'react';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
 import { createDrawerNavigator } from '@react-navigation/drawer';

 const AppStack = createDrawerNavigator();

 const AppRoutes: React.FC = () => (
     <AppStack.Navigator>
         <AppStack.Screen name="Dashboard" component={Dashboard} />
         <AppStack.Screen name="SignIn" component={SignIn} />
     </AppStack.Navigator>
 );

 export default AppRoutes;
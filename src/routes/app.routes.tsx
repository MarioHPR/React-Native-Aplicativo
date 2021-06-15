import React from 'react';
import Dashboard from '../pages/Dashboard';
import Exame from '../pages/Exame';
import Consulta from '../pages/Consulta';
import TipoExame from '../pages/TipoExame';
import Instituicoes from '../pages/Instituicoes';

 import { createDrawerNavigator } from '@react-navigation/drawer';

 const AppStack = createDrawerNavigator();

 const AppRoutes: React.FC = () => (
     <AppStack.Navigator>
         <AppStack.Screen name="Alergias e Restrições" component={Dashboard} />
         <AppStack.Screen name="Consulta(s)" component={Consulta} />
         <AppStack.Screen name="Exame(s)" component={Exame} />
         <AppStack.Screen name="Tipo de exame(s)" component={TipoExame} />
         <AppStack.Screen name="Instituições" component={Instituicoes} />
     </AppStack.Navigator>
 );

 export default AppRoutes;
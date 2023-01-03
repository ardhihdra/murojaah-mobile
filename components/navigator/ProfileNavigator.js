import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '@constants/routes';
import Profile from 'screens/Profile';
import Donate from 'screens/Donate';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.Profile} component={Profile}/>
      <Stack.Screen name={ROUTES.Donate} component={Donate}/>
    </Stack.Navigator>
  );
}
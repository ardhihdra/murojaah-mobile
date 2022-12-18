import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../../constants/routes';
import JuzCategoriesScreen from '../../screens/JuzCategoriesScreen';
import JuzOverviewScreen from '../../screens/JuzOverviewScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.JuzCategories} component={JuzCategoriesScreen}/>
      <Stack.Screen name={ROUTES.JuzOverview} component={JuzOverviewScreen}/>
    </Stack.Navigator>
  );
}
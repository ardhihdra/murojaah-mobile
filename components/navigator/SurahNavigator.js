import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SurahCategoriesScreen from 'screens/SurahCategoriesScreen';

import { ROUTES } from '@constants/routes';

const Stack = createNativeStackNavigator();

export default function SurahNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.SurahCategories}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        component={SurahCategoriesScreen}/>
    </Stack.Navigator>
  );
}
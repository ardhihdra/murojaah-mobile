import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../../constants/routes';
import JuzCategoriesScreen from '../../screens/JuzCategoriesScreen';
import JuzOverviewScreen from '../../screens/JuzOverviewScreen';
import QuizNavigator from './QuizNavigator';
import Quiz from 'screens/Quiz';
import QuizSummary from 'screens/QuizSummary';

const Stack = createNativeStackNavigator();

export default function HomeNavigator({ navigation }) {

  navigation.addListener('state', (e) => {
    // console.log("CEK STATE", e.data?.state.history[e.data?.state.history.length-1])
  })

  return (
    <Stack.Navigator
    >
      <Stack.Screen name={ROUTES.JuzCategories} component={JuzCategoriesScreen}/>
      {/* <Stack.Screen name={ROUTES.QuizNaviagtor} component={QuizNavigator} /> */}
      <Stack.Screen name={ROUTES.Quiz} component={Quiz}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.QuizSummary}
        component={QuizSummary}
        options={{
          headerBackVisible: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
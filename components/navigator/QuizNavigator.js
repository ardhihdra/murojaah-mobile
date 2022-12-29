import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../../constants/routes';
import Quiz from 'screens/Quiz';
import QuizSummary from 'screens/QuizSummary';

const Stack = createNativeStackNavigator();

export default function QuizNavigator({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.Quiz} component={Quiz} route={route}/>
      <Stack.Screen name={ROUTES.QuizSummary} component={QuizSummary} route={route}/>
    </Stack.Navigator>
  );
}
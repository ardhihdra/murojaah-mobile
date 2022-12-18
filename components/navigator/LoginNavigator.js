import SignupScreen from "screens/SignupScreen";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { ROUTES } from '../../constants/routes';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/LoginScreen";
import { View } from "react-native";

const Tab = createNativeStackNavigator();

export default function LoginNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
        <Tab.Screen name={ROUTES.SignIn} component={LoginScreen}/>
        <Tab.Screen name={ROUTES.SignUp} component={SignupScreen}/>
    </Tab.Navigator>
  );
}
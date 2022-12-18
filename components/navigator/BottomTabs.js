import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { ROUTES } from '../../constants/routes';
import Huruf from '../../screens/Huruf';
import Leaderboard from '../../screens/Leaderboard';
import Profile from '../../screens/Profile';
import HomeNavigator from './HomeNavigator';
import SurahCategoriesScreen from 'screens/SurahCategoriesScreen';
import SurahNavigator from './SurahNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 24
          if (route.name === ROUTES.Home) {
            iconName = focused ? 'home': 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === ROUTES.SurahNavigator) {
            iconName = focused ? 'newspaper-variant' : 'newspaper-variant-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          } else if (route.name === ROUTES.Huruf) {
            iconName = focused ? 'abjad-arabic' : 'abjad-arabic';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          } else if (route.name === ROUTES.Leaderboard) {
            iconName = focused ? 'trophy' : 'trophy-outline';
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === ROUTES.Profile) {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />
          } 
        },
        headerShown: false,
        tabBarActiveTintColor: 'violet',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen name={ROUTES.Home} component={HomeNavigator}/>
      <Tab.Screen name={ROUTES.SurahNavigator} component={SurahNavigator}/>
      <Tab.Screen name={ROUTES.Huruf} component={Huruf}/>
      <Tab.Screen name={ROUTES.Leaderboard} component={Leaderboard}/>
      <Tab.Screen name={ROUTES.Profile} component={Profile}/>
    </Tab.Navigator>
  );
}
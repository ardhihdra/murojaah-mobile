import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { ROUTES } from '../../constants/routes';
import Huruf from '../../screens/Huruf';
import Leaderboard from '../../screens/Leaderboard';
import Profile from '../../screens/Profile';
import HomeNavigator from './HomeNavigator';
import SurahCategoriesScreen from 'screens/SurahCategoriesScreen';
import SurahNavigator from './SurahNavigator';
import { mainColor } from '@styles/Main.styles';
import { useContext } from 'react';
import { SettingsContext } from 'store/settings-context';
import STRINGS from '@constants/strings/strings';
import QuizSummary from 'screens/QuizSummary';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { showBottomBar, language } = useContext(SettingsContext)

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
          } else if (route.name === ROUTES.ProfileNavigator) {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />
          } 
        },
        headerShown: false,
        tabBarActiveTintColor: mainColor.secondary,
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen
        name={ROUTES.Home}
        component={HomeNavigator}
        options={{
          title: STRINGS.home[language],
          tabBarStyle: !showBottomBar ? { display: 'none' }: {}
        }}
      />
      <Tab.Screen name={ROUTES.SurahNavigator} options={{ title: STRINGS.surah[language] }} component={SurahNavigator}/>
      <Tab.Screen name={ROUTES.Huruf} options={{ title: STRINGS.learn[language] }}component={Huruf}/>
      <Tab.Screen name={ROUTES.Leaderboard} options={{ title: STRINGS.leaderboard[language] }} component={Leaderboard}/>
      <Tab.Screen name={ROUTES.ProfileNavigator} options={{ title: STRINGS.profile[language] }} component={ProfileNavigator}/>
    </Tab.Navigator>
  );
}
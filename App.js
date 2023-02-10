import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import firestore from '@react-native-firebase/firestore';

import { useCallback } from 'react';
import { AuthProvider } from 'store/auth-context';
import Router from '@components/Router';
import { mainColor } from '@styles/Main.styles';
import { SettingsProvider } from 'store/settings-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Initialize Firebase Authentication and get a reference to the service
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-extra-bold-italic': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
  })
  

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      console.log("fonts loaded")
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) return null

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <AuthProvider>
      <SettingsProvider>
        <Router />
      </SettingsProvider>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor.primaryLight,
  },
});

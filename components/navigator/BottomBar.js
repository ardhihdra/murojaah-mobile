import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { ROUTES } from "../../constants/routes";
import * as RootNavigation from "../../constants/rootNavigation";
import mainStyles, { mainBorder, mainSpace } from "../../styles/Main.styles";

export default function BottomBar({

}) {
  const MENUS = [
    {
      name: ROUTES.JuzCategories,
      icon: 'home',
      title: 'Home'
    },
    {
      name: ROUTES.Huruf,
      icon: 'abjad-arabic',
      iconComponent: MaterialCommunityIcons,
      title: 'Huruf'
    },
    {
      name: ROUTES.Leaderboard,
      icon: 'trophy-sharp',
      title: 'Board'
    },
    {
      name: ROUTES.Profile,
      icon: 'people-circle-sharp',
      title: 'Profile'
    },
  ]

  function goTo(name) {
    RootNavigation.navigate(name, {})
  }

  return (
    <View style={styles.container}>
      {
        MENUS.map(mn => {
          return (
            <Pressable
              key={mn.name}
              onPress={() => goTo(mn.name)}
              android_ripple={{ color: '#ccc' }}
              style={({pressed}) => pressed ? mainStyles.buttonPressed: {}}
            >
              <View
                style={styles.menuItem}
              >
              {
                mn.iconComponent ?
                <mn.iconComponent name={mn.icon} size={32} />
                :
                <Ionicons name={mn.icon} size={32} />
              }
              </View>
            </Pressable>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 90,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    ...mainSpace.m,
    marginTop: 16,
    borderRadius: mainBorder.borderRadius,
    width: 80,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
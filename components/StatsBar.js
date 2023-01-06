import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";
import { mainColor, mainText } from '@styles/Main.styles';
import { useContext } from 'react';
import { AuthContext } from 'store/auth-context';
import STRINGS from '@constants/strings/strings';
import { SettingsContext } from 'store/settings-context';

export default function StatsBar({
  style={},
  coverage
}) {
  const { user } = useContext(AuthContext)
  const { language } = useContext(SettingsContext)

  function textWithColor(color) {
    return  { textAlign: 'center' }
  }

  return (
  <View style={[styles.toolbar,style]}>
    <View style={styles.toolbarStat}>
      <View style={styles.statItem}>
        <Text style={[mainText.baseHeader, textWithColor(mainColor.primary800)]}>
          {user.xp || 0}
        </Text>
        <Text style={[mainText.baseInfo, textWithColor(mainColor.primary800)]}>XP</Text>
      </View>
      {/* <View style={styles.statItem}>
        <Text style={[mainText.baseHeader, textWithColor(mainColor.orange)]}>
          {0}
        </Text>
        <Text style={[mainText.baseInfo, textWithColor(mainColor.orange)]}>Streak</Text>
      </View> */}
      <View style={styles.statItem}>
        <Text style={[mainText.baseHeader, textWithColor(mainColor.primary500)]}>
          {coverage || 0}%
        </Text>
        <Text style={[mainText.baseInfo, textWithColor(mainColor.primary500)]}>Coverage</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[mainText.baseHeader, textWithColor(mainColor.red)]}>
        {user.health || 0}
        </Text>
        <Text style={[mainText.baseInfo, textWithColor(mainColor.red)]}>{STRINGS.health[language]}</Text>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    marginVertical: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  toolbarStat: {
    flexDirection: 'row',
  },
  statItem: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    flex: 1
  }
})
import STRINGS from "@constants/strings/strings";
import { mainShadow } from "@styles/Main.styles";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { SettingsContext } from "store/settings-context";

export default function SurahBox({
 surah={}
}) {
  const surahProgress = surah.progress
  const { language } = useContext(SettingsContext)

  function progressToColor(progress) {
    if(progress >= 100) return 'violet'
    else if(progress > 80) return 'green'
    else if(progress > 60) return 'orange'
    else if(progress > 30) return 'gold'
    return 'white'
  }

    function progressToCircleColor(progress) {
    if(progress >= 100) return 'violet'
    else if(progress > 80) return 'green'
    else if(progress > 60) return 'orange'
    else if(progress > 30) return 'gold'
    return 'grey'
  }

  return (
    <View
      style={[
        styles.surahBox,
        {borderColor: progressToColor(surahProgress || 0)}
      ]}
    >
      <Text style={styles.title}>{STRINGS.surah[language]} {surah?.title}</Text>
      <Text style={styles.title}>{surah?.titleAr}</Text>
      <Progress.Bar
        style={styles.progress}
        progress={(surahProgress || 0)/100}
        width={120}
        color={progressToCircleColor(surahProgress || 0)}
        borderWidth={2}
        showsText
        formatText={() => `${surahProgress || 0}%`}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  surahBox: {
    width: 150,
    height: 80,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...mainShadow,
    elevation: 4
  },
  title: {
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center'
  },
  progress: {
    margin: 4,
  },
})
import { mainShadow } from "@styles/Main.styles";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

export default function SurahBox({
 surah={}
}) {
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
        {borderColor: progressToColor(surah?.progress || 0)}
      ]}
    >
      <Text style={styles.title}>Surah {surah?.surah}</Text>
      <Progress.Bar
        style={styles.progress}
        progress={(surah?.progress || 0)/100}
        width={120}
        color={progressToCircleColor(surah?.progress || 0)}
        borderWidth={2}
        showsText
        formatText={() => `${surah?.progress || 0}%`}
      />
      {/* <Progress.Circle
        style={styles.progress}
        progress={surah.progress/100}
        size={80}
        color={progressToColor(surah.progress)}
        borderWidth={2}
        showsText
        formatText={() => `${surah.progress}%`}
      /> */}
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
    ...mainShadow
  },
  title: {
    fontWeight: '500',
    marginBottom: 4,
  },
  progress: {
    margin: 4,
  },
})
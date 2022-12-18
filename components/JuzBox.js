import { mainColor, mainShadow } from "@styles/Main.styles";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

export default function JuzBox({
  juz
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
        styles.juzBox,
        {borderColor: progressToColor(juz.progress)}
      ]}
    >
      <Text style={styles.title}>Juz {juz.juz}</Text>
      <Progress.Circle
        style={styles.progress}
        progress={juz.progress/100}
        size={80}
        color={progressToCircleColor(juz.progress)}
        borderWidth={2}
        showsText
        formatText={() => `${juz.progress}%`}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  juzBox: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...mainShadow
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: mainColor.black,
  },
  progress: {
    margin: 4,
  },
})
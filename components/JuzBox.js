import { mainColor, mainShadow } from "@styles/Main.styles";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import { progressToCircleColor, progressToColor } from "utils/helper";

export default function JuzBox({
  juz
}) {
  const progress = juz.progress || 0

  return (
    <View
      style={[
        styles.juzBox,
        {borderColor: progressToColor(progress)}
      ]}
    >
      <Text style={styles.title}>Juz {Number(juz.index)}</Text>
      <Progress.Circle
        style={styles.progress}
        progress={progress/100}
        size={80}
        color={progressToCircleColor(progress)}
        borderWidth={2}
        showsText
        formatText={() => `${progress}%`}
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
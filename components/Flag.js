import { mainBorder, mainColor } from "@styles/Main.styles";
import { StyleSheet, Text, View } from "react-native";

export default function Flag({
  text,
  style,
  color,
  backgroundColor,
  size
}) {
  return (
    <View
      style={[
        styles.statisticsBox,
        size === 'large' && {height: null, padding: 8, paddingHorizontal: 18},
        style,
        backgroundColor && {backgroundColor: backgroundColor, borderColor: backgroundColor}
      ]}>
      <Text
        style={[
          styles.statisticsTitle,
          size === 'large' && {fontSize: 20},
          color && {color: color}
        ]}
      >
        {text}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  statisticsBox: {
    ...mainBorder,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  statisticsTitle: {
    fontFamily: 'open-sans',
    color: mainColor.white,
    fontSize: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
import { mainBorder } from "@styles/Main.styles";
import { StyleSheet, Text, View } from "react-native";

export default function StatBox({
  value,
  title,
  style,
  color
}) {
  return (
    <View style={[styles.statisticsBox,style,color && {color: color, borderColor: color}]}>
      <Text style={[styles.statisticsValue,color && {color: color}]}>{value}</Text>
      <Text style={[styles.statisticsTitle,color && {color: color}]}>{title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  statisticsBox: {
    ...mainBorder,
    width: 160,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticsValue: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,

  },
  statisticsTitle: {
    marginLeft: 12,
    fontFamily: 'open-sans'
  },
})
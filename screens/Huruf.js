import FutureFeature from "@components/FutureFeature";
import { StyleSheet, Text, View } from "react-native";

export default function Huruf({
  navigation
}) {
  return (
    <View style={styles.container}>
      <FutureFeature />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingTop: 100,
    justifyContent: 'center' 
  }
})
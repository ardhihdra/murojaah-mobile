import { mainColor, mainShadow } from "@styles/Main.styles";
import { StyleSheet, Text, View } from "react-native";

export default function FutureFeature() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...mainShadow
  },
  text : {
    fontWeight: '600',
    fontSize: 18,
    elevation: 2,
    color: mainColor.darkGreen,
    shadowColor: 'white',
    shadowOpacity: .25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  }
})
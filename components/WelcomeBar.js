import { mainText } from "@styles/Main.styles";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "store/auth-context";

export default function WelcomeBar({}) {
  const { user } = useContext(AuthContext)

  return (<View style={styles.container}>
    <Text style={mainText.title}>Assalamualaikum,</Text>
    <Text style={mainText.title}>{user?.name || 'Fulan'}</Text>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginVertical: 16,
    marginHorizontal: 32,
  }
})
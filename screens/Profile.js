import FlatButton from "@components/FlatButton";
import mainStyles, { mainBorder, mainColor, mainShadow } from "@styles/Main.styles";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "store/auth-context";

export default function Profile({
  navigation
}) {
  const { logout: ctxLogout, user } = useContext(AuthContext)

  async function logout() {
    ctxLogout()
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.imageBox}>
          <Image alt='profile' />
        </View>
        <View style={styles.titleBox}>
          <Text style={mainStyles.heading}>Profile</Text>
        </View>
        <View >

        </View>
        <Text>{user.email}</Text>
        <Text>Ardhi Rofi Mufdhila</Text>
        <Text>Joined June 2020</Text>
        <Text>Indonesia</Text>
        <Text>6 Following</Text>
        <Text>2 Followers</Text>
        <Text>Email Verified : {user.emailVerified ? 'True': 'False'}</Text>
      </View>

      <View style={{ marginTop: 60 }}>
        <FlatButton onPress={logout} color={mainColor.primary500}>
          <Text>Log Out</Text>
        </FlatButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 36,
    paddingTop: 100,
  },
  imageBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileBox: {
    ...mainShadow,
    ...mainBorder,
    height: 300,
    padding: 30,
    backgroundColor: mainColor.misty,
  }
})
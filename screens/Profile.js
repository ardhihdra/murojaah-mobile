import { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { mainBorder, mainColor, mainShadow } from "@styles/Main.styles";
import FlatButton from "@components/FlatButton";
import { AuthContext } from "store/auth-context";
import StatBox from "@components/StatBox";
import MainButton from "@components/MainButton";
import FriendWidget from "@components/FriendWidget";
import { firestoreDb } from "db/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Input } from "@rneui/base";
import UsersWidget from "@components/UsersWidget";
import { useIsFocused } from "@react-navigation/native";

export default function Profile({
  navigation
}) {
  const { logout: ctxLogout, user, updateUserInfo } = useContext(AuthContext)
  const [search, setSearch] = useState()
  const isFocused = useIsFocused();

  useState(() => {
    updateUserInfo()
  }, [isFocused])

  async function logout() {
    ctxLogout()
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.imageBox}>
          <Image alt='profile' />
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.baseHeaderText}>Ardhi Rofi Mufdhila</Text>
          <Text style={[styles.baseInfo,{marginBottom: 8}]}>{user.email}</Text>
          <Text style={styles.baseText}>
            Joined {user.createdOn?.seconds && new Date(user.createdOn?.seconds*1000).toDateString()} 
          </Text>
          <Text style={styles.baseText}>6 Following | 2 Followers</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name="md-earth" size={18} color="black" />
            <Text style={[styles.baseText,{marginLeft: 4}]}>{user.country || 'Earth'}</Text>
          </View>
          {
            user.emailVerified && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <MaterialIcons name="verified" size={18} color={mainColor.blue} />
              <Text style={[styles.baseText,{marginLeft: 4}]}>Email Verified</Text>
            </View>
            )
          }
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.baseHeaderText}>Statistics</Text>
          <View style={styles.statisticsContainer}>
            <StatBox value={user.xp || 0} title='Experience' color={mainColor.primary}/>
            <StatBox value={user.dirham || 0} title='Dirham' style={{ marginLeft: 8 }} color={mainColor.primary800}/>
            <StatBox value={user.streak || 0} title='Streak' style={{ marginTop: 12, marginLeft: 80 }} color={mainColor.red}/>            
          </View>
        </View>

        <View style={styles.profileContainer}>
          <Text style={[styles.baseHeaderText,{marginBottom: 24}]}>Friends</Text>
          <Input
            placeholder={'Find users'}
            containerStyle={{}}
            inputContainerStyle={{}}
            inputStyle={{ fontSize: 16 }}
            leftIcon={{ type: 'fontisto', name: 'zoom', size: 16 }}
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
          {
            search ? (
              <UsersWidget search={search} />
            ): <FriendWidget />
          }
        </View>

        <View style={{ marginVertical: 32 }}>
          <FlatButton onPress={logout} color={mainColor.primary500}>
            <Text>Log Out</Text>
          </FlatButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    borderBottomWidth: 1,
    borderBottomColor: mainColor.misty,
    width: '100%',
    padding: 20
  },
  container: {
    width: '100%',
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
  },
  baseHeaderText: {
    color: mainColor.darkGrey,
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  baseInfo: {
    color: mainColor.grey,
    fontFamily: 'open-sans-bold',
    fontSize: 12,
  },
  baseText: {
    fontFamily: 'open-sans-bold',
    color: mainColor.darkGrey,
    fontSize: 12,
  },
  statisticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  }
})
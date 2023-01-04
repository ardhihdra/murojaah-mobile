import { useContext, useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { mainBorder, mainColor, mainShadow } from "@styles/Main.styles";
import FlatButton from "@components/FlatButton";
import { AuthContext } from "store/auth-context";
import StatBox from "@components/StatBox";
import MainButton from "@components/MainButton";
import FriendWidget from "@components/FriendWidget";
import { Input } from "@rneui/base";
import UsersWidget from "@components/UsersWidget";
import { useIsFocused } from "@react-navigation/native";
import { editUserData } from "@api/auth";
import { fetchFriendInfo } from "@api/friend";
import STRINGS from "@constants/strings/strings";
import { SettingsContext } from "store/settings-context";
import { ROUTES } from "@constants/routes";

export default function Profile({
  navigation
}) {
  const { logout: ctxLogout, user, updateUserInfo } = useContext(AuthContext)
  const { language } = useContext(SettingsContext)
  const [search, setSearch] = useState()
  const [editForm, setEditForm] = useState({
    name: user?.name
  })
  const [edit, setEdit] = useState(false)
  const [following, setFollowing] = useState(0)
  const [follower, setFollower] = useState(0)
  const isFocused = useIsFocused();

  useState(() => {
    if(isFocused) {
      updateUserInfo()
      fetchFriendInfo(user.uid).then(res => {
        setFollowing(res[0].length)
        setFollower(res[1].length)
      }).catch(err => {
        Alert.alert('Failed to get friends', err?.message)
      })
    }
  }, [isFocused])

  async function logout() {
    ctxLogout()
  }

  async function updateProfile() {
    await editUserData(user.uid, {
      name: editForm.name
    }).catch(err => {
      Alert.alert('Failed to edit', err?.message)
    })
    await updateUserInfo().catch(err => {
      Alert.alert('Something went wrong', err?.message)
    })
    setEdit(false)
  }

  async function donate() {
    navigation.navigate(ROUTES.Donate)
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.imageBox}>
          <Image alt='profile' />
        </View>
        <View style={styles.profileContainer}>
          <View style={{marginBottom: 8, flexDirection:'row', alignItems:'center'}}>
            <View>
              {
                edit ?
                <Input
                  placeholder={'Change Name'}
                  containerStyle={{ height: 40 }}
                  inputContainerStyle={{ width: 200, height: 30 }}
                  inputStyle={{ fontSize: 16 }}
                  onChangeText={(value) => setEditForm({...editForm, name: value})}
                  value={editForm.name}
                />
                :
                <>
                  <Text style={styles.baseHeaderText}>{user.name || 'Fulan'}</Text>
                  <Text style={[styles.baseInfo]}>{user.email}</Text>
                </>
              }
            </View>
            <Pressable style={{marginLeft:16}} onPress={() => setEdit(!edit)}>
              <MaterialIcons name={edit ? 'close': 'mode-edit'} size={18} color="black" />
            </Pressable>
            {
              edit && 
              <Pressable style={{marginLeft:12}} onPress={updateProfile}>
                <MaterialIcons name='check' size={18} color="black" />
              </Pressable>
            }
          </View>
          <Text style={styles.baseText}>
            Joined {user.createdOn?.seconds && new Date(user.createdOn?.seconds*1000).toDateString()} 
          </Text>
          <Text style={styles.baseText}>
            {following || 0} Following | {follower || 0} Followers
          </Text>
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
            <StatBox value={user.streak || 0} title='Streak' style={{ marginTop: 12 }} color={mainColor.red}/>            
          </View>
        </View>

        <View style={styles.profileContainer}>
          <Text style={[styles.baseHeaderText,{marginBottom: 24}]}>Friends</Text>
          <Input
            placeholder={'Find users'}
            autoCapitalize='none'
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

        <View style={{ marginVertical: 24, marginHorizontal: 24}}>
          <MainButton
            onPress={donate}
            style={{ marginVertical: 12 }}
          >
            {STRINGS.buy_me_coffee[language]}
          </MainButton>
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
    justifyContent: 'center'
  }
})
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MainButton from "./MainButton";
import { baseHeaderText, mainBorder, mainColor, mainShadow, mainText } from "@styles/Main.styles";
import { Fragment, useContext, useEffect, useState } from "react";
import { fetchFriendInfo } from "@api/friend";
import { AuthContext } from "store/auth-context";
import FriendItem from "./FriendItem";

export default function FriendWidget({
  style
}) {
  const [tab,setTab] = useState(0)
  const [following, setFollowing] = useState([])
  const [followed, setFollowed] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchFriendInfo(user.uid).then(res => {
      setFollowing(res[0])
      setFollowed(res[1])
    })
  }, [])

  const data = tab === 0 ? following: followed

  return (
    <View style={[styles.container,style]}>
      <View style={styles.header}>
        <Pressable onPress={() => setTab(0)}>
          <Text style={[mainText.baseHeader2, tab===0 && {color: mainColor.primary,...mainShadow}]}>
            FOLLOWING
          </Text>
        </Pressable>
        <Pressable onPress={() => setTab(1)}>
          <Text style={[mainText.baseHeader2, { marginLeft: 48 }, tab===1 && {color: mainColor.primary,...mainShadow}]}>
            FOLLOWERS
          </Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        <View style={{ alignItems: 'center' }}>
        {
          data.length ? (
            <ScrollView style={{ width: '100%' }}>
              {
                data.map(dmf => {
                  return (
                    <FriendItem key={dmf.followed+dmf.following} data={dmf}/>
                  )
                })
              }
            </ScrollView>
          )
          :(
            <Fragment>
              <Text style={[mainText.baseInfo]}>No one here yet!</Text>
              <Text style={[mainText.baseText]}>Learn and grow with your friends now</Text>
            </Fragment>
          )
        }
        {/* <MainButton style={{ marginTop: 24 }}>ADD FRIENDS</MainButton> */}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...mainBorder,
    paddingBottom: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    borderColor: mainColor.misty,
    borderBottomWidth: 1
  },
  list: {
    padding: 16
  }
})
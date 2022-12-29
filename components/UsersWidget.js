import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { mainBorder, mainColor, mainShadow, mainText } from "@styles/Main.styles";
import { Fragment, useContext, useEffect, useState } from "react";
import { fetchFindUsers, fetchFriendInfo } from "@api/friend";
import { AuthContext } from "store/auth-context";
import FriendItem from "./FriendItem";

export default function UsersWidget({
  style,
  search
}) {
  const [data, setData] = useState([])
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(search) {
        setLoading(true)
        fetchFindUsers(search.toLowerCase(), user.uid).then(res => {
          setData(res)
        }).finally(() => {
          setLoading(false)
        })
      }
    }, 1500)

    return () => {
      clearTimeout(debounce)
    }
  }, [search])

  return (
    <View style={[styles.container,style]}>
      <View style={styles.list}>
        <View style={{ alignItems: 'center' }}>
        {
          loading ?
          <ActivityIndicator size="small" />
          :
            data.length ? (
              <ScrollView style={{ width: '100%' }}>
                {
                  data.map(dmf => {
                    return (
                      <FriendItem key={dmf.uid} data={dmf}/>
                    )
                  })
                }
              </ScrollView>
            )
            :(
              <Fragment>
                <Text style={[mainText.baseInfo]}>No user found. Try with email or name.</Text>
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
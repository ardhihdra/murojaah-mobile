import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import Flag from "./Flag";
import { mainColor, mainText } from "@styles/Main.styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "store/auth-context";
import { addFriend, checkIsFriend } from "@api/friend";
import { Button, Dialog } from "@rneui/themed";

export default function FriendItem({
  data
}) {
  const [isFriend, setIsFriend] = useState()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    checkFriendship()
  }, [data])

  function checkFriendship() {
    setLoading(true)
    checkIsFriend(user.uid, data.uid).then(res => {
      setIsFriend(res)
    }).finally(() => {
      setLoading(false)
    })
  }

  async function onAddFriend() {
    addFriend(user.uid, data.uid).then(() => {
      checkFriendship()
      setVisible(true)
    }).catch(err => {
      console.error(err)
      Alert.alert('Error', err?.message)
    })
  }
  
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <View>
        <Text style={mainText.baseHeader2}>{data.name}</Text>
        <Text style={mainText.baseInfo}>{data.email}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Flag backgroundColor={mainColor.primary} text='Hafidz' />
        {
          loading ? 
            <ActivityIndicator size="small" />
          :
          (
            isFriend ? (
              <Flag
                backgroundColor={mainColor.primary500}
                style={{ marginLeft: 8 }}
                text='Friend' />
              )
              : (
                <Button
                  title=""
                  onPress={onAddFriend}
                  icon={{
                    name: 'person-add',
                    type: 'ionicons',
                    size: 12,
                    color: 'white',
                  }}
                  iconRight
                  iconContainerStyle={{ alignItems: 'center' }}
                  titleStyle={{ fontSize: 12 }}
                  buttonStyle={{
                    backgroundColor: mainColor.blue30,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                    paddingHorizontal: 0,
                    
                  }}
                  containerStyle={{
                    width: 32,
                    padding: 0,
                    marginHorizontal: 8,
                  }}
                />
              )
          )
        }
      </View>
      <Dialog
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <Dialog.Title title="Friends Added"/>
        <Text>Your're now following {data.name}</Text>
      </Dialog>
    </View>
  )
}
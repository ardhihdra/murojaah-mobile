import { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Linking, Alert } from "react-native";
import { Input } from '@rneui/themed';

import MainButton from "@components/MainButton";
import STRINGS from "@constants/strings/strings";
import { mainColor, mainText } from "@styles/Main.styles";
import { SettingsContext } from "store/settings-context";

const message = `Hi, I'd love to support it in any way I can!`;
const email = 'ardhi.rofi@gmail.com'
const subject = 'Contribute to Murojaah'
const phoneNumber = '+6285794158176';

export default function Donate({

}) {
  const [ammount, setAmmount] = useState(0)
  const { language } = useContext(SettingsContext)

  useEffect(() => {
    Linking.addEventListener('url', openWhatsapp)
    Linking.addEventListener('url', openEmail)
  })

  function donate() {
    Alert.alert('Future Feature!')
  }

  async function openEmail() {
    const url = `mailto: ${email}?subject=${subject}&body=${message}`
    const errMessage = "Can't Open Email"
    const isAvailable = await Linking.canOpenURL(url).catch(err => {
      Alert.alert(errMessage)
    })
    if(isAvailable) Linking.openURL(url);
    else {
      Alert.alert(errMessage)
      openWhatsapp()
    }
  }

  async function openWhatsapp() {
    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`
    const errMessage = "Can't Open Whatsapp"
    const isAvailable = await Linking.canOpenURL(url).catch(err => {
      Alert.alert(errMessage)
    })
    if(isAvailable) Linking.openURL(url);
    else Alert.alert(errMessage)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {STRINGS.donate[language]}
      </Text>
      <Text style={styles.text1}>
        {STRINGS.donation_copywriting[language]}
      </Text>
      <View style={styles.ammountContainer}>
        <MainButton
          flat
          style={styles.ammount}
          color={mainColor.primary}
          onPress={() => setAmmount(1)}
        >
          $1
        </MainButton>
        <MainButton
          flat
          style={styles.ammount}
          color={mainColor.primary}
          onPress={() => setAmmount(5)}
        >
          $5
        </MainButton>
      </View>
      <Input
          label="Your ammount (USD)"
          onChangeText={(value) => setAmmount(value)}
          value={ammount}
          placeholder='100'
          keyboardType='numeric'
        />
      <MainButton onPress={donate}>{STRINGS.donate[language]}</MainButton>
      <Text style={styles.or}>Or</Text>
      <MainButton style={{backgroundColor: mainColor.primary800}} onPress={openEmail}>
        Contact Us
      </MainButton>
      <Text style={styles.text2}>
        {STRINGS.donation_copywriting_2[language]}
      </Text>
      {/* <Text>{STRINGS.after_donate[language]}</Text> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    ...mainText.title,
    textAlign:'center',
    marginBottom: 16
  },
  text1: {
    ...mainText.baseHeader2,
    textAlign:'center'
  },
  text2: {
    ...mainText.baseText,
    textAlign:'center',
    marginVertical: 16,
  },
  or: {
    ...mainText.baseInfo,
    textAlign:'center',
    marginVertical: 16,
  },
  ammountContainer: {
    flexDirection:'row',
    justifyContent:'center',
    marginVertical: 24
  },
  ammount: {
    marginHorizontal: 16,
    height: 70,
    width: 70,
    justifyContent: 'center',
  }
})
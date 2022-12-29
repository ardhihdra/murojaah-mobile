import MainButton from "@components/MainButton";
import STRINGS from "@constants/strings/strings";
import { Button } from "@rneui/base";
import { mainColor } from "@styles/Main.styles";
import { Fragment, useContext } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { SettingsContext } from "store/settings-context";

export default function AnswerFeedback({
  modalVisible,
  onRequestClose,
  onSuccess,
  text='Correct!',
  type='success'
}) {
  const { language } = useContext(SettingsContext)
  if(!modalVisible) return <Fragment></Fragment>

  const isDanger = type === 'danger'

  function succesAction() {
    if(typeof onSuccess === 'function' && !isDanger) onSuccess()
    onRequestClose()
  }

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modalView, { backgroundColor: isDanger ? mainColor.error100: mainColor.neon}]}>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <Text style={[
            styles.text,
            {color: isDanger ? mainColor.error: mainColor.darkGreen}
          ]}>{text}</Text>
        </View>
        <MainButton
          onPress={succesAction}
          style={{ width: '100%', backgroundColor: isDanger ? mainColor.error: mainColor.secondary }}
        >
          {isDanger ? STRINGS.close[language]: STRINGS.continue[language]}
        </MainButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    position: 'static',
    width: '100%',
    bottom: 330,
  },
  text: { 
    textAlign: 'left',
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  modalView: {
    height: 124,
    borderRadius: 20,
    padding: 32,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})
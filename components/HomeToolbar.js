import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from "react-native";
import STRINGS from "@constants/strings/strings";
import { buttonPressed, mainColor, mainText } from '@styles/Main.styles';
import MainModal from './MainModal';
import { Picker } from '@react-native-picker/picker';
import { useContext, useRef, useState } from 'react';
import { SettingsContext } from 'store/settings-context';
import { LANGUAGES } from '@constants/types';
import { AuthContext } from 'store/auth-context';

export default function HomeToolbar({
  onRefresh
}) {
  const { language, setLanguage } = useContext(SettingsContext)
  const pickerRef = useRef();
  const [modalVisible, setModalVisible] = useState(false)
  const { user } = useContext(AuthContext)

  return (
  <View style={styles.toolbar}>
    <View style={styles.toolbarSetting}>
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <FontAwesome style={[{ marginHorizontal: 24 }]} name="language" size={20} color={mainColor.blue} />
        {/* <Text style={[mainText.baseHeader2, { marginHorizontal: 24 }]}>
          {STRINGS.language[language]}
        </Text> */}
      </Pressable>
      <Pressable
        onPress={onRefresh} 
        style={({ pressed }) => [
          pressed && buttonPressed,
        ]}
      >
        <View>
          <FontAwesome name="refresh" size={20} color={mainColor.secondary} />
        </View>
      </Pressable>
    </View>
    <MainModal
      visible={modalVisible}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <Picker
        selectedValue={language}
        style={{ height: 100, width: 120, marginHorizontal: 16 }}
        itemStyle={{ fontSize: 12, position: 'relative', bottom: 76 }} 
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
      >
      {
        Object.keys(LANGUAGES).map(lng => {
          return <Picker.Item key={lng} label={LANGUAGES[lng]} value={lng} />
        })
      }
      </Picker>
    </MainModal>
  </View>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    marginVertical: 4,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  toolbarSetting: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progress: {
    margin: 4,
  },
  tooltipText: {
    color: mainColor.white,
    marginBottom: 12,
    fontWeight: '600'
  },
})
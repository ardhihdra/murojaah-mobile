import MainModal from "@components/MainModal";
import { MAKHRAJS } from "@constants/learn";
import LEARN_STRINGS from "@constants/strings/learn";
import STRINGS from "@constants/strings/strings";
import { mainBorder, mainColor, mainText } from "@styles/Main.styles";
import { useContext, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SettingsContext } from "store/settings-context";

export default function Huruf({
  navigation
}) {
  const { language } = useContext(SettingsContext)
  const [shouldShow, setShouldShow] = useState(false)
  const [content, setContent] = useState()

  return (
    <View style={styles.container}>
      <View style={styles.makhraj}>
        <Text style={mainText.baseHeader}>Makharijul Huruf</Text>
        <Text style={[mainText.normal,{marginVertical:8}]}>{LEARN_STRINGS.makhraj_desc[language]}</Text>
        <ScrollView>
          <View style={styles.makhrajList}>
          {
            MAKHRAJS.map((mkj, idx) => {
              return (
                <Pressable
                  key={mkj.isolated}
                  style={styles.makhrajItem}
                  onPress={() => {
                    setContent(idx)
                    setShouldShow(true)
                  }}
                >
                  <Text style={styles.makhrajItemText}>
                    {mkj.isolated}
                  </Text>
                </Pressable>
              )
            })
          }
          </View>
        </ScrollView>
      </View>
      <MainModal
        visible={shouldShow}
        modalVisible={shouldShow}
        setModalVisible={setShouldShow}
      >
      {
        content >= 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text style={[mainText.baseHeaderArab,{alignSelf: 'center'}]}>
            - {MAKHRAJS[content]?.isolated} -
          </Text>
          <Text style={mainText.baseHeader}>{MAKHRAJS[content]?.name}</Text>
          <Text style={mainText.baseInfo}>
            {LEARN_STRINGS.transliteration[language]}: {MAKHRAJS[content]?.transliteration}
          </Text>
          <Text style={mainText.baseInfo}>
            {LEARN_STRINGS.writing[language]} {STRINGS.start[language]}:
            {MAKHRAJS[content]?.initial} - {STRINGS.middle[language]}: {MAKHRAJS[content]?.medial} - {STRINGS.end[language]}: {MAKHRAJS[content]?.final}
          </Text>
          <Text style={mainText.baseText}>{MAKHRAJS[content]?.sound[language]}</Text>
          <Text style={mainText.baseText}>{MAKHRAJS[content]?.pronunciation[language]}</Text>
        </View>
        ): <></>
      }
      </MainModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 100,
    padding: 12
  },
  makhraj: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: mainColor.grey
  },
  makhrajList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 40,
    paddingBottom: 12,
    justifyContent: 'center',
  },
  makhrajItem: {
    ...mainBorder,
	  borderRadius: 24,
    backgroundColor: mainColor.white,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  makhrajItemText: {
    ...mainText.baseHeaderArab,
  }
})
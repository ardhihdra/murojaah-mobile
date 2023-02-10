import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { fetchSurahProgress } from "@api/surah";
import { mainColor, mainShadow } from "../styles/Main.styles";
import SurahBox from "@components/SurahBox";
import { AuthContext } from "store/auth-context";
import MainTooltip from "@components/MainTooltip";
import MainButton from "@components/MainButton";
import STRINGS from "@constants/strings/strings";
import { SettingsContext } from "store/settings-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ROUTES } from "@constants/routes";

export default function SurahList({
  surahData=[]
}) {
  const navigation = useNavigation()
  const [shouldShow, setShouldShow] = useState('')
  const { token, logout } = useContext(AuthContext)
  const {
    setShowBottomBar, language, gLoading, setGLoading
  } = useContext(SettingsContext)

  if(!token) {
    Alert.alert('Token Expired')
    logout()
  }

  useFocusEffect(() => {
    setShowBottomBar(true)
  })

  function goToQuiz(id) {
    navigation.navigate(ROUTES.Quiz, { surahId: id })
  }

  return (
    <View style={styles.surahListContainer}>
      {
        surahData.map(jz => {
          return (
            <MainTooltip
              key={jz.index}
              height={120}
              visible={shouldShow === jz.index}
              popover={
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.tooltipText}>Surah {jz.title}</Text>
                  <Text style={styles.tooltipText}>{Number(jz.progress).toFixed(2)}%</Text>
                  <MainButton onPress={() => {
                    goToQuiz(jz.index)
                    setShouldShow('')
                  }}
                  >
                    {STRINGS.continue_learning[language]}
                  </MainButton>
                </View>
              }
              onOpen={() => setShouldShow(jz.index)}
              onClose={() => setShouldShow('')}
            >
              <SurahBox surah={jz} />
            </MainTooltip>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  surahContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor.white,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    ...mainShadow,
  },
  surahListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'stretch',
  },
  tooltipText: {
    color: mainColor.white,
    marginBottom: 12,
    fontWeight: '600'
  },
})
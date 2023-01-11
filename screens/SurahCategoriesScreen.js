import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert, SafeAreaView, Dimensions } from "react-native";
import { fetchSurahProgress } from "@api/surah";
import { mainColor, mainShadow, mainSpace } from "../styles/Main.styles";
import SurahBox from "@components/SurahBox";
import { AuthContext } from "store/auth-context";
import MainTooltip from "@components/MainTooltip";
import MainButton from "@components/MainButton";
import STRINGS from "@constants/strings/strings";
import { SettingsContext } from "store/settings-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ROUTES } from "@constants/routes";
import HomeToolbar from "@components/HomeToolbar";
import StatsBar from "@components/StatsBar";

export default function SurahCategoriesScreen({
  navigation,
  route
}) {
  const [surahData, setSurahData] = useState([])
  const [shouldShow, setShouldShow] = useState('')
  const { user, token, updateUserInfo, logout } = useContext(AuthContext)
  const {
    setShowBottomBar, language, gLoading, setGLoading
  } = useContext(SettingsContext)
  const isFocused = useIsFocused();

  if(!token) {
    Alert.alert('Token Expired')
    logout()
  }

  useFocusEffect(() => {
    setShowBottomBar(true)
  })

  useEffect(() => {
    if(user) {
      setGLoading(true)
      // updateUserInfo()
      getSurahData().finally(() => setGLoading(false))
    }
  }, [isFocused])

  async function getSurahData() {
    if(user?.uid) {
      const data = await fetchSurahProgress(user.uid)
      setSurahData(data)
    }
  }

  function goToQuiz(id) {
    navigation.navigate(ROUTES.Quiz, { surahId: id })
  }

  function getCoverage() {
    let result = 0
    surahData.map(sr => {
      result += Number(sr.progress || 0)
    })
    return (result/(surahData.length || 1)).toFixed(2)
  }

  return (
    <SafeAreaView style={[styles.container,mainSpace.safeArea]}>
      <ScrollView>
        <HomeToolbar onRefresh={getSurahData} />
        <StatsBar style={{ marginVertical: 24 }} coverage={getCoverage()}/>
        {
          gLoading && <ActivityIndicator size='large'/>
        }
        <View
          style={[
            styles.surahContainer,
            !surahData.length && {minHeight: Dimensions.get('window').height}
          ]}>
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
                // <Pressable
                //   key={jz.index}
                //   // onPress={() => goTosurahOverview(jz.id)}
                //   android_ripple={{ color: '#ccc' }}
                //   style={({pressed}) => (
                //     [styles.button, pressed ? mainStyles.buttonPressed: null]
                //   )}
                // >
                //   <SurahBox surah={jz} />
                // </Pressable>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
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
  tooltipText: {
    color: mainColor.white,
    marginBottom: 12,
    fontWeight: '600'
  },
})
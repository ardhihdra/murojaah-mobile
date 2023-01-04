import { useContext, useEffect, useState } from "react"
import { 
  Dimensions, ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View
} from "react-native"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { fetchJuzProgress } from "@api/juz";
import JuzBox from "../components/JuzBox";
import { ROUTES } from "../constants/routes";
import { mainColor, mainShadow, mainSpace } from "../styles/Main.styles";
import { AuthContext } from "store/auth-context";
import MainTooltip from "@components/MainTooltip";
import MainButton from "@components/MainButton";
import { SettingsContext } from "store/settings-context";
import STRINGS from "@constants/strings/strings";
import HomeToolbar from "@components/HomeToolbar";
import WelcomeBar from "@components/WelcomeBar";
import StatsBar from "@components/StatsBar";

export default function JuzCategoriesScreen({ navigation, route }) {
  const [juz, setJuz] = useState([{index:'01'}])
  const { user, updateUserInfo } = useContext(AuthContext)
  const [shouldShow, setShouldShow] = useState('')
  const {
    setShowBottomBar, language, gLoading, setGLoading
  } = useContext(SettingsContext)
  const isFocused = useIsFocused();

  useFocusEffect(() => {
    setShowBottomBar(true)
  })

  useEffect(() => {
    if(user && user.uid && isFocused) {
      setGLoading(true)
      getJuzProgress().catch(err => {
        Alert.alert('Error getJuzProgress', err?.message)
      }).finally(() => {
        setGLoading(false)
      })
    }
  }, [isFocused, user])

  useEffect(() => {
    if(isFocused) {
      setGLoading(true)
      updateUserInfo().catch(err => {
        Alert.alert('Error updateUserInfo', err?.message)
      }).finally(() => {
        setGLoading(false)
      })
    }
  }, [isFocused]) 

  async function getJuzProgress() {
    if(user?.uid) {
      const result = await fetchJuzProgress(user.uid).catch(err => {
        Alert.alert('Error', err?.message)
      })
      setJuz(result)
    }
  }

  function goToQuiz(id) {
    navigation.navigate(ROUTES.Quiz, { juzId: id })
  }

  function getCoverage() {
    let result = 0
    juz.map(jz => {
      result += Number(jz.progress || 0)
    })
    return (result/(juz.length || 1)).toFixed(2)
  }

  if(!user) return <></>

  return (
    <SafeAreaView style={[styles.container,mainSpace.safeArea]}>
      <ScrollView>
        <HomeToolbar onRefresh={getJuzProgress} />
        <WelcomeBar />
        <StatsBar coverage={getCoverage()} />
        {
          gLoading && <ActivityIndicator size='large'/>
        }
        <View
          style={[
            styles.juzContainer,
            !juz.length && {minHeight: Dimensions.get('window').height}
          ]}
        >
          {
            juz.map(jz => {
              return (
                <MainTooltip
                  key={jz.index}
                  visible={shouldShow === jz.index}
                  popover={
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.tooltipText}>
                        Juz {Number(jz.index)}
                      </Text>
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
                  <JuzBox juz={jz} />
                </MainTooltip>
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
  },
  juzContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: mainColor.white,
    ...mainShadow,
    alignItems:'center',
    alignSelf:'stretch',
    // minHeight: 550
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
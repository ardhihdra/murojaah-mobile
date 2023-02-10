import { useContext, useEffect, useState } from "react"
import { 
  Dimensions, ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View
} from "react-native"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { fetchJuzProgress } from "@api/juz";
import { mainColor, mainShadow, mainSpace, mainText } from "../styles/Main.styles";
import { AuthContext } from "store/auth-context";
import { SettingsContext } from "store/settings-context";
import STRINGS from "@constants/strings/strings";
import HomeToolbar from "@components/HomeToolbar";
import WelcomeBar from "@components/WelcomeBar";
import StatsBar from "@components/StatsBar";
import { Switch } from "@rneui/base";
import JuzList from "@components/JuzList";
import SurahList from "@components/SurahList";
import { fetchSurahProgress } from "@api/surah";
import LEARN_STRINGS from "@constants/strings/learn";

export default function JuzCategoriesScreen({ navigation, route }) {
  const [juz, setJuz] = useState([])
  const [surahData, setSurahData] = useState([])
  const { user, updateUserInfo } = useContext(AuthContext)
  const [shouldShow, setShouldShow] = useState('')
  const {
    setShowBottomBar, language, gLoading, setGLoading
  } = useContext(SettingsContext)
  const isFocused = useIsFocused();
  const [isLearnSurah, setIsLearnSurah] = useState(false);
  const toggleSwitch = () => setIsLearnSurah(previousState => !previousState);

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
      getSurahData().finally(() => setGLoading(false))
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

  async function getSurahData() {
    if(user?.uid) {
      const data = await fetchSurahProgress(user.uid)
      setSurahData(data)
    }
  }

  function getCoverage() {
    let result = 0
    if (isLearnSurah) {
      surahData.map(sr => {
        result += Number(sr.progress || 0)
      })
      return (result/(surahData.length || 1)).toFixed(2)
    } else {
      juz.map(jz => {
        result += Number(jz.progress || 0)
      })
      return (result/(juz.length || 1)).toFixed(2)
    }
  }

  if(!user) return <></>

  return (
    <SafeAreaView style={[styles.container,mainSpace.safeArea]}>
      <ScrollView>
        <HomeToolbar onRefresh={getJuzProgress} />
        <WelcomeBar />
        <StatsBar coverage={getCoverage()} />
        <View
          style={[
            styles.juzContainer,
            (!juz.length || gLoading) && {minHeight: Dimensions.get('window').height}
          ]}
        >
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            // thumbColor={isLearnSurah ? '#f5dd4b' : '#f4f3f4'}
            thumbColor={isLearnSurah ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLearnSurah}
          />
          <Text style={mainText.baseHeader}>
            {isLearnSurah ? LEARN_STRINGS.learn_by_surah[language]: LEARN_STRINGS.learn_by_juz[language]}
          </Text>
          {
            gLoading && <ActivityIndicator size='large'/>
          }
          {
            isLearnSurah ? <SurahList surahData={surahData} /> : <JuzList juz={juz} />
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
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: mainColor.white,
    ...mainShadow,
    // minHeight: 550
  },
  juzListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'stretch',
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
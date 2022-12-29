import { useContext, useEffect, useRef, useState } from "react"
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { fetchJuzProgress } from "@api/juz";
import JuzBox from "../components/JuzBox";
import { ROUTES } from "../constants/routes";
import { mainColor } from "../styles/Main.styles";
import { AuthContext } from "store/auth-context";
import MainTooltip from "@components/MainTooltip";
import MainButton from "@components/MainButton";
import { SettingsContext } from "store/settings-context";
import STRINGS from "@constants/strings/strings";
import HomeToolbar from "@components/HomeToolbar";

export default function JuzCategoriesScreen({ navigation, route }) {
  const [juz, setJuz] = useState([])
  const { user, updateUserInfo } = useContext(AuthContext)
  const [shouldShow, setShouldShow] = useState('')
  const {
    setShowBottomBar, language, gLoading, setGLoading
  } = useContext(SettingsContext)
  const isFocused = useIsFocused();

  if(!user?.uid) navigation.navigate(ROUTES.SignIn, {})
  
  useFocusEffect(() => {
    setShowBottomBar(true)
  })

  useEffect(() => {
    if(user) {
      setGLoading(true)
      updateUserInfo()
      getJuzProgress().finally(() => {
        setGLoading(false)
      })
    }
  }, [isFocused])

  async function getJuzProgress() {
    if(user?.uid) {
      const result = await fetchJuzProgress(user.uid)
      setJuz(result)
    }
  }

  function goToQuiz(id) {
    navigation.navigate(ROUTES.Quiz, { juzId: id })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <HomeToolbar onRefresh={getJuzProgress} />
        {
          gLoading && <ActivityIndicator size='large'/>
        }
        <View style={[styles.juzContainer]}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toolkit: {
    marginVertical: 8,
    marginHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  juzContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
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
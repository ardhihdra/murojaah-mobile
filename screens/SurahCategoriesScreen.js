import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import { fetchSurahProgress } from "@api/surah";
import mainStyles, { mainColor } from "../styles/Main.styles";
import SurahBox from "@components/SurahBox";
import { AuthContext } from "store/auth-context";
import MainTooltip from "@components/MainTooltip";
import MainButton from "@components/MainButton";
import STRINGS from "@constants/strings/strings";
import { SettingsContext } from "store/settings-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ROUTES } from "@constants/routes";
import HomeToolbar from "@components/HomeToolbar";

export default function SurahCategoriesScreen({
  navigation,
  route
}) {
  const [surahData, setSurahData] = useState([])
  const [shouldShow, setShouldShow] = useState('')
  const { user, updateUserInfo } = useContext(AuthContext)
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

  return (
    <View style={styles.container}>
      <HomeToolbar onRefresh={getSurahData} />
      {
        gLoading && <ActivityIndicator size='large'/>
      }
      <ScrollView>
        <View style={styles.surahContainer}>
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
    </View>
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
    marginTop: 10,
    marginBottom: 40,
  },
  tooltipText: {
    color: mainColor.white,
    marginBottom: 12,
    fontWeight: '600'
  },
})
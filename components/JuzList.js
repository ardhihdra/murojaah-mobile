import { useContext, useState } from "react"
import { 
  StyleSheet, Text, View
} from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import JuzBox from "../components/JuzBox";
import { ROUTES } from "../constants/routes";
import { mainColor } from "../styles/Main.styles";
import { AuthContext } from "store/auth-context";
import MainTooltip from "@components/MainTooltip";
import MainButton from "@components/MainButton";
import { SettingsContext } from "store/settings-context";
import STRINGS from "@constants/strings/strings";

export default function JuzList({ juz=[] }) {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()
  const [shouldShow, setShouldShow] = useState('')
  const {
    setShowBottomBar, language
  } = useContext(SettingsContext)

  useFocusEffect(() => {
    setShowBottomBar(true)
  })

  function goToQuiz(id) {
    navigation.navigate(ROUTES.Quiz, { juzId: id })
  }

  if(!user) return <></>

  return (
    <View style={styles.juzListContainer}>
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
  )
}

const styles = StyleSheet.create({
  juzListContainer: {
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
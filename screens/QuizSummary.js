import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import MainButton from "@components/MainButton";
import { ROUTES } from "@constants/routes";
import { saveAyahProgress, saveSurahProgress, saveWrongProgress } from "@api/progress";
import { AuthContext } from "store/auth-context";
import { updateXP } from "@api/user";
import StatInCircle from "@components/StatInCircle";
import { mainColor } from "@styles/Main.styles";
import QUIZ_STRINGS from "@constants/strings/quiz";
import { SettingsContext } from "store/settings-context";
import STRINGS from "@constants/strings/strings";

export default function QuizSummary({
  navigation,
  route,
}) {
  const { user } = useContext(AuthContext)
  const { language } = useContext(SettingsContext)
  const { 
    questionLength,
    title,
    trial,
  } = route.params;
  const correct = JSON.parse(route.params?.correct || '{}')
  const wrong = JSON.parse(route.params?.wrong || '{}')
  const xp = correct.length*10

  useEffect(() => {
    (correct || []).map(cr => {
      const indexes = cr.split(':')
      saveSurahProgress(user.uid, user.email, indexes[0], indexes[1], indexes[2], 5)
      saveAyahProgress(user.uid, indexes[0], indexes[1], indexes[2], 10)
      updateXP(user.uid, xp)
    });
    (wrong || []).map(wr => {
      saveWrongProgress(user.uid, wr.id, wr.type, wr.answered, wr.options)
    });
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>{QUIZ_STRINGS.lesson_complete[language]}!</Text>
        <Text style={styles.summaryText}>
          {`${STRINGS.learning[language]} ${title}`} 
        </Text>
      </View>
      {/* <Image
        source={require('../assets/image/alhamdulillah.png')}
        style={{ height: 120, width: 180, marginTop: 30, alignSelf: 'center' }} /> */}
      <View style={styles.bottomContainer}>
        <View style={styles.statBox}>
          <StatInCircle
            title={QUIZ_STRINGS.total_attempt[language]}
            value={`${trial}/${questionLength}`}
            color={mainColor.orange}/>
          <StatInCircle
            title={QUIZ_STRINGS.total_correct_answer[language]}
            value={correct.length} color={mainColor.secondary}/>
          <StatInCircle
            title={QUIZ_STRINGS.xp_gained[language]}
            value={xp}
            color={mainColor.tertiary}/>
        </View>
        <MainButton onPress={() => navigation.navigate(ROUTES.JuzCategories, { refresher: Math.random() })}>
          {STRINGS.back_to_home[language]}
        </MainButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    flex: 1,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: mainColor.secondary,
  },
  summaryBox: {
    margin: 30,
    justifyContent: 'center',
  },
  statBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 120
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
  }
})
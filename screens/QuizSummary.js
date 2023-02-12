import { useContext, useEffect } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";

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
import { useIsFocused } from "@react-navigation/native";
import { QUESTION_TYPES } from "@constants/types";

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
      saveSurahProgress(user.uid, user.email, indexes[0], indexes[1], indexes[2], 5).catch(err => {
        Alert.alert('Error surah progress', err?.message)
      })
      saveAyahProgress(user.uid, indexes[0], indexes[1], indexes[2], 10).catch(err => {
        Alert.alert('Error ayah progress', err?.message)
      })
      updateXP(user.uid, xp)
    });
    (wrong || []).map(wr => {
      const options = wr.type === QUESTION_TYPES.CONSTRUCT_AYAH ?
        [...wr.quranQuestion, ...wr.words] :
        wr.options
      saveWrongProgress(user.uid, wr.id, wr.type, wr.answered, options).catch(err => {
        Alert.alert('Error wrong progress', err?.message)
      })
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
      <Text style={styles.alhamdulillah}>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ</Text>
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
  },
  alhamdulillah: {
    fontSize: 44,
    fontWeight: '800',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 32,
  }
})
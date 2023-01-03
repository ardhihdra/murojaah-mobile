import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Constants from 'expo-constants';

import { getJuzQuestion, getSurahQuestion } from "@api/question";
import MainButton from "@components/MainButton";
import LoadingOverlay from "@components/LoadingOverlay";
import { ROUTES } from "@constants/routes";
import { useFocusEffect } from "@react-navigation/native";
import { mainColor } from "@styles/Main.styles";
import * as Progress from 'react-native-progress';
import { SettingsContext } from "store/settings-context";
import AnswerFeedback from "./Quiz/AnswerFeedback";
import QUIZ_STRINGS from "@constants/strings/quiz";
import STRINGS from "@constants/strings/strings";
import surahData from '../constants/surah.json';
import { QUESTION_TYPES } from "@constants/types";
import MultipleChoice from "./Quiz/MultipleChoice";
import ConstructAyah from "./Quiz/ConstructAyah";


export default function Quiz({
  route,
  navigation
}) {
  const TOTAL_QUESTION = 5
  const { juzId, surahId } = route.params || {};
  const { setShowBottomBar, language } = useContext(SettingsContext)
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [userAnswer, setUserAnswer] = useState()
  const [isCorrect, setIsCorrect] = useState(false)
  const [totalCorrect, setTotalCorrect] = useState([])
  const [totalWrong, setTotalWrong] = useState([])
  const [totalTrial, setTotalTrial] = useState(0)
  const [hasFailed, setHasFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [answerFeedback, setAnswerFeedback] = useState()
  const scrollRef = useRef();

  useFocusEffect(() => {
    setShowBottomBar(false)
  })

  useEffect(() => {

  }, [])

  useEffect(() => {
    setLoading(true)
    if(juzId) {
      getJuzQuestion(juzId, TOTAL_QUESTION).then(res => {
        setQuestions(res)
      }).catch(err => {
        Alert.alert('Error', err?.message)
      }).finally(() => {
        setLoading(false)
      })
    } else if(surahId) {
      getSurahQuestion(surahId, TOTAL_QUESTION).then(res => {
        setQuestions(res)
      }).catch(err => {
        Alert.alert('Error', err?.message)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [])
 
  const qs = questions[currentIdx] || {}
  const total_questions_fetched = Math.min(TOTAL_QUESTION, questions.length)

  function onCheckAnswer() {
    let result = false
    if(qs.type === QUESTION_TYPES.AYAH_AFTER) result = checkAyahAfter()
    if(qs.type === QUESTION_TYPES.CONSTRUCT_AYAH) result = checkConstructAnswer()
    setIsCorrect(result)
    setTotalTrial(totalTrial+1)
    if(result) {
      setAnswerFeedback(QUIZ_STRINGS.correct[language]+'!')
      if(!hasFailed) setTotalCorrect([...totalCorrect, qs.id])
    } else {
      setHasFailed(true)
      setAnswerFeedback(QUIZ_STRINGS.wrong_answer[language]+' :(')
      setTotalWrong([
        ...totalWrong,
        {
          ...qs,
          answered: userAnswer,
        }
      ])
    }
  }

  function checkConstructAnswer() {
    let result = true
    for(let [idx,ua] of userAnswer.entries()) {
      if(ua !== idx) result = false
    }
    return result
  }

  function checkAyahAfter() {
    return userAnswer === qs.answer
  }

  function resetState() {
    setAnswerFeedback()
    setUserAnswer()
    setIsCorrect(false)
    setHasFailed(false)
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  function onContinue() {
    resetState()
    setCurrentIdx(currentIdx+1)
    if(currentIdx+1 >= total_questions_fetched) {
      navigation.navigate(ROUTES.QuizSummary, { 
        questionLength: questions.length,
        correct: JSON.stringify(totalCorrect),
        wrong: JSON.stringify(totalWrong),
        trial: totalTrial,
        title: juzId ? `Juz ${juzId}`: `Surah ${surahData[Number(surahId)-1].title}`,
      })
    }
  }

  return loading ? 
    <LoadingOverlay message="Loading Quiz..." />
  :
  (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.progress}>
        <View style={styles.progressBox}>
          <Progress.Bar
            progress={currentIdx/total_questions_fetched}
            backgroundColor={mainColor.white}
            color={mainColor.secondary}
            width={320}
            height={20} />
        </View>
      </View>
      
      <ScrollView style={{ height: '100%' }} ref={scrollRef}>
        <View style={styles.questionBox}>
          <View style={{ marginBottom: 48 }}>
            {
              qs.type === QUESTION_TYPES.AYAH_AFTER &&
                <MultipleChoice data={qs} userAnswer={userAnswer} setUserAnswer={setUserAnswer} isCorrect={isCorrect} />              
            }
            {
              qs.type === QUESTION_TYPES.CONSTRUCT_AYAH &&
                <ConstructAyah data={qs} userAnswer={userAnswer} setUserAnswer={setUserAnswer}/>
            }
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonBottom}>
        <MainButton
          onPress={onCheckAnswer}
          disabled={(!userAnswer && userAnswer !== 0 || isCorrect)}
          style={{ marginBottom: 16 }}
        >
          {STRINGS.check[language].toUpperCase()}
        </MainButton>
        {isCorrect && <MainButton
          onPress={onContinue}
        >
          {STRINGS.continue[language].toUpperCase()}
        </MainButton>}
      </View>
      <AnswerFeedback
        modalVisible={!!answerFeedback}
        text={answerFeedback}
        onSuccess={onContinue}
        type={isCorrect ? 'success': 'danger'}
        onRequestClose={() => setAnswerFeedback()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0 
  },
  progress: {
    width: '100%',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: mainColor.misty,
    backgroundColor: mainColor.white,
    justifyContent: 'center',
    marginBottom: 24
  },
  progressBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
  },
  questionBox: {
    margin: 24,
    flex: 1,
    paddingBottom: 150,
  },
  error: {
    color: mainColor.error500,
    marginTop: 8,
    textAlign: 'center'
  },
  buttonBottom: {
    marginBottom: 24,
    position: 'static',
    borderTopWidth: 1,
    borderTopColor: mainColor.misty,
    backgroundColor: mainColor.white,
    bottom: 180,
    height: 140,
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  }
})
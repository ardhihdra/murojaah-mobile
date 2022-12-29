import Flag from "@components/Flag"
import QUIZ_STRINGS from "@constants/strings/quiz"
import { mainBorder, mainColor, mainShadow, mainText } from "@styles/Main.styles"
import { useContext, useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { SettingsContext } from "store/settings-context"

export default function ConstructAyah({
  data,
  userAnswer,
  setUserAnswer
}) {
  const [words, setWords] = useState([])
  const [options, setOptions] = useState([])
  const { language } = useContext(SettingsContext)

  useEffect(() => {
    setOptions(data.quranQuestion || [])
    setWords([])
  }, [data])

  useEffect(() => {
    if(words.length === data.quranQuestion.length) {
      setUserAnswer(words)
    }
  }, [words])

  function addAnswer(answer, idx) {
    let newOptions = [...options]
    newOptions.splice(idx,1)
    setOptions(newOptions)
    setWords([...words, answer])
  }

  function removeAnswer(idx) {
    let newWords = [...words]
    const removed = newWords.splice(idx,1)
    setWords(newWords)
    setOptions([...options, removed[0]])
  }

  return <>
    <Text style={styles.question}>
      {QUIZ_STRINGS[data.question] ? QUIZ_STRINGS[data.question][language]: ''}
    </Text>
    <View style={styles.wordsQuestion}>
      {
        options.map((dqq,idx) => {
          return (
            <Pressable
              key={dqq}
              onPress={() => addAnswer(dqq, idx)}
              style={{...mainShadow, margin: 4}}
            >
              <Flag
                backgroundColor={mainColor.white}
                color={mainColor.black}
                style={{ marginLeft: 8 }}
                text={data.words[dqq]}
                size='large' />
            </Pressable>
          )
        })
      }
    </View>
    <Text style={mainText.baseHeader2}>Answer: </Text>
    <View style={styles.wordsAnswer}>
      {
        words.map((dqq,idx) => {
          return (
            <Pressable
              key={dqq}
              onPress={() => removeAnswer(idx)}
              style={{...mainShadow, margin: 4}}
            >
              <Flag
                backgroundColor={mainColor.white}
                color={mainColor.black}
                text={data.words[dqq]}
                size='large' />
            </Pressable>
          )
        })
      }
    </View>
  </>
}


const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    ...mainText.baseHeader2
  },
  quranQuestion: {
    fontSize: 32,
    fontWeight: '600',
    marginVertical: 16,
    textAlign: 'right'
  },
  optionBox: {
    backgroundColor: mainColor.white,
    ...mainBorder,
    marginVertical: 8,
    padding: 16,
  },
  option: {
    fontSize: 20,
    textAlign: 'right'
  },
  wordsQuestion: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    margin: 12,
  },
  wordsAnswer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'left',
    marginVertical: 16,
  }
})
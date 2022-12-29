import QUIZ_STRINGS from "@constants/strings/quiz"
import { mainBorder, mainColor } from "@styles/Main.styles"
import { Fragment, useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { SettingsContext } from "store/settings-context"

const ALPHABET = ['A','B','C','D','E'] 

export default function MultipleChoice({
  data,
  userAnswer,
  setUserAnswer,
  isCorrect
}) {
  const { language } = useContext(SettingsContext)

  if(!data) data = {}

  return (
    <Fragment>
      <Text style={styles.question}>
        {QUIZ_STRINGS[data.question] ? QUIZ_STRINGS[data.question][language]: ''}
      </Text>
      <Text style={styles.quranQuestion}>{data.quranQuestion}</Text>
      <View>
        {
          (data.options || []).map((qso,idx) => {
            return (
              <Pressable
                key={Math.random()}
                onPress={() => setUserAnswer(idx)}
              >
                <View
                  style={[
                    styles.optionBox,
                    { backgroundColor: idx === userAnswer ? 
                        (isCorrect ? mainColor.neon: mainColor.primary100)
                      : '' }
                  ]}
                >
                  <Text style={styles.option}>{ALPHABET[idx]}. {qso}</Text>
                </View>
              </Pressable>
            )
          })
        }
      </View>
    </Fragment>
  )
}


const styles = StyleSheet.create({
  question: {
    fontSize: 16,
  },
  quranQuestion: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 14,
    padding: 4,
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
})
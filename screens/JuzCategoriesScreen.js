import { fetchJuzProgress } from "@api/juz";
import { useEffect, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import JuzBox from "../components/JuzBox";
import { ROUTES } from "../constants/routes";
import mainStyles, { mainButtonPressed } from "../styles/Main.styles";

export default function JuzCategoriesScreen({ navigation }) {
  const [juz, setJuz] = useState([])
  
  useEffect(() => {
    getJuzProgress()
  }, [])

  async function getJuzProgress() {
    const result = await fetchJuzProgress()
    setJuz(result)
  }

  function progressToColor(progress) {
    if(progress >= 100) return 'violet'
    else if(progress > 80) return 'green'
    else if(progress > 60) return 'orange'
    else if(progress > 30) return 'gold'
    return 'grey'
  }

  function goToJuzOverview(id) {
    navigation.navigate(ROUTES.JuzOverview, { id: id })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.juzContainer}>
          {
            juz.map(jz => {
              return (
                <Pressable
                  key={jz.id}
                  onPress={() => goToJuzOverview(jz.id)}
                  android_ripple={{ color: '#ccc' }}
                  style={({pressed}) => (
                    [styles.button, pressed ? mainStyles.buttonPressed: null]
                  )}
                >
                  <JuzBox juz={jz} />
                </Pressable>
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
    paddingTop: 40,
  },
  juzContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    margin: 4,
  },
})
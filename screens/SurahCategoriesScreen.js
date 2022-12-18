import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { fetchSurahProgress } from "@api/juz";
import mainStyles from "../styles/Main.styles";
import SurahBox from "@components/SurahBox";

export default function SurahCategoriesScreen({
  navigation
}) {
  const [surahData, setSurahData] = useState([])

  useEffect(() => {
    getSurahData()
  }, [])

  async function getSurahData() {
    const data = await fetchSurahProgress()
    setSurahData(data)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.surahContainer}>
          {
            surahData.map(jz => {
              return (
                <Pressable
                  key={jz.id}
                  // onPress={() => goTosurahOverview(jz.id)}
                  android_ripple={{ color: '#ccc' }}
                  style={({pressed}) => (
                    [styles.button, pressed ? mainStyles.buttonPressed: null]
                  )}
                >
                  <SurahBox surah={jz} />
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
    width: '100%',
    paddingTop: 40,
  },
  surahContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { fetchSurahByJuz } from "@api/juz";
import mainStyles from "../styles/Main.styles";
import SurahBox from "@components/SurahBox";

export default function JuzOverviewScreen({
  route,
  navigation
}) {
  const { id } = route.params;
  const [juzData, setData] = useState([])

  useEffect(() => {
    getJuzData()
  }, [])

  async function getJuzData() {
    const data = await fetchSurahByJuz(id)
    console.log("Cek data", data)
    setData(data)
  }

  return (
    <View style={styles.container}>
      <Text>Juz Overview {id}</Text>
      <ScrollView>
        <View style={styles.juzContainer}>
          {
            juzData.map(jz => {
              return (
                <Pressable
                  key={jz.id}
                  // onPress={() => goToJuzOverview(jz.id)}
                  android_ripple={{ color: '#ccc' }}
                  style={({pressed}) => (
                    [styles.button, pressed ? mainStyles.buttonPressed: null]
                  )}
                >
                  <SurahBox juz={jz} />
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
  },
  juzContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
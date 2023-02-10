import { mainColor, mainSpace, mainText } from "@styles/Main.styles";
import {
  Alert,
  SafeAreaView, ScrollView, StyleSheet, Text, View
} from "react-native";
import { LineChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import STRINGS from "@constants/strings/strings";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "store/settings-context";
import surahData from '../constants/surah.json';
import { weeklyProgress } from "@api/progress";
import { AuthContext } from "store/auth-context";
import LoadingOverlay from "@components/LoadingOverlay";
import { useIsFocused } from "@react-navigation/native";

export default function Statistics({
  navigation,
}) {
  const screenWidth = Math.max(Dimensions.get("window").width, 300) - 40;
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext)
  const { language } = useContext(SettingsContext)
  const [loading,setLoading] = useState(true)
  const [weeklyData, setWeeklyData] = useState({
    labels: STRINGS.days[language],
    datasets: [
      {
        data: [0,0,0,0,0,0,0],
        color: (opacity = 1) => mainColor.orange500, // optional
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Progress"] // optional
  });
  const [mistakeData, setMistakeData] = useState({
    labels: ["Test1", "Test2", "Test3"],
    // legend: [STRINGS.wrong[language], STRINGS.correct[language]],
    data: [
      // total mistake, total correct, 
      [60, 60],
      [30, 30],
      [30, 30],
    ],
    barColors: [mainColor.primary500, mainColor.blue30],
  })

  // const commitsData = [
  //   { date: "2017-01-02", count: 1 },
  //   { date: "2017-01-03", count: 2 },
  //   { date: "2017-01-04", count: 3 },
  //   { date: "2017-01-05", count: 4 },
  //   { date: "2017-01-06", count: 5 },
  //   { date: "2017-01-30", count: 2 },
  //   { date: "2017-01-31", count: 3 },
  //   { date: "2017-03-01", count: 2 },
  //   { date: "2017-04-02", count: 4 },
  //   { date: "2017-03-05", count: 2 },
  //   { date: "2017-02-30", count: 4 }
  // ];

  const chartConfig = {
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: mainColor.primary,
    backgroundGradientTo: mainColor.secondary,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: mainColor.orange100
      // stroke: "#ffa726"
    }
  }

  useEffect(() => {
    setLoading(true)
    weeklyProgress(user.uid).then(results => {
      let newWeekly = [0,0,0,0,0,0,0]
      let ayahDict = {}
      for(let res of results) {
        const data = res.data()
        const createdAt = new Date(data.createdAt.seconds*1000)
        newWeekly[createdAt.getDay()] += 1

        const id = `${data.surahIndex}`
        if(!ayahDict[id]) {
          ayahDict[id] = [null,null]
        }
        ayahDict[id][1] += 1
        if(data.wrong) ayahDict[id][0] += 1
      }
      weeklyData.datasets[0].data = newWeekly
      setWeeklyData(weeklyData)

      // need attention or most active ayah
      let labelList = []
      let dataList = []
      let i = 0
      for(let key of Object.keys(ayahDict)) {
        if(ayahDict[key][0]) {
          labelList.push(`${surahData[Number(key)-1].title}`)
          dataList.push(ayahDict[key])
        }
        i++;
      }
      mistakeData.labels = labelList.splice(0,3)
      mistakeData.data = dataList.splice(0,3)
      setMistakeData(mistakeData)
    }).catch(err => {
      console.error(err?.message)
      Alert.alert('Failed to get progress', err?.message)
    }).finally(() => {
      setLoading(false)
    })
  }, [isFocused])

  return (
    <SafeAreaView style={[mainSpace.safeArea]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={mainText.title}>{STRINGS.statistics[language]}</Text>
          <Text style={mainText.mainText}>{STRINGS.weekly_progress[language]}</Text>
          <View style={{marginVertical: 12}}>
            {
              !loading ?
                <LineChart
                  data={weeklyData}
                  width={screenWidth}
                  height={220}
                  verticalLabelRotation={30}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.graph}
                />
              : <LoadingOverlay />
            }
          </View>
          {/* <Text style={mainText.mainText.}>Yearly Progress</Text> */}
          {/* <View style={{marginVertical: 12}}>
            <ContributionGraph
              values={commitsData}
              endDate={new Date("2017-04-01")}
              numDays={92}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </View> */}
          <Text style={mainText.mainText}>{STRINGS.mistakes_ratio[language]}</Text>
          <View style={{marginVertical: 12}}>
            {
                !loading ? 
                <>
                  <StackedBarChart
                    style={styles.graph}
                    data={mistakeData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    withHorizontalLabels={false}
                    showLegend={false}
                  />
                  <View style={styles.legend}>
                    <View style={{ flexDirection: 'row', marginRight: 16 }}>
                      <View style={[styles.box,{backgroundColor: mainColor.primary500}]}></View>
                      <Text>{STRINGS.wrong[language]}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.box,{backgroundColor: mainColor.blue30}]}></View>
                      <Text>{STRINGS.correct[language]}</Text>
                    </View>
                  </View>
                </>
                : <LoadingOverlay />
            }
          </View>

        </View>
        <View style={styles.section}>
          <Text style={mainText.title}>Coverage</Text>
          <Text style={[mainText.baseHeader,{color: mainColor.grey}]}>Future Feature!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: mainColor.grey
  },
  graph: {
    borderRadius: 16
  },
  box: {
    minWidth: 17,
    minHeight: 10,
    marginHorizontal: 8
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12
  }
})
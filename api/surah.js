import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native";
const ayahData = require('../assets/data/ayah.json')

export async function fetchSurahProgress(userId) {
  let result = []
  try {
    // let snapshots = [getDocs(collection(firestoreDb, 'SurahInfo'), {})]
    let snapshots = [firestore().collection('SurahInfo').get()]
    if(!userId) {
      Alert.alert('userId is required')
    } else {
      // snapshots.push(getDocs(
      //   query(
      //     collection(firestoreDb, 'UserAyahProgress'),
      //     where('userId', '==', userId),
      //     where('wrong', '!=', true),
      //   )
      // ))
      snapshots.push(
        firestore().collection('UserAyahProgress')
          .where('userId', '==', userId)
          .where('wrong', '!=', true).get()
      )
    }
    const [querySnapshot, progressSnapshot] = await Promise.all(snapshots)
    
    const progressObj = {}
    const surahProgress = {}
    progressSnapshot.docs.map(psd => {
      const data = psd.data()

      if(!progressObj[data.surahIndex]) progressObj[data.surahIndex] = 0 
      
      const tracker = `${data.surahIndex}${data.ayahIndex}`
      // Math.min() to 100 as we only care maximum 100 point for this calculation
      if(!surahProgress[tracker]) progressObj[data.surahIndex] += Math.min(data.score,100)
      if(!data.wrong) surahProgress[tracker] = true
    })
    for(const qs of querySnapshot.docs) {
      const data = qs.data()
      data.progress = calculateSurahProgress(progressObj[qs.id], data.count)
      result.push(data)
    }
  } catch (e) {
    console.error("Error fetch surah progress: ", e);
  }
  return result
  // return !id ? ayahData: ayahData.filter(jd => jd.id === Number(id))
}

function calculateSurahProgress(totalScore=0, totalSurah=1) {
  const minimumScorePerAyah = 100
  const maximumScore = minimumScorePerAyah * totalSurah
  return (totalScore/(totalSurah)).toFixed(2)
  // return (Math.min(totalScore, maximumScore)/(totalSurah)).toFixed(2)
}
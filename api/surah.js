import { firestoreDb } from "db/firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore"; 
import { Alert } from "react-native";
const ayahData = require('../assets/data/ayah.json')

export async function fetchSurahProgress(userId) {
  let result = []
  try {
    let snapshots = [getDocs(collection(firestoreDb, 'SurahInfo'), {})]
    if(!userId) {
      Alert.alert('userId is required')
    } else {
      snapshots.push(getDocs(
        query(
          collection(firestoreDb, 'UserAyahProgress'),
          where('userId', '==', userId),
          where('wrong', '!=', true),
        )
      ))
    }
    const [querySnapshot, progressSnapshot] = await Promise.all(snapshots)
    
    const progressObj = {}
    const surahProgress = {}
    progressSnapshot.docs.map(psd => {
      const data = psd.data()

      if(!progressObj[data.surahIndex]) progressObj[data.surahIndex] = 0 
      
      const tracker = `${data.surahIndex}${data.ayahIndex}`
      if(!surahProgress[tracker]) progressObj[data.surahIndex] += data.score
      surahProgress[tracker] = true
    })
    for(const qs of querySnapshot.docs) {
      const data = qs.data()
      data.progress = ((progressObj[qs.id] || 0)/data.count).toFixed(2)
      result.push(data)
    }
  } catch (e) {
    console.error("Error fetch surah progress: ", e);
  }
  return result
  // return !id ? ayahData: ayahData.filter(jd => jd.id === Number(id))
}
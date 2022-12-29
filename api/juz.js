import { firestoreDb } from "db/firebase";
import { collection, doc, getDoc, getDocs, collectionGroup, where, query, orderBy } from "firebase/firestore"; 
import { Alert } from "react-native";
const juzData = require('../assets/data/juz.json')
const ayahData = require('../assets/data/ayah.json')

export async function fetchJuzProgress(userId, id=null) {
  let result = []
  let snapshots = [getDocs(collection(firestoreDb, 'JuzInfo'), {})]
  if(!userId) {
    Alert.alert('userId is required')
  } else {
    snapshots.push(getDocs(
      query(
        collection(firestoreDb, 'UserAyahProgress'),
        where('userId', '==', userId),
      )
    ))
  }
  try {
    const [querySnapshot, progressSnapshot] = await Promise.all(snapshots)
    
    const progressObj = {}
    const surahProgress = {}
    progressSnapshot.docs.map(psd => {
      const data = psd.data()

      if(!progressObj[data.juzIndex]) progressObj[data.juzIndex] = 0 
      
      const tracker = `${data.surahIndex}${data.ayahIndex}`
      if(!surahProgress[tracker]) progressObj[data.juzIndex] += data.score
      surahProgress[tracker] = true
    })
    for(const qs of querySnapshot.docs) {
      const data = qs.data()
      // const startPath = data.start._key.path.segments
      // const endPath = data.end._key.path.segments
      // const [startRef, endRef] = await Promise.all([
      //   getDocs(query(collection(firestoreDb, 'SurahInfo'), where('index', '==', startPath[6]))),
      //   getDocs(query(collection(firestoreDb, 'SurahInfo'), where('index', '==', endPath[6]))),
      // ])
      // data.start = startRef.docs.map(srd => srd.data())[0]
      // data.end = endRef.docs.map(srd => srd.data())[0]
      data.progress = ((progressObj[qs.id] || 0)/data.totalVerses).toFixed(2)
      result.push(data)
    }
  } catch (e) {
    console.error("Error fetch juz progress: ", e);
  }
  // return !id ? juzData: juzData.filter(jd => jd.id === Number(id))
  return result
}

export async function fetchSurahByJuz(juzId) {
  return !juzId ? ayahData: ayahData.filter(jd => jd.juz === Number(juzId))
}

export async function getJuzInfoDetail(juzInfoSnapshot) {
  return new Promise((resolve, reject) => {
    let result = []
    juzInfoSnapshot.forEach(async qs => {
      try {
        const data = qs.data()
        const startPath = data.start._key.path.segments
        const endPath = data.end._key.path.segments
        let startRef = await getDocs(collection(firestoreDb, startPath.join('/')))
        let endRef = await getDocs(collection(firestoreDb, endPath.join('/')))
        data.start = startRef
        data.start = endRef
        result.push(data)
      } catch(err) {
        reject(err)
      }
    })
    resolve(result)
  })
}
import { firestoreDb } from "db/firebase";
import { collection, getDocs } from "firebase/firestore"; 
const juzData = require('../assets/data/juz.json')
const ayahData = require('../assets/data/ayah.json')

export async function fetchJuzProgress(id=null) {
  // fetch(`${process.env.API_URL}/endpoint/`, {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     firstParam: 'yourValue',
  //     secondParam: 'yourOtherValue'
  //   })
  // });
  let result = []
  try {
    const querySnapshot = await getDocs(collection(firestoreDb, "JuzInfo"), {});
    querySnapshot.forEach(qs => {
      result.push(qs.data())
    })
  } catch (e) {
    console.error("Error fetch juz progress: ", e);
  }
  // console.log("CEK RES", result)
  // return result
  return !id ? juzData: juzData.filter(jd => jd.id === Number(id))
}

export async function fetchSurahByJuz(juzId) {
  return !juzId ? ayahData: ayahData.filter(jd => jd.juz === Number(juzId))
}

export async function fetchSurahProgress(id) {
  return !id ? ayahData: ayahData.filter(jd => jd.id === Number(id))
}
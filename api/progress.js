import { firestoreDb } from "db/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const userAyahProgressRef = collection(firestoreDb, 'UserAyahProgress')
const userSurahProgressRef = collection(firestoreDb, 'UserSurahProgress')

export async function saveAyahProgress(userId, juzIndex, surahIndex, ayahIndex, score=10) {
  const document = doc(firestoreDb, 'UserAyahProgress', `${userId}${juzIndex}${surahIndex}${ayahIndex}`)
  const existing = await getDoc(document)
  const data = existing.data()
  let payload = {}
  if(data) {
    payload = {
      score: Math.min(data.score + score, 100)
    }
    await updateDoc(document, payload)
  } else {
    payload = {
      juzIndex,
      ayahIndex,
      surahIndex,
      score,
      userId,
    }
    await setDoc(document, payload)
  }
}

export async function saveSurahProgress(userId, email, juzIndex, surahIndex, ayahIndex, coverage=5) {
  const document = doc(firestoreDb, 'UserSurahProgress', `${userId}${juzIndex}${surahIndex}`)
  const existing = await getDoc(document)
  const data = existing.data()
  if(data) {
    const payload = {
      coverage: Math.min(data.coverage + coverage, 100)
    }
    await updateDoc(document, payload)
  } else {
    const payload = {
      juzIndex,
      ayahIndex,
      email,
      surahIndex,
      coverage,
      userId,
    }
    await setDoc(document, payload)
  }
}
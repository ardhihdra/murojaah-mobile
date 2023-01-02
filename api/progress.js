import { firestoreDb } from "db/firebase";
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

const userAyahProgressRef = collection(firestoreDb, 'UserAyahProgress')
const userSurahProgressRef = collection(firestoreDb, 'UserSurahProgress')

export async function saveWrongProgress(userId, index, type, answered, options) {
  const indexes = index.split(':')
  const juzIndex = indexes[0]
  const surahIndex = indexes[1]
  const ayahIndex = indexes[2]
  const payload = {
    juzIndex,
    ayahIndex,
    surahIndex,
    score: 0,
    userId,
    wrong: true,
    type: type,
    answered: answered,
    options: options,
    createdAt: Timestamp.now()
  }
  const collectionRef = collection(firestoreDb, 'UserAyahProgress')
  await addDoc(collectionRef, payload)
}

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
      wrong: false,
      createdAt: Timestamp.now()
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
      createdAt: Timestamp.now()
    }
    await setDoc(document, payload)
  }
}
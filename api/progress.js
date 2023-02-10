import firestore from '@react-native-firebase/firestore';

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
    createdAt: firestore.FieldValue.serverTimestamp(),
    // createdAt: Timestamp.now()
  }
  // const collectionRef = collection(firestoreDb, 'UserAyahProgress')
  // await addDoc(collectionRef, payload)
  await firestore().collection("UserAyahProgress").add(payload);
  
}

export async function saveAyahProgress(userId, juzIndex, surahIndex, ayahIndex, score=10) {
  // const document = doc(firestoreDb, 'UserAyahProgress', `${userId}${juzIndex}${surahIndex}${ayahIndex}`)
  // const existing = await getDoc(document)
  const docId = `${userId}${juzIndex}${surahIndex}${ayahIndex}`
  const existing = await firestore()
    .collection("UserAyahProgress")
    .doc(docId);
  const data = existing.data()
  let payload = {}
  if(data) {
    payload = {
      score: Math.min(data.score + score, 100)
    }
    // await updateDoc(document, payload)
    await firestore().collection("UserAyahProgress").doc(docId).update(payload);
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
    // await setDoc(document, payload)
    await firestore().collection("UserAyahProgress").add(payload);
  }
}

export async function saveSurahProgress(userId, email, juzIndex, surahIndex, ayahIndex, coverage=5) {
  const docId = `${userId}${juzIndex}${surahIndex}`
  // const document = doc(firestoreDb, 'UserSurahProgress', docId)
  // const existing = await getDoc(document)
  const existing = await firestore().collection("UserSurahProgress").doc(docId).get();
  const data = existing.data()
  if(data) {
    const payload = {
      coverage: Math.min(data.coverage + coverage, 100)
    }
    // await updateDoc(document, payload)
    await firestore().collection("UserSurahProgress").doc(docId).update(payload);
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
    // await setDoc(document, payload)
    await firestore().collection("UserSurahProgress").add(payload);
  }
}
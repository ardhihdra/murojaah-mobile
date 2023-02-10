import firestore from '@react-native-firebase/firestore';

export async function getUserById(userId) {
  const userFetch = await firestore().collection('User').doc(userId).get()
  const userData = userFetch.data()
  return userData
}

export async function getUserByEmail(email) {
  const userFetch = await firestore()
    .collection('User')
    .where('email', '==', email)
    .get()
  return userFetch
}

export async function updateUser(userId, payload) {
  const userUpdate = await firestore()
  .collection('User')
  .doc(userId)
  .update(payload)
return userUpdate
}

export async function updateXP(userId, addition) {
  // const document = doc(firestoreDb, 'User', userId)
  // const existing = await getDoc(document)
  const existing = await firestore().collection('User').doc(userId).get()
  const data = existing.data()
  if(data) {
    const xp = data.xp || 0
    // await updateDoc(document, {xp: xp+addition})
    await firestore().collection('User')
      .doc(userId)
      .update({xp: xp+addition})
  }
}
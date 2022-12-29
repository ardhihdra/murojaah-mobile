import { firestoreDb } from "db/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export async function updateXP(userId, addition) {
  const document = doc(firestoreDb, 'User', userId)
  const existing = await getDoc(document)
  const data = existing.data()
  if(data) {
    const xp = data.xp || 0
    await updateDoc(document, {xp: xp+addition})
  }
}
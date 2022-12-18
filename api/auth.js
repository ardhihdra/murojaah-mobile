import { auth, firestoreDb } from 'db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Save user email and password to Firebase Authorization
 * @param {*} auth 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function createUser(params) {
  if(!params.id) throw 'user\' id is required'
  const surahRef = await setDoc(doc(firestoreDb, "User", params.id), params);
  return surahRef
}
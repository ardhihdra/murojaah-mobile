// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth, firestoreDb } from 'db/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

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

// export async function signInGoogle() {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     return userInfo
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//       throw 'You cancelled to login'
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (e.g. sign in) is in progress already
//       throw 'Login is in progress'
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//       throw 'Play services not available or outdated'
//     } else {
//       // some other error happened
//       throw 'Failed to login with Google'
//     }
//   }
// }

export async function createUser(params) {
  if(!params.id) throw 'user\' id is required'
  const surahRef = await setDoc(doc(firestoreDb, "User", params.id), params);
  return surahRef
}

export async function editUserData(userId, params={}) {
  if(!userId) throw 'user\' id is required'
  const surahRef = await updateDoc(doc(firestoreDb, "User", userId), params);
  return surahRef
}
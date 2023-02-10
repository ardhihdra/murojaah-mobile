import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Save user email and password to Firebase Authorization
 * @param {*} auth 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export async function signUp(email, password) {
  return auth().createUserWithEmailAndPassword(email, password)
}

export async function signIn(email, password) {
  return auth().signInWithEmailAndPassword(email, password)
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
  // const surahRef = await firestore().setDoc(doc(firestoreDb, "User", params.id), params);
  const surahRef = await firestore().collection("User").add(params);
  return surahRef
}

export async function editUserData(userId, params={}) {
  if(!userId) throw 'user\' id is required'
  // const surahRef = await updateDoc(doc(firestoreDb, "User", userId), params);
  const surahRef = await firestore().collection("User").doc(userId).update(params);
  return surahRef
}
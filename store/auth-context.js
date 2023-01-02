import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { auth, firestoreDb } from "db/firebase";

// GoogleSignin.configure();

export const AuthContext = createContext({
  token: null,
  user: {},
  isAuthenticated: false,
  updateUserInfo: () => null,
  // authenticate: (response) => {},
  logout: () => {},
})



export function AuthProvider({children}) {
  const [authToken, setAuthToken] = useState()
  const [user, setUser] = useState({})

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if(token) setAuthToken(token)
    })
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setAuthToken(user.accessToken)
        AsyncStorage.setItem('token', user.accessToken)
        const userInfo = {...user}
        const userData = await fetchUserData(userInfo.uid)
        if(userData) Object.assign(userInfo, userData)
        delete userInfo.stsTokenManager
        delete userInfo.accessToken
        setUser(userInfo)
        // ...
      } else {
        // User is signed out
        // ...
        setAuthToken(null)
        setUser({})
      }
    });
  }, [])

  async function fetchUserData(userId) {
    const document = doc(firestoreDb, 'User', userId)
    const userFetch = await getDoc(document)
    const userData = userFetch.data()
    return userData
  }

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAuthToken(null)
        setUser({})
        AsyncStorage.removeItem('token')
      }).catch((error) => {
        // An error happened.
      });
  }

  async function updateUserInfo() {
    if(user?.uid) {
      const userData = await fetchUserData(user.uid)
      if(userData) setUser(Object.assign(user, userData))
    }
  }

  const value = {
    token: authToken,
    user: user,
    isAuthenticated: !!authToken,
    updateUserInfo: updateUserInfo,
    // authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

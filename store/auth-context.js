import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";
import { getUserByEmail, getUserById } from "@api/user";

export const AuthContext = createContext({
  token: null,
  user: {},
  isAuthenticated: false,
  updateUserInfo: () => null,
  fetchUserData: () => null,
  updateUserInfoByGoogle: () => null,
  // authenticate: (response) => {},
  logout: () => {},
})



export function AuthProvider({children}) {
  const [authToken, setAuthToken] = useState()
  const [user, setUser] = useState({})
  const [initialization, setInitialization] = useState(true)

  async function onAuthStateChangedHandler(user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // TODO : To Follow @react-native-firebase/auth method
      if (initialization) setInitialization(false)
      // const idToken = await user._auth._nativeModule.getIdToken()
      const idToken = await firebase.auth().currentUser.getIdToken()
      if (idToken) AsyncStorage.setItem('token', idToken)
      const userInfo = {...user._user}
      const userData = await fetchUserData(userInfo.uid).catch(err => {
        Alert.alert('Error user data', err?.message)
      })
      if (userData) Object.assign(userInfo, userData)
      delete userInfo.stsTokenManager
      delete userInfo.accessToken
      if (userInfo) AsyncStorage.setItem('user', JSON.stringify(userInfo))
      setUser(userInfo)
      setAuthToken(idToken)
      // ...
    } else {
      // User is signed out
      // ...
      setAuthToken(null)
      setUser({})
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if(token) setAuthToken(token)
    })
    AsyncStorage.getItem('user').then(user => {
      if(user) setUser(JSON.parse(user))
    })

    const subscriber = auth().onAuthStateChanged(onAuthStateChangedHandler)
    return subscriber;

    // onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     // const uid = user.uid;
    //     console.log("onAuthStateChanged", user)
    //     AsyncStorage.setItem('token', user.accessToken)
    //     const userInfo = {...user}
    //     const userData = await fetchUserData(userInfo.uid).catch(err => {
    //       Alert.alert('Error user data', err?.message)
    //     })
    //     if(userData) Object.assign(userInfo, userData)
    //     delete userInfo.stsTokenManager
    //     delete userInfo.accessToken
    //     AsyncStorage.setItem('user', JSON.stringify(userInfo))
    //     setUser(userInfo)
    //     setAuthToken(user.accessToken)
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //     setAuthToken(null)
    //     setUser({})
    //   }
    // });
  }, [])

  async function fetchUserData(userId) {
    // const document = doc(firestoreDb, 'User', userId)
    // const userFetch = await getDoc(document)
    // const userData = userFetch.data()
    return getUserById(userId)
  }

  function logout() {
    auth().signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAuthToken(null)
        setUser({})
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('user')
      }).catch((error) => {
        // An error happened.
        Alert.alert('Something went wrong', error?.message)
      });
  }

  async function updateUserInfo(userId=user?.id) {
    if(userId) {
      let userData = await fetchUserData(user.uid)
      if(userData) {
        userData = Object.assign(user, userData)
        if(userData) AsyncStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      }
      return userData
    }
  }

  async function updateUserInfoByGoogle(email) {
    const documents = await getUserByEmail(email)
    console.log("DOCUMENTS return", documents.docs, email)
    for (let doc of documents.docs) {
      const userData = doc.data()
      console.log("IS EMAIL FOUND", userData)
      if(userData) {
        userData = Object.assign(user, userData)
        AsyncStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      }
    }
  }

  const value = {
    token: authToken,
    user: user,
    isAuthenticated: !!authToken,
    updateUserInfo: updateUserInfo,
    fetchUserData: fetchUserData,
    updateUserInfoByGoogle: updateUserInfoByGoogle,
    // authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

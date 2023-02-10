import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";
import { getUserByEmail, getUserById, updateUser } from "@api/user";
import User from 'db/models/User';

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

  async function onAuthStateChangedHandler(user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // TODO : To Follow @react-native-firebase/auth method
      // const idToken = await user._auth._nativeModule.getIdToken()
      const idToken = await firebase.auth().currentUser.getIdToken()
      if (idToken) AsyncStorage.setItem('token', idToken)
      const userInfo = {...user._user}
      const userData = await fetchUserData(userInfo.uid).catch(err => {
        Alert.alert('Error user data', err?.message)
      })
      if (!userData) {
        const userInstance = new User({
          ...userInfo,
          name: userInfo?.displayName,
          id: userInfo?.uid,
          photoURL: userInfo?.photoURL,
          dirham: 0,
          health: 0,
          level: 0,
          streak: 0,
          xp: 0,
          createdAt: firestore.FieldValue.serverTimestamp(),
          country: '',
          phoneNumber: ''
        })
        await userInstance.saveUserToDB()
      }
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
        let newUserData = Object.assign(user, userData)
        if(newUserData) AsyncStorage.setItem('user', JSON.stringify(newUserData))
        setUser(newUserData)
      }
      return userData
    }
  }

  async function updateUserInfoByGoogle(user) {
    try {
      const documents = await getUserByEmail(user?.email)
      for (let doc of documents.docs) {
        const userData = doc.data()
        if (userData) {
          const newUserData = {
            emailVerified: true,
            providerData: [
              {
                ...user,
                providerId: "google.com",
              }
            ]
          }
          await updateUser(userData.id, newUserData)
        }
      }
    } catch (error) {
      console.error("Failed to update user info", error)
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

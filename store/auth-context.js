import { auth } from "db/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: null,
  user: {},
  isAuthenticated: false,
  // authenticate: (response) => {},
  logout: () => {},
})


export function AuthProvider({children}) {
  const [authToken, setAuthToken] = useState()
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setAuthToken(user.accessToken)
        const userInfo = {...user}
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

  // function authenticate(firebaseResponse) {
    // console.log("CEK auth", firebaseResponse)
    // setAuthToken(firebaseResponse?._tokenResponse?.idToken)
    // setUser(firebaseResponse?._tokenResponse?.user)
  // }

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAuthToken(null)
        setUser({})
      }).catch((error) => {
        // An error happened.
      });
  }

  const value = {
    token: authToken,
    user: user,
    isAuthenticated: !!authToken,
    // authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

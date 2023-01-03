import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '@components/LoadingOverlay';
import { Alert, View } from 'react-native';
import { signIn } from '@api/auth';
import Logo from '@components/Logo';
import { AuthContext } from 'store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { setUser, setAuthToken, updateUserInfo } = useContext(AuthContext)
  // const [error, setError] = useState({})
  
  function onAuthenticate({ email, password }) {
    setIsAuthenticating(true)
    
    signIn(email, password)
      .then(async (response) => {
        // Signed in 
        console.log("Successfully Login")
        // authenticate(response)
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          // Display signup form if the user does not exist
          Alert.alert('Auth Failed', 'User Not Found! You may want to Sign Up')
          // navigation.navigate(ROUTES.SignUp);
        } else {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert('Auth Failed', errorMessage)
        }
      }).finally(() => {
        setIsAuthenticating(false)
      });
  }

  // async function onGoogleAuth() {
  //   const result = await signInGoogle()
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   const currentUser = await GoogleSignin.getCurrentUser();
  // }

  if(isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />
  } else {
    return (
      <View style={{
        justifyContent: 'center',
        flex: 1,
        paddingBottom: 100,
      }}>
        <Logo />
        <AuthContent isLogin onAuthenticate={onAuthenticate}/>
      </View>
    );
  }
}

export default LoginScreen;

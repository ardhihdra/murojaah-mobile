import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '@components/LoadingOverlay';
import { Alert, SafeAreaView, View } from 'react-native';
import { signIn } from '@api/auth';
import Logo from '@components/Logo';
import { AuthContext } from 'store/auth-context';
import { mainSpace } from '@styles/Main.styles';

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
      <SafeAreaView
        style={[
          { flex: 1 },
          mainSpace.safeArea
        ]}
      >
        <View style={{flex: 1, justifyContent: 'center', marginTop: 16 }}>
          <Logo />
        </View>
        <View style={{flex: 3}}>
          <AuthContent isLogin onAuthenticate={onAuthenticate}/>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;

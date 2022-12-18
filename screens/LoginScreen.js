import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '@components/LoadingOverlay';
import { Alert, View } from 'react-native';
import { signIn } from '@api/auth';

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  // const [error, setError] = useState({})
  
  async function onAuthenticate({ email, password }) {
    setIsAuthenticating(true)
    
    signIn(email, password)
      .then((response) => {
        // Signed in 
        console.log("Successfully Login")
        // authenticate(response)
        
      })
      .catch((error) => {
        console.log("SIGN IN ERROR", error)
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

  if(isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />
  } else {
    return (
      <View style={{ justifyContent: 'center', flex: 1, marginBottom: 100 }}>
        <AuthContent isLogin onAuthenticate={onAuthenticate}/>
      </View>
    );
  }
}

export default LoginScreen;

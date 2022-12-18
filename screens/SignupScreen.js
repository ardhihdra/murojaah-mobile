import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { signUp } from '@api/auth';
import User from 'db/models/User';
import LoadingOverlay from '@components/LoadingOverlay';

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)


  async function onAuthenticate({ email, password }) {
    setIsAuthenticating(true)

    signUp(email, password)
      .then(async (res) => {
        console.log("Successfully Sign Up")
        const user = new User({
          ...res?.user,
          name: res?.user?.displayName,
          id: res?.user?.uid,
          email: res?._tokenResponse?.email,
        })
        await user.saveUserToDB()
      })
      .catch((err) => {
        console.error("SignUp ERR", err)
        // Display an error message for other types of login errors
        Alert.alert('Invalid input', err?.message || err || 'Something went wrong!');      
      }).finally(() => {
        setIsAuthenticating(false)
      });
  }

  if(isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  } else {
    return (
      <View style={{ justifyContent: 'center', flex: 1, marginBottom: 100 }}>
        <AuthContent onAuthenticate={onAuthenticate}/>
      </View>
    );
  }
}

export default SignupScreen;

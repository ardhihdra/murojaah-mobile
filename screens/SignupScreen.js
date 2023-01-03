import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { signUp } from '@api/auth';
import User from 'db/models/User';
import LoadingOverlay from '@components/LoadingOverlay';
import { mainColor, mainShadow, mainText } from '@styles/Main.styles';
import Logo from '@components/Logo';

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
      <View style={{
        justifyContent: 'center',
        flex: 1,
        paddingBottom: 100,
      }}>
        <Logo />
        <AuthContent onAuthenticate={onAuthenticate}/>
      </View>
    );
  }
}

export default SignupScreen;

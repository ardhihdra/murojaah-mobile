import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { signUp } from '@api/auth';
import User from 'db/models/User';
import LoadingOverlay from '@components/LoadingOverlay';
import Logo from '@components/Logo';
import { mainSpace } from '@styles/Main.styles';

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
          <AuthContent onAuthenticate={onAuthenticate}/>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignupScreen;

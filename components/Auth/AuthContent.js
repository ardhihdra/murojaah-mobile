import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

import FlatButton from '../FlatButton';
import AuthForm from './AuthForm';
import { ROUTES } from '@constants/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mainColor, mainShadow, mainText } from '@styles/Main.styles';
import { Button } from '@rneui/base';

function AuthContent({ isLogin, onAuthenticate }) {
  const router = useRoute()
  const navigation = useNavigation()
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    // Todo
    if(router.name === ROUTES.SignIn) navigation.replace(ROUTES.SignUp)
    else if(router.name === ROUTES.SignUp) navigation.replace(ROUTES.SignIn)
  }

  function submitHandler(credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!passwordsAreEqual))
    ) {
      let message = 'Please check your entered credentials.'
      if(!emailIsValid) message = 'Email is not in a invalid format'
      if(!passwordIsValid) message = 'Password needs to be longer than 6 characters'
      Alert.alert('Invalid input', message);
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  function SignInWithGoogle() {

  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {/* <Text style={[{marginVertical: 16, textAlign: 'center'}, mainText.baseInfo]}>Or</Text>
      <Button
        buttonStyle={{ borderRadius: 6 }}
        icon={{
          type: 'font-awesome',
          name: 'google',
          color: 'white',
        }}
        onPress={SignInWithGoogle}
      >
        Sign In With Google
      </Button> */}
      <View style={styles.buttons}>
        <Text style={{ textAlign: 'center', ...mainText.baseText }}>
          {isLogin ? 'Don`t have account?' : 'Got an account?'}
        </Text>
        <FlatButton onPress={switchAuthModeHandler} color={mainColor.primary}>
          {isLogin ? 'Create a new user' : ' Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
  },
  buttons: {
    marginTop: 16,
  },
});

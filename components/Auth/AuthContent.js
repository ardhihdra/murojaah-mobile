import { useContext, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

import FlatButton from '../FlatButton';
import AuthForm from './AuthForm';
import { ROUTES } from '@constants/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mainColor, mainText } from '@styles/Main.styles';
import { Button } from '@rneui/base';
import { AuthContext } from 'store/auth-context';

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  androidClientId: '282760367985-8h539gvsf9232fvgd5ialp9tqmg7b12r.apps.googleusercontent.com',
  webClientId: '282760367985-m4p9n93938mcki3pk8i7i3s3bng4rgd0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  //openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  //profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

function AuthContent({ isLogin, onAuthenticate }) {
  const router = useRoute()
  const navigation = useNavigation()
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  const [isSigninInProgress, setIsSigninInProgress] = useState(false)
  const [showWithEmail, setShowWithEmail] = useState(false)
  const { updateUserInfoByGoogle } = useContext(AuthContext)
  const PRIVACY_URL = 'https://kaizeni-landing-page.vercel.app/murojaah/privacypolicy'
  const TOS_URL = 'https://kaizeni-landing-page.vercel.app/murojaah/tos'

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

  async function SignInWithGoogle() {
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices();
      if (!hasPlayService) throw { message: 'Has no Play Service' }
      const { idToken, user } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      await updateUserInfoByGoogle(user)
      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert(`${error.code}: Sign in canceled`)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already 
        Alert.alert(`${error.code}: Sign in already in progress`)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert(`${error.code}: Play Services not available`)
      } else {
        // some other error happened
        console.error(error)
        Alert.alert(`${error.code}: Failed to login with Google`)
      }
    }
  }

  async function openLink(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <View style={styles.authContent}>
      <View style={styles.authForm}>
        <View style={styles.thirdPartyLogin}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={SignInWithGoogle}
            disabled={isSigninInProgress}
          />
        </View>
        <Text style={[{marginVertical: 16, textAlign: 'center'}, mainText.baseInfo]}>Or</Text>
        {
          !showWithEmail ? (
            <View style={styles.thirdPartyLogin}>
              <Button
                onPress={() => setShowWithEmail(true)}
                color={mainColor.primary}
                containerStyle={{ width: 200 }}
              >
                {isLogin ? 'Login with Email': 'Signup with email'}
              </Button>
            </View>
          ): (
            <AuthForm
              isLogin={isLogin}
              onSubmit={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
          )
        }
        <View style={styles.buttons}>
          <Text style={{ textAlign: 'center', ...mainText.baseText }}>
            {isLogin ? 'Don`t have account?' : 'Got an account?'}
          </Text>
          <FlatButton onPress={switchAuthModeHandler} color={mainColor.primary}>
            {isLogin ? 'Create a new user' : ' Log in instead'}
          </FlatButton>
        </View>
      </View>
      {
        !isLogin && (
          <View style={styles.privacyTosContainer}>
            <Text style={styles.privacyTosText} onPress={() => openLink(PRIVACY_URL)}>Privacy Policy</Text>
            <Text style={styles.privacyTosText}>&</Text>
            <Text style={styles.privacyTosText} onPress={() => openLink(TOS_URL)}>Terms of Service</Text>
          </View>
        )
      }
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
    flex: 1,
  },
  authForm: {
    flex: 4
  },
  buttons: {
    marginTop: 16,
  },
  thirdPartyLogin: {
    alignItems: 'center',
  },
  privacyTosContainer: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    flex: 1
  },
  privacyTosText: {
    marginHorizontal: 4,
    color: 'grey'
  }
});

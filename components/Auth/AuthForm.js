import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MainButton from '../MainButton';
// import Input from './Input';
import { mainColor, mainText } from '@styles/Main.styles';
import { Input } from '@rneui/themed';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email"
          onChangeText={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          autoCapitalize='none'
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeholder='fulan@example.com'
          inputType='email'
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Input
            label="Password"
            autoCapitalize='none'
            onChangeText={updateInputValueHandler.bind(this, 'password')}
            secure
            secureTextEntry={isVisible}
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
            placeholder='Minimum 6 characters'
          />
          <Ionicons
            name={isVisible ? 'ios-eye' : 'ios-eye-off'}
            size={24}
            style={{ position: 'relative', right: 30 }}
            color={mainColor.primary}
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>
        {!isLogin && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Input
              label="Confirm Password"
              autoCapitalize='none'
              onChangeText={updateInputValueHandler.bind(
                this,
                'confirmPassword'
              )}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
              secureTextEntry={true}
              placeholder='Minimum 6 characters'
            />
            <Ionicons
              name={isVisible2 ? 'ios-eye' : 'ios-eye-off'}
              size={24}
              style={{ position: 'relative', right: 30 }}
              color={mainColor.primary}
              onPress={() => setIsVisible2(!isVisible2)}
            />
          </View>
        )}
        <View style={styles.buttons}>
          <MainButton onPress={submitHandler} style={{ backgroundColor: mainColor.primary }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </MainButton>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});

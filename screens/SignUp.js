import { ROUTES } from "@constants/routes";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native"

export function SignUp({
  navigation
}) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const { email, password } = form
  const [error, setError] = useState('')
  const auth = getAuth();
  
  function handleSubmit() {
    // auth.signInWithEmailAndPassword(email, password)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Login successful, navigate to the home screen
        navigation.navigate(ROUTES.Home);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          // Display signup form if the user does not exist
          navigation.navigate(ROUTES.SignUp);
        } else {
          // Display an error message for other types of login errors
          setError({ error });
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setForm({ email })}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(password) => setForm({ password })}
        value={password}
        secureTextEntry
      />
        {this.state.error && (
          <Text style={styles.errorText}>{this.state.error.message}</Text>
        )}
      <Button style={styles.button} title="Login" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#116530',
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 8,
    color: 'white',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#21B6A8',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
})
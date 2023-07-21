import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, HelperText, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const windowHeight = window.height;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Perform your login logic here
    // For simplicity, we'll just check if email and password are not empty
    if (email === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      // Perform login action here (e.g., call an API, authenticate user)
      // For this example, let's assume login is successful if the email and password are "admin"
      if (email === 'admin' && password === 'admin') {
        setError(''); // Clear any previous error messages
        navigation.navigate('NemesisSelection'); // Redirect to HomeScreen
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>Adrenaline</Title>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          label="Email"prett
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          style={styles.input}
					autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          mode="outlined"
          style={styles.input}
					autoCapitalize="none"
        />
        {error ? <HelperText type="error">{error}</HelperText> : null}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: windowHeight * 0.1, // Position title in the upper 2/3 of the screen
    paddingBottom: windowHeight * 0.2, // Position login elements 2/3 of the way down
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
		height: 60,
  },
  title: {
    fontSize: 52, // Larger title font size
		lineHeight: 'auto',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    width: '80%', // Adjust the width of the login container as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
    width: '100%', // Ensure the TextInput takes the full width of the container
  },
  button: {
    marginTop: 8,
    width: '100%', // Ensure the Button takes the full width of the container
  },
});

export default LoginScreen;
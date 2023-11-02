import { Button, Text, View, TextInput, Alert, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const Login = ({ navigation, route }) => {
  const theme = useSelector(state => state.theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const gradientColors = theme.mode === 'light' ?['#6AC8E1','#6AC8E1', '#9D93E1']:["white","gray"]
  const backgroundImageSource = theme.mode === 'light' ? require('../assets/images/login.jpeg') : require('../assets/images/pexels-photo-1270184.jpeg');

  const userregistration = async () => {
    if (email && password) {
      try {
        const user = await auth().signInWithEmailAndPassword(email, password);
        console.log(user.user);
        setEmail('');
        setPassword('');
        navigation.dispatch(StackActions.replace('HomeScreen'));
      } catch (error) {
        let errorMessage = 'An error occurred during login.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'That email address is already in use.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'That email address is invalid.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid password.';
        }
        console.error('Error during login:', error);
        Alert.alert(errorMessage);
      }
    } else {
      Alert.alert('All inputs are empty.');
    }
  };

  const handleForgotPassword = async () => {
    if (email !== null) {
      try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Password reset email sent. Please check your email.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error sending password reset email.');
      }
    } else {
      Alert.alert('Please enter your email to reset the password.');
    }
  };


  const GradientCard = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.gradientCard}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors}
        style={styles.gradientBackground}
      >
        <Text style={[styles.gradientCardText,textStyles]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
    source={backgroundImageSource}
    style={styles.container}
    imageStyle={styles.backgroundImage}
    >
      <LottieView
        source={require('../assets/Lottiefiles/animation_ln7fydfd.json')}
        autoPlay
        loop
        speed={0.2}
        style={styles.animationContainer}
      />
          <LinearGradient
          colors={gradientColors}
        >
    
    <View style={styles.main}>
<View style={{alignItems:'center'}}><Text style={[{ fontSize: 25, fontWeight: 'bold', fontFamily: 'italic' },textStyles]}>Login</Text></View>

    
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType='email-address'
        KeyboardAvoidingView= {true}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <GradientCard
            title="Login"
            onPress={userregistration}
          />
           <GradientCard
            title="Go to Signup"
            onPress={()=>navigation.navigate('Signup')}
          />
           <GradientCard
            title="Forget Password"
            onPress={handleForgotPassword}
          />

      </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCardText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  backgroundImage: {
    opacity: 0.7, // Adjust the opacity value as needed
  },
  gradientCard:{
    marginVertical:10,
    borderRadius: 10,
    overflow: 'hidden',
    width:180,
    marginHorizontal:58
  },
  animationContainer: {

    marginTop: 30,
    height: 130,
    width: 150,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 2,
    marginHorizontal:120
  },
  signupButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width:150,
    alignSelf: 'center',

  },
  googleButton: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor:'black',
    borderRadius: 10,

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 220,
    marginTop: 20,
    marginLeft: 45,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
  },
  main: {
    height: 'auto',
    width: 300,
    marginTop: 20,
    borderRadius: 20,
    opacity: 0.7, // Set your desired opacity
  },
  lightContainer: {
    backgroundColor: 'white',
  },

  darkContainer: {
    backgroundColor: 'black',
  },

  lightText: {
    color: 'white',
  },

  darkText: {
    color: 'black',
  },
});

export default Login;

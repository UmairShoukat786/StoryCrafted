import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import LottieView from 'lottie-react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';


const Signup = ({ navigation }) => {
  const theme = useSelector(state => state.theme);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const gradientColors = theme.mode === 'light' ?[ '#9D93E1','#9D93E1','#6AC8E1']:["white","gray"]
  const backgroundImageSource = theme.mode === 'light' ? require('../assets/images/signup.webp') : require('../assets/images/pexels-photo-1270184.jpeg');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "78186778391-euasvikavrh26nfs6d5djcdlrel8vgqi.apps.googleusercontent.com",
    });
  }, []);

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      setProfileImage(image);
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };



const handleSignup = async () => {
  if (!name || !email || !password || !profileImage) {
    Alert.alert('All fields are required');
    return;
  }

  try {
    // Generate a unique ID for the user
    const userId = uuidv4(); // Use UUID or any other method to generate a unique ID

    // Create a new user with a manually assigned unique ID
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Create a Firestore document with the same unique ID
    const userData = await firestore().collection('user').doc(userId).set({
      name: name,
      email: email,
    });

    await navigation.navigate('Login');

    // Upload the profile image to Firebase Storage
    const imageUri = profileImage.path;
    const fileName = `${userId}_profile.jpg`; // Use the same unique ID
    const reference = storage().ref(`profileImages/${fileName}`);
    await reference.putFile(imageUri);

    // Get the download URL of the uploaded image
    const imageUrl = await reference.getDownloadURL();

    // Update the user's profile with the name and photo URL
    await user.updateProfile({
      displayName: name,
      photoURL: imageUrl,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    Alert.alert('Signup Error', 'An error occurred during signup.');
  }
};



  const googlesignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      // Authenticate the user with Firebase using the Google credentials
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      await auth().signInWithCredential(googleCredential);

      // User is signed in with Google, you can navigate to the dashboard or perform other actions
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
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
      source={require('../assets/Lottiefiles/animation_lo04fr1s.json')}
      autoPlay
      loop
      speed={0.2}
      style={styles.animationContainer}
    />
<LinearGradient
          colors={gradientColors}
        >

<View style={styles.main}>
<View style={{alignItems:'center'}}><Text style={[{ fontSize: 25, fontWeight: 'bold', fontFamily: 'italic' },textStyles]}>Signup</Text></View>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
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

      {profileImage && (
        <Image source={{ uri: profileImage.path }} style={styles.profileImage} />
      )}
 <GradientCard
            title="Pickimage"
            onPress={pickImage}
            colors={['#E4417A', '#FF753A', '#FF8E53']}
          />
      <GradientCard
            title="Signup"
            onPress={handleSignup}
            colors={['#E4417A', '#FF753A', '#FF8E53']}
          />

        <GradientCard
            title="Google signup"
            onPress={googlesignIn}
          />
            <GradientCard
            title="Go to Login"
            onPress={()=>navigation.navigate('Login')}
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
    opacity: 0.7,
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

export default Signup;
import { Text, View, StyleSheet,ImageBackground } from 'react-native';
import React, { useEffect,useState } from 'react';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';

const Startup = ({ navigation }) => {
  const [textColor, setTextColor] = useState('black');
  const colors = [ '#8D9440', '#755139'];
  let colorIndex = 0;

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      const nextColor = colors[colorIndex];
      setTextColor(nextColor);

      // Increment the color index and loop back to 0 when it reaches the end of the colors array
      colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);

    return () => clearInterval(colorChangeInterval);
  }, []);

  useEffect(() => {

    setTimeout(() => {
      auth().onAuthStateChanged((user) => {
        const routetime = user !== null ? 'HomeScreen' : 'Login';
        navigation.dispatch(
          StackActions.replace(routetime)
        );
      }
      );
    }, 4000);

  }, []);



  return (
    <ImageBackground
    source={require('../assets/images/splashscreen.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={{ height: 'auto', width: 250, marginTop: 230, marginHorizontal: 40, transform: [{ rotate: '-40deg' }] }}>
  <Text style={{ fontSize: 50, fontWeight: 'bold', color: textColor }}>Story   Craft</Text>
        </View>
    </ImageBackground>
  );
  
};

export default Startup;
const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    
  },
})
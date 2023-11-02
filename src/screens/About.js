import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { switchMode } from '../redux/action/thmemaction';

const About = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const headerstyle = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const backgroundImageSource = theme.mode === 'light' ? require('../assets/images/about2.jpeg') : require('../assets/images/pexels-photo-1270184.jpeg');
  const gradientColors = theme.mode === 'light' ? ['#FA7A35', '#6B5876'] : ['black', 'black', 'white'];


  const toggleTheme = () => {
    dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ImageBackground
      source={backgroundImageSource}
      style={styles.backgroundImage}
    >
      <View style={styles.main}>
        <View style={[{ headerstyle }, { width: 200, alignItems: 'center', marginTop: 150, alignSelf: 'center' }]}>
          <Text style={[styles.Text, textStyles]}>About us</Text>
        </View>

        <LinearGradient
          colors={gradientColors}
          style={styles.about}
        >
          <Text style={[styles.Text, textStyles]}>
            "Welcome to StoryCraft, the ultimate platform for creative storytelling. At StoryCraft, we empower storytellers of all kinds to express themselves through captivating narratives that combine photos, videos, and text. With a focus on fostering connections and real-time engagement, our app provides a dynamic space for sharing your stories with the world. Whether you're an aspiring writer, an avid photographer, or simply someone with a story to tell. StoryCraft is your canvas for self-expression. Join us on this journey as we believe in the transformative power of stories to inspire, connect, and ignite change."
          </Text>

          <Text style={[styles.Text, textStyles]}>We believe that stories have the power to inspire, educate, and connect people. Our vision is to create a vibrant and inclusive storytelling community where everyone's voice is heard.</Text>

          <TouchableOpacity onPress={toggleTheme} style={[styles.toggleButton, { backgroundColor: theme.mode === 'light' ? 'white' : 'darkgray' }]}>
            <Text style={[styles.toggleButtonText, { color: theme.mode === 'light' ? 'black' : 'white' }]}>Toggle Theme</Text>
          </TouchableOpacity>

        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  about: {
    marginTop: 20,
    width: 330,
    alignSelf: 'center',
    height: 350,
    borderRadius: 20,
    padding: 10,
  },

  main: {
    flex: 1,
  },

  Text: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  lightContainer: {
    backgroundColor: 'white',
  },

  darkContainer: {
    backgroundColor: 'white',
  },

  lightText: {
    color: 'black',
  },

  darkText: {
    color: 'white',
  },

  toggleButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },

  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default About;

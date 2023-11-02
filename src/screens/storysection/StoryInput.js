import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';


const StoryInput = ({ category }) => {
  const theme = useSelector(state => state.theme)
  const [inputdata, setinputdata] = useState('');

  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const backgroundImageSource = theme.mode === 'light' ? require('../../assets/images/iinputt.webp') : require('../../assets/images/pexels-photo-5591667.jpeg');

  const addStory = async () => {
    if (inputdata) {
      try {
        const storyData = {
          content: inputdata,
        };

        const storyRef = firestore().collection(category);

        // Use the `add` method to create a new document with a unique ID
        await storyRef.add(storyData);

        setinputdata('');
        Alert.alert('Story added successfully.');
      } catch (error) {
        console.error('Error adding story:', error);
      }
    } else {
      Alert.alert('Write something about your story');
    }
  };


  return (
    <ImageBackground
      source={backgroundImageSource}
      style={containerStyles}
    >
      <ScrollView style={styles.main}>
        <Text style={[styles.headerText,textStyles]}>{category}</Text>
        <View style={styles.input}>
          <TextInput
            value={inputdata}
            onChangeText={(text) => setinputdata(text)}
            multiline
            numberOfLines={10}
            style={[styles.storyInput, textStyles]}
            KeyboardAvoidingView={true}
          />
        </View>

        <TouchableOpacity onPress={addStory} style={[styles.addBtn, containerStyles]}>
          <Text style={[styles.addBtnText, textStyles]}>Add Story</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,


  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
   margin:10
  },
  storyInput: {
    height: 450,
    width: '95%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 9
  },
  addBtn: {
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 80,
    marginVertical: 25,
  },
  addBtnText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
   
  },
  lightContainer: {
    backgroundColor: 'white',
  },

  darkContainer: {
    backgroundColor: 'black',
  },

  lightText: {
    color: 'black',
  },

  darkText: {
    color: 'white',
  },
  borderl: {
    borderColor: "black"
  },
  boderd: {
    borderColor: "white"
  }
});

export default StoryInput;
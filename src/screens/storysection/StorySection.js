import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import StoryInput from './StoryInput';
import StoryDisplay from './StoryDisplay';
import { useSelector } from 'react-redux';




const Storysection = ({ navigation, route }) => {

  const theme=useSelector(state=>state.theme)
  const { category } = route.params;
  const [showAddStory, setShowAddStory] = useState(false);
  const [showDisplayStory, setShowDisplayStory] = useState(false);
  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const gradientColors = theme.mode === 'light' ? ['white','white'] :['#E4417A', '#FF753A', '#FF8E53'];

  const handleAddStoryClick = () => {
    setShowAddStory(true);
    setShowDisplayStory(false);
  };

  const handleDisplayStoryClick = () => {
    setShowAddStory(false);
    setShowDisplayStory(true);
  };

  return (
    <View style={[styles.container,containerStyles]}>
      <View style={styles.header}>
        <Text style={[{fontWeight:'bold',fontSize:20},textStyles]}>StorySection</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button,containerStyles]} onPress={handleAddStoryClick}>
            <Text style={textStyles}>Add Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,containerStyles]} onPress={handleDisplayStoryClick}>
            <Text  style={textStyles}>Display Story</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {showAddStory && (
          <ScrollView>
            <StoryInput category={category} />
          </ScrollView>
        )}
        {showDisplayStory && (
          <ScrollView>
            <StoryDisplay category={category} />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
   
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  alignContent:'center',

  },
  button: {
    borderColor: 'black',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 35,
    margin:10,
    backgroundColor:'black'
  },
  content: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#EFE1CE',
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
});

export default Storysection;

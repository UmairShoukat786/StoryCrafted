import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Clipboard from '@react-native-community/clipboard';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import DisplayStyle from '../../components/css/DispalyStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons

const StoryDisplay = ({ category }) => {
  const styles = DisplayStyle;
  const theme = useSelector(state => state.theme);
  const [data, setData] = useState([]);
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const backgroundImageSource = theme.mode === 'light' ? require('../../assets/images/display.jpeg') : require('../../assets/images/display.webp');
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // Keep track of favorite stories

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    displayStory();
    fetchFavoriteStories(); // Fetch user's favorite stories
  }, []);

  const displayStory = async () => {
    try {
      const storyRef = firestore().collection(category);
      const querySnapshot = await storyRef.get();

      const stories = [];
      querySnapshot.forEach((doc) => {
        const { content } = doc.data();
        stories.push({ key: doc.id, content });
      });
      setData(stories);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'An error occurred while fetching data.');
    }
  };

  const fetchFavoriteStories = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const favoritesRef = firestore().collection('favorites');
        const querySnapshot = await favoritesRef.where('userId', '==', user.uid).get();

        const favoriteStoryKeys = querySnapshot.docs.map((doc) => doc.data().storyKey);

        setFavorites(favoriteStoryKeys); // Update the list of favorite stories
      }
    } catch (error) {
      console.error('Error fetching favorite stories:', error);
      Alert.alert('Error', 'An error occurred while fetching favorite stories.');
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Text Copied');
  };

  const deleteStory = async (key) => {
    try {
      await firestore().collection(category).doc(key).delete();
      Alert.alert('Story Deleted Successfully');
      displayStory(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting story:', error);
      Alert.alert('Error', 'An error occurred while deleting the story.');
    }
  };

  const addToFavorites = async (key) => {
    try {
      const favoritesRef = firestore().collection('favorites');
      const userId = user ? user.uid : null;

      if (userId) {
        if (favorites.includes(key)) {
          // If the story is already in favorites, remove it
          const querySnapshot = await favoritesRef.where('userId', '==', userId).where('storyKey', '==', key).get();
          if (!querySnapshot.empty) {
            const favoriteDoc = querySnapshot.docs[0];
            await favoritesRef.doc(favoriteDoc.id).delete();
            setFavorites(favorites.filter((favorite) => favorite !== key)); // Update the list of favorite stories
          }
        } else {
          // If the story is not in favorites, add it
          await favoritesRef.add({ userId, storyKey: key });
          setFavorites([...favorites, key]); // Update the list of favorite stories
        }
      }
    } catch (error) {
      console.error('Error adding story to favorites:', error);
      Alert.alert('Error', 'An error occurred while adding the story to favorites.');
    }
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <Text style={[styles.userEmail, textStyles]}>
          {user ? user.uid : 'guest@example.com'}
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.headerText, textStyles]}>{category}</Text>
        </View>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.flaty}>
              <Text style={textStyles}>{item.content}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(item.content)}
                style={[styles.copyBtn, containerStyles]}
              >
                <Ionicons name="copy" size={20} color={'black'}/> 
                <Text style={textStyles}>Copy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteStory(item.key)}
                style={[styles.copyBtn, containerStyles]}
              >
                <Ionicons name="trash" size={20} color={'black'}/>
                <Text style={textStyles}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addToFavorites(item.key)}
                style={[styles.copyBtn, containerStyles]}
              >
                <Ionicons
                  name={favorites.includes(item.key) ? 'heart' : 'heart-outline'}
                  color={favorites.includes(item.key) ? 'red' : 'white'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default StoryDisplay;

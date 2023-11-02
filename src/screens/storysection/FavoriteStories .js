import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DisplayStyle from '../../components/css/FavStyle';
import auth from '@react-native-firebase/auth';
import LoadingOverlay from '../../components/LoaderModal';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons

const categories = [
  { name: 'SadStory' },
  { name: 'HappyStory' },
  { name: 'HorrorStory' },
  { name: 'SuccessStory' },
  { name: 'FailureStory' },
  { name: 'RomanticStory' },
];

const FavoriteStories = () => {
  const styles = DisplayStyle;
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(true);

  const theme = useSelector((state) => state.theme);

  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const gradientColors = theme.mode === 'light' ? ['#6AC8E1', '#9D93E1', '#9D93E1', 'black'] : ['black', 'white'];

  useEffect(() => {
    fetchFavoriteStories();
  }, []);

  const fetchFavoriteStories = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const favoritesRef = firestore().collection('favorites');
        const querySnapshot = await favoritesRef.where('userId', '==', user.uid).get();

        const favoriteStoryKeys = querySnapshot.docs.map((doc) => doc.data().storyKey);

        const allFavoriteStories = [];

        for (const category of categories) {
          const storyRef = firestore().collection(category.name);
          const stories = await Promise.all(
            favoriteStoryKeys.map(async (key) => {
              const doc = await storyRef.doc(key).get();
              return doc.exists ? { key, content: doc.data().content, category: category.name } : null;
            })
          );

          const filteredStories = stories.filter((story) => story !== null);
          allFavoriteStories.push(...filteredStories);
        }

        setFavoriteStories(allFavoriteStories);
        setLoading(false);
        setLoadingOverlayVisible(false);
      }
    } catch (error) {
      console.error('Error fetching favorite stories:', error);
      Alert.alert('Error', 'An error occurred while fetching favorite stories.');
      setLoading(false);
      setLoadingOverlayVisible(false);
    }
  };

  const removeFavoriteStory = async (storyKey) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const favoritesRef = firestore().collection('favorites');
        const favoriteStoryRef = favoritesRef.where('userId', '==', user.uid).where('storyKey', '==', storyKey);
        const querySnapshot = await favoriteStoryRef.get();

        if (querySnapshot.docs.length > 0) {
          const favoriteDoc = querySnapshot.docs[0];
          await favoritesRef.doc(favoriteDoc.id).delete();
          fetchFavoriteStories();
        }
        Alert.alert('Stiry is removing from Fav section Please wait...')
      }
    } catch (error) {
      console.error('Error removing favorite story:', error);
      Alert.alert('Error', 'An error occurred while removing the favorite story.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[containerStyles, { margin: 10 }]}>
        <Text style={[styles.headerText, textStyles]}>Favorite Stories</Text>
      </View>
      {loading ? (
        <LoadingOverlay visible={loadingOverlayVisible} />
      ) : (
        <FlatList
          data={favoriteStories}
          renderItem={({ item }) => (
            <View style={[styles.flaty, containerStyles]}>
              <Text style={[{ fontWeight: 'bold', marginBottom: 15 }, textStyles]}>Category: {item.category}</Text>
              <Text style={textStyles}>{item.content}</Text>
              <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => removeFavoriteStory(item.key)}>
                <Ionicons name="heart" color="red" size={20} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      )}
    </View>
  );
};

export default FavoriteStories;

import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector,useDispatch } from 'react-redux';


const categories = [
  { name: 'SadStory', image: require('../assets/images/sad.jpeg'), instructions: 'Read heartwarming stories about overcoming sadness.' },
  { name: 'HappyStory', image: require('../assets/images/happy.jpeg'), instructions: 'Explore stories that will bring a smile to your face.' },
  { name: 'HorrorStory', image: require('../assets/images/pexels-photo-1270184.jpeg'), instructions: 'Get ready for a spine-chilling journey into the world of horror.' },
  { name: 'SuccessStory', image: require('../assets/images/success.jpeg'), instructions: 'Discover inspiring stories of triumph and success.' },
  { name: 'FailureStory', image: require('../assets/images/failure.jpeg'), instructions: 'Learn valuable lessons from stories of setbacks and failures.' },
  { name: 'RomanticStory', image: require('../assets/images/romantic.jpeg'), instructions: 'Experience love and romance through enchanting stories.' },
];

const HomeScreen = ({ navigation }) => {

  const theme = useSelector((state) => state.theme);
  

  const containerStyles = theme.mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const gradientColors = theme.mode === 'light' ? ['#6AC8E1', '#9D93E1', 'black'] : ['black', 'white'];
  const headerstyles = theme.mode === 'light' ? styles.lightheader : styles.darkheader;



  const storyDisplayHandler = (category) => {
    navigation.navigate('StorySection', { category });
  };

  return (

      <ScrollView style={[styles.main,containerStyles]}>
        <View style={[{width:'auto',margin:10},headerstyles]}><Text style={[styles.heading,textStyles]}>-------------HomeScreen-----------</Text></View>

        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => storyDisplayHandler(category.name)}>
            <LinearGradient
              colors={gradientColors} // Change these colors as per your preference
              style={styles.card}
            >
              <Image source={category.image} style={styles.storyImage} />
              <Text style={[styles.storyText,textStyles]}>{category.name}</Text>
              <Text style={[styles.instructions,textStyles]}>{category.instructions}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: 'white', // Change text color for contrast
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20, // Add some spacing between cards
  },
  storyImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  storyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Change text color for contrast
  },
  instructions: {
    fontSize: 16,
    color: 'white', // Change text color for contrast
  },
  lightContainer: {
    backgroundColor: 'black',
  },

  darkContainer: {
    backgroundColor: 'white',
  },

  lightText: {
    color: 'white',
  },

  darkText: {
    color: 'black',
  },
  lightheader:{
    backgroundColor:'#6AC8E1', 
  },
  darkheader:{
    backgroundColor:'gray', 
  }
});

export default HomeScreen;


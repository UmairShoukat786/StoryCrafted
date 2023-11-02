import { StyleSheet } from 'react-native';

const FavStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'gray'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft:90
  },
  flaty: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  lightText: {
    color: 'black', // Text color for light theme
  },
  darkText: {
    color: 'white', // Text color for dark theme
  },
  lightContainer: {
    backgroundColor: 'white', // Background color for light theme
  },
  darkContainer: {
    backgroundColor: 'black', // Background color for dark theme
  },

  
});

export default FavStyle;

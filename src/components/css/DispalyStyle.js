import { StyleSheet } from 'react-native';


const DisplayStyle = StyleSheet.create({
    container: {
      flex: 1,
      height: 550
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 10,
      color: 'black'
    },
    flaty: {
      borderColor: 'black',
      borderWidth: 2,
      padding: 10,
      margin: 10,
      width: 340,
      height: 'auto',
    },
    userEmail: {
      fontSize: 16,
      color: 'gray',
    },
    copyBtn: {
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: 'black',
      padding: 5,
      marginTop: 5,
      alignItems: 'center',
      width: 100,
      alignSelf: 'flex-end',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
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
  
  export default DisplayStyle;
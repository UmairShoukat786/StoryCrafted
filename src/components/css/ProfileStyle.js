import { StyleSheet } from 'react-native';

const ProfileStyle = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
    },
    header: {
      borderColor: 'black',
      borderWidth: 2,
      width: 300,
      marginTop: 20,
      alignt: 'center',
      height: 50,
    },
    profileContainer: {
      backgroundColor: '#EAFFDC',
      borderColor: 'black',
      borderWidth: 2,
      width: 300,
      alignItems: 'center',
      height: 'auto',
      marginTop: 10,
    },
    imageContainer: {
      height: 150,
      width: 150,
      borderRadius: 75,
      overflow: 'hidden',
      marginBottom: 20,
      marginLeft: 80
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    userInfoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: 'gray',
    },
    generalInfoContainer: {
      width: '100%',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    
    },
    fav:{
      marginHorizontal:70
    },
    gradientCard: {
      marginVertical: 10,
      overflow: 'hidden',
      width: 70,
      marginHorizontal: 40
    },
    gradientBackground: {
      width: 70,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientCardText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
    Text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    card: {
      width: '100%',
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
  });



  export default ProfileStyle;
import { StyleSheet } from 'react-native';



const LoginStyle = StyleSheet.create({
    gradientBackground: {
      width: '100%',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientCardText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    backgroundImage: {
      opacity: 0.7, // Adjust the opacity value as needed
    },
    gradientCard:{
      marginVertical:10,
      borderRadius: 10,
      overflow: 'hidden',
      width:180,
      marginHorizontal:58
    },
    animationContainer: {
  
      marginTop: 30,
      height: 130,
      width: 150,
      marginBottom: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 100,
      marginTop: 2,
      marginHorizontal:120
    },
    signupButton: {
      marginTop: 10,
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 10,
      width:150,
      alignSelf: 'center',
  
    },
    googleButton: {
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      alignSelf: 'center',
      marginTop: 10,
      backgroundColor:'black',
      borderRadius: 10,
  
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      width: 220,
      marginTop: 20,
      marginLeft: 45,
      height: 40,
      borderWidth: 2,
      borderRadius: 20,
      paddingLeft: 10,
    },
    main: {
      height: 'auto',
      width: 300,
      marginTop: 20,
      borderRadius: 20,
      opacity: 0.7, // Set your desired opacity
    },
    lightContainer: {
      backgroundColor: 'white',
    },
  
    darkContainer: {
      backgroundColor: 'black',
    },
  
    lightText: {
      color: 'white',
    },
  
    darkText: {
      color: 'black',
    },
  });

  export default LoginStyle;
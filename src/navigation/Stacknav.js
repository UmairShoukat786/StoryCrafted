/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StorySection from '../screens/storysection/StorySection';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Startup from '../screens/Startup';
import Bottomnav from './Bottomnav';
import auth from '@react-native-firebase/auth';
import About from '../screens/About';
import StoryInput from '../screens/storysection/StoryInput';
import StoryDisplay from '../screens/storysection/StoryDisplay';
import FavoriteStories from '../screens/storysection/FavoriteStories ';
const Stack = createStackNavigator();

const stacknav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = auth().onAuthStateChanged((userAuth) => {

      setUser(userAuth);
    });


    return () => unsubscribe();
  }, []);
  return (
    <Stack.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarStyle: {
        backgroundColor: '#2f2f2f', // Background color of the tab bar
      },
    }}>



      <Stack.Screen name="Startup" component={Startup} options={{ headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}  />
      <Stack.Screen name="HomeScreen" component={Bottomnav} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Bottomnav}  options={{ headerShown: false }}  />
      <Stack.Screen name="Bottomnav" component={Bottomnav} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="StorySection" component={StorySection} />
      <Stack.Screen name="StoryInput" component={StoryInput} />
      <Stack.Screen name="StoryDisplay" component={StoryDisplay} />
      <Stack.Screen name="FavoriteStories" component={FavoriteStories} />





    </Stack.Navigator>
  );
};

export default stacknav;

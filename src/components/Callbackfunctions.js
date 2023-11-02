/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';
import  useState  from 'react';
import firestore from '@react-native-firebase/firestore';

const Callbackfunctions = () => {
    const [data, setdata] = useState('');
    const [count, setCount] = useState(0); // Initialize count



const addsadstory = async () => {
        try {
          const storyData = {
            content: data, // Replace 'content' with the actual field name you want to use
            // timestamp: firestore.FieldValue.serverTimestamp(), // Add a timestamp
          };

          const storyRef = firestore().collection('Storytype').doc(`Sad/${count}`);

          await storyRef.set(storyData);

          setCount(count + 1); // Increment count for the next story
setdata('')
          Alert.alert('Story added successfully.');
        } catch (error) {
          console.error('Error adding story:', error);
        }
      };




return addsadstory;
};

export default Callbackfunctions;

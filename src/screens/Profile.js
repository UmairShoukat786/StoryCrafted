import React, { useEffect, useState } from 'react';
import { Alert, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import UpdateUserDataModal from '../components/UpdateUserDataModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStyle from '../components/css/ProfileStyle';

const Profile = ({ navigation, route }) => {
  const styles = ProfileStyle;
  const theme = useSelector(state => state.theme);
  const [user, setUser] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const containerStyles = theme.mode === 'light' ? styles.darkContainer : styles.lightContainer;
  const textStyles = theme.mode === 'light' ? styles.lightText : styles.darkText;
  const gradientColors = theme.mode === 'light' ? ['#6AC8E1', '#9D93E1', 'black'] : ['black', 'white'];
  const colors = theme.mode === 'light' ? 'white' : 'black';

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });

    return () => unsubscribe();
  }, []);

  const showDeleteConfirmation = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Account deletion canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: deleteAccount,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = async () => {
    try {
      await auth().currentUser.delete();
      console.log('User account deleted successfully');
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const logouthandler = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };

  const handleUpdate = async (name, newEmail, password) => {
    try {
      const user = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(user.email, password);

      await user.reauthenticateWithCredential(credential);

      await user.updateProfile({
        displayName: name,
      });

      await user.updateEmail(newEmail);

      console.log('User data updated successfully. Verification email sent.');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  const toggleModal = () => {
    setUpdateModalVisible(true);
  };

  const GradientCard = ({ title, onPress }) => {
    const titleToIcon = {
      'About us': 'information-circle',
      'Account': 'trash',
      'Edit data': 'create',
      'Logout': 'log-out',
      'Favorites': 'heart',
    };

    const iconName = titleToIcon[title] || 'help';

    return (
      <TouchableOpacity onPress={onPress} style={styles.gradientCard}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColors}
          style={styles.gradientBackground}
        >
          <Ionicons name={iconName} color={colors} size={30} />
          <Text style={[styles.gradientCardText, textStyles]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const profileContainerStyle = {
    backgroundColor: theme.mode === 'dark' ? 'black' : '#EAFFDC',
    borderColor: 'black',
    borderWidth: 2,
    width: 300,
    alignItems: 'center',
    height: 'auto',
    marginTop: 10,
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerStyles]}>
    <View style={styles.header}>
        <LinearGradient
          colors={gradientColors}
          style={{ height: 46 }}
        >
          <Text style={[styles.Text, textStyles]}>--------------------Profile-------------------</Text>
        </LinearGradient>
      </View>
      <View style={[profileContainerStyle, containerStyles]}>
        <LinearGradient
          colors={gradientColors}
          style={styles.card}
        >
          <View style={styles.imageContainer}>
            {user && user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.image} />
            ) : (
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2990603/pexels-photo-2990603.jpeg?auto=compress&cs=tinysrgb&w=800',
                }}
                style={styles.image}
              />
            )}
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={[styles.userName, textStyles]}>{user ? user.displayName : 'Guest'}</Text>
            <Text style={[styles.userEmail, textStyles]}>{user ? user.email : 'guest@example.com'}</Text>
            <Text style={[styles.userEmail, textStyles]}>{user ? user.uid : 'guest@example.com'}</Text>
          </View>

          <View style={styles.generalInfoContainer}>
            <Text style={[styles.sectionTitle, textStyles]}>General Information</Text>

            <View style={styles.fav}>
            <GradientCard
              title="About us"
              onPress={() => navigation.navigate('About')}
            />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <GradientCard
                title="Favorites"
                onPress={() => navigation.navigate('FavoriteStories')}
              />
              <GradientCard
                title="Account"
                onPress={showDeleteConfirmation}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <GradientCard
                title="Edit data"
                onPress={toggleModal}
              />
              <GradientCard
                title="Logout"
                onPress={logouthandler}
              />
            </View>
          </View>
        </LinearGradient>

        <UpdateUserDataModal
          visible={isUpdateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          onUpdate={handleUpdate}
          name={user ? user.displayName : ''}
          email={user ? user.email : ''}
          password={currentPassword}
          onPasswordChange={setCurrentPassword}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

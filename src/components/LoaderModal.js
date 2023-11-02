import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderModal = ({ visible }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default LoaderModal;

/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Textinput = ({placeholder,value,ontextchange}) => {
  return (
    <View>
      <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={ontextchange}
      style={styles.input}
      />
    </View>
  )
}

export default Textinput;

const styles = StyleSheet.create({
    input:{
        borderColor:'black',
        borderWidth:2,
        width:160,
          }
})
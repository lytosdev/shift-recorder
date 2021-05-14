import * as React from 'react'
import { StyleSheet } from 'react-native'

// styles
import { Surface, Text } from 'react-native-paper'
import { ColorPicker } from 'react-native-color-picker'

const MyComponent = () => (

  <ColorPicker
    onColorSelected={color => alert(`Color selected: ${color}`)}
    style={{ display: "none" }}
    defaultColor="#FB5018"
    oldColor="red"
  />

)

export default MyComponent;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
})


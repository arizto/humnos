import React from 'react'
import { View, StyleSheet } from 'react-native'

let styles = {}

const Divider = ({style}) => (
  <View style={[styles.container, style && style]} />
)

styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#e1e8ee'
  }
})

export default Divider

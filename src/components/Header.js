import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
// import { Appbar, Title } from 'react-native-paper'

function Header({ titleText }) {
  return (
    // <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{titleText}</Text>
      </View>
    // </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#60DBC5'
  },
  container: {
    // flex: 1,
    height:50,
    width:'100%',
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white'
  }
})

export default Header

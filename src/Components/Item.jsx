import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'

export const Item = ({ title, id, onPressFunction }) => {
  return (
    <Pressable onPress={() => onPressFunction(id)}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require('../../assets/micro.svg')}
          contentFit='contain'
        />
        <Text style={styles.title}>{id} {title} </Text>
        {/* {console.log('ewe')} */}
        {/* !TODO: Revisar por que al momento de escribir en el text area se renderiza nuevamente este componente */}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10

  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5

  },
  title: {
    fontSize: 16
  }
})

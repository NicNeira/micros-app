import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'

export const Item = ({ id, name, onPressFunction }) => {
  // console.log('id', id, 'name', name)
  return (
    <Pressable onPress={() => onPressFunction(id)}>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Image
            style={styles.image}
            source={require('../../assets/micro.svg')}
            contentFit='contain'
          />
          <Text style={styles.title}><Text style={styles.span}>{id}</Text> {name} </Text>
          {/* {console.log('ewe')} */}
          {/* !TODO: Revisar por que al momento de escribir en el text area se renderiza nuevamente este componente */}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
    height: 'auto'

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
  // span: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   backgroundColor: 'black',
  //   padding: 5,
  //   borderRadius: 5
  // }
})

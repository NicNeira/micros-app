import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Item } from './Item'

import { AntDesign } from '@expo/vector-icons'

export const FavoriteBusStops = ({ onPressFunction, favoritos }) => {
  return (
    <>
      <View style={styles.container}>

        <View style={styles.tittle}>
          <Text style={styles.text}>Favoritos</Text>
          {/* <AntDesign name='heart' size={24} color='red' style={styles.heart} /> */}
        </View>
        <FlatList
          data={favoritos}
          renderItem={({ item }) => <Item id={item.paradero} onPressFunction={onPressFunction} name={item.nomett} />}
          keyExtractor={item => item.paradero}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tittle: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#111827'
  },
  loaderStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

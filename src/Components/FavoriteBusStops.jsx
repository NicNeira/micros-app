import React from 'react'
import { FlatList, Text } from 'react-native'
import { Item } from './Item'

export const FavoriteBusStops = ({ onPressFunction, favoritos }) => {
  console.log('favoritos', favoritos)
  return (
    <>
      <Text>Favoritos</Text>
      <FlatList
        data={favoritos}
        renderItem={({ item }) => <Item id={item.paradero} onPressFunction={onPressFunction} name={item.nomett} />}
        keyExtractor={item => item.paradero}
      />
    </>
  )
}

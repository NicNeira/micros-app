import React from 'react'
import { FlatList, Text } from 'react-native'
import { Item } from './Item'

// Data enduro de momento, la idea es hacer una seccion de Favoritos
const DATA = [
  {
    id: 'PE863',
    title: 'Parada 6 / (M) Los Quillayes'
  },
  {
    id: 'PE633',
    title: 'General Arriagada / Esq. La Huasca'
  },
  {
    id: 'PE247',
    title: 'Parada 6 / (M) San José de la Estrella'
  },
  {
    id: 'PE524',
    title: 'Parada 3 / (M) Vicente Valdés'
  }
]

export const FavoriteBusStops = ({ onPressFunction }) => {
  return (
    <>
      <Text>Favoritos</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} id={item.id} onPressFunction={onPressFunction} />}
        keyExtractor={item => item.id}
      />
    </>
  )
}

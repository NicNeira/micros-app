import React, { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { AntDesign } from '@expo/vector-icons'

export const BusStop = ({ data, favoritos, setFavoritos }) => {
  if (!Array.isArray(favoritos)) {
    favoritos = [] // Esto asegura que favoritos sea siempre un array.
  }
  const [isFavorito, setIsFavorito] = useState(favoritos?.some(fav => fav.paradero === data?.paradero) ?? false)

  // console.log('isFavorito', isFavorito)
  // Console log para ver el contenido de data
  // console.log(JSON.stringify(data))

  const toggleFavorito = (data) => {
    const nuevoEstado = !isFavorito
    setIsFavorito(nuevoEstado)

    setFavoritos((currentFavoritos) => {
      // Asegurarse de que currentFavoritos es un array
      if (!Array.isArray(currentFavoritos)) {
        console.error('currentFavoritos no es un array', currentFavoritos)
        return [] // Retorna un array vacío o maneja el error de otra manera
      }

      if (nuevoEstado && data && data.paradero) {
        // Crear objeto con solo la información relevante
        const favorito = {
          nomett: data.nomett,
          paradero: data.paradero
        }
        // Agregar a favoritos
        return [...currentFavoritos, favorito]
      } else {
        // Remover de favoritos basado en el paradero
        return currentFavoritos.filter(fav => fav.paradero !== data?.paradero)
      }
    })
  }

  return (
    data && data.paradero
      ? (
        <View style={styles.backgroundColor}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.center}>

              <Text style={styles.title}>{data.nomett}</Text>
              <Pressable onPress={() => toggleFavorito(data)}>
                {isFavorito
                  ? (
                    <AntDesign name='heart' size={24} color='red' style={styles.heart} />)
                  : (
                    <AntDesign name='hearto' size={24} color='black' style={styles.heart} />)}
              </Pressable>
            </View>
            {data.servicios?.item?.map((item, index) => (
              <View key={index}>
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/micro.svg')}
                    contentFit='contain'
                  />
                  <Text style={[styles.text, { backgroundColor: item.color }]}>{item.servicio}</Text>
                  <Text style={styles.textDestino}>{item.destino}</Text>
                </View>
                {!item.distanciabus1
                  ? (
                    <Text style={{ color: 'red' }}>{item.respuestaServicio}</Text>
                    )
                  : (
                    <>
                      <Text>Distancia: {item.distanciabus1} metros</Text>
                      <Text>Tiempo: {item.horaprediccionbus1}</Text>
                      {item.distanciabus2 && <Text>Distancia: {item.distanciabus2} metros</Text>}
                      {item.horaprediccionbus2 && <Text>Tiempo: {item.horaprediccionbus2}</Text>}
                    </>
                    )}

              </View>
            ))}
          </ScrollView>
          <StatusBar style='auto' />

        </View>
        )

      : <ActivityIndicator size='large' />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10
  },
  image: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5

  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    borderRadius: 10
  },
  textDestino: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  heart: {
    marginLeft: 10
  },
  scrollView: {
    margin: 0

  }
})

import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'

export const BusStop = ({ data }) => {
  // Console log para ver el contenido de data
  console.log(JSON.stringify(data))

  return (
    data && (
      <>
        <View style={styles.center}>
          <Text style={styles.title}>{data.nomett}</Text>
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
        <StatusBar style='auto' />
      </>
    )
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
    justifyContent: 'center',
    alignItems: 'center'
  }
})

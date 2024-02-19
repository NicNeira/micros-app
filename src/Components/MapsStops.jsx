import React, { useEffect, useState } from 'react'
// Paraderos Info
import StopData from '../utils/AllStopData.json'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MapsStops = ({ setModalVisible, onPressFunction }) => {
  // funciones para guardar y cargar favoritos
  const guardarCordenadas = async (favoritos) => {
    try {
      const jsonValue = JSON.stringify(favoritos)
      await AsyncStorage.setItem('@favoritos', jsonValue)
    } catch (e) {
      // guardar error
    }
  }

  const cargarCordenadas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favoritos')
      return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
      // cargar error
      return []
    }
  }

  // Uso de Favoritos
  useEffect(() => {
    cargarCordenadas().then(setRegion)
  }, [])

  // Estado inicial para la región del mapa centrado en un punto específico con un nivel de zoom definido.
  const [region, setRegion] = useState({
    latitude: -33.436969948301545, // Latitud central de la región inicial, ejemplo: Plaza de Armas, Santiago.
    longitude: -70.63449837801244, // Longitud central de la región inicial.
    latitudeDelta: 0.005, // La altura vertical (en grados) que se muestra en el mapa. Afecta el nivel de zoom.
    longitudeDelta: 0.005 // La anchura horizontal (en grados) que se muestra en el mapa. Afecta el nivel de zoom.
  })

  // Función que se ejecuta cuando la región visible del mapa cambia, por ejemplo, cuando el usuario hace zoom o se desplaza.
  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion) // Actualiza el estado de la región con la nueva región.
  }

  // Función que filtra los paraderos para incluir solo aquellos que están dentro de la región visible actual del mapa.
  const getParaderosInRegion = (paraderos, region) => {
    return paraderos.filter(paradero => {
      const { stop_lat: stopLat, stop_lon: stopLon } = paradero // Destructuración para obtener latitud y longitud del paradero.
      return (
        stopLat >= region.latitude - region.latitudeDelta / 2 && // Verifica si la latitud del paradero está dentro de los límites norte y sur de la región visible.
        stopLat <= region.latitude + region.latitudeDelta / 2 &&
        stopLon >= region.longitude - region.longitudeDelta / 2 && // Verifica si la longitud del paradero está dentro de los límites este y oeste de la región visible.
        stopLon <= region.longitude + region.longitudeDelta / 2
      )
    })
  }

  // Almacenar en una variable los paraderos que están actualmente dentro de la región visible del mapa.
  const paraderosVisibleRegion = getParaderosInRegion(StopData, region)

  const handleSelectParadero = (paradero) => {
    onPressFunction(paradero.stop_id)
    setModalVisible(true)
  }

  useEffect(() => {
    guardarCordenadas(region)
  }, [region])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region} // Establece la región inicial del mapa usando el estado de la región.
        onRegionChangeComplete={onRegionChangeComplete} // Asigna la función a ejecutar cuando cambia la región visible
      >
        {paraderosVisibleRegion.map(paradero => (
          <Marker
            key={paradero.stop_id} // Utiliza el ID del paradero como clave única para cada marcador.
            coordinate={{ latitude: paradero.stop_lat, longitude: paradero.stop_lon }} // Establece las coordenadas del marcador.
            title={paradero.stop_name} // Establece el título del marcador con el nombre del paradero
            onPress={() => handleSelectParadero(paradero)} // Llama al manejador cuando el marcador es presionado
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
})

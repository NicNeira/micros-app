import React, { useEffect, useState } from 'react'
import { Modal, StatusBar, StyleSheet, View } from 'react-native'
import { BusStop } from './BusStop'
import { useBusStopData } from '../hooks/useBusStopData'
import { FavoriteBusStops } from './FavoriteBusStops'
import { SearchBusStop } from './SearchBusStop'
import { MapsStops } from './MapsStops'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Main = () => {
  const [modalVisible, setModalVisible] = useState(false)
  // Estado para Paraderos Favoritos
  const [favoritos, setFavoritos] = useState([])

  // console.log('favoritos', favoritos)

  // Custom hook que obtiene los datos de la API
  const { data, obtenerDatos, dataReset } = useBusStopData()

  // Funcion que se ejecuta al presionar un item de la lista o al presionar el boton de consultar
  const onPressFunction = (id) => {
    // console.log('Presionado', id)
    obtenerDatos(id)
    data && setModalVisible(true)
  }

  // funciones para guardar y cargar favoritos
  const guardarFavoritos = async (favoritos) => {
    try {
      const jsonValue = JSON.stringify(favoritos)
      await AsyncStorage.setItem('@favoritos', jsonValue)
    } catch (e) {
      // guardar error
    }
  }

  const cargarFavoritos = async () => {
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
    cargarFavoritos().then(setFavoritos)
  }, [])

  useEffect(() => {
    guardarFavoritos(favoritos)
  }, [favoritos])

  // const borrarDatoPorClave = async () => {
  //   try {
  //     await AsyncStorage.clear()
  //     console.log('Todo el almacenamiento local ha sido limpiado.')
  //   } catch (e) {
  //     console.error('Error al limpiar el AsyncStorage:', e)
  //   }
  // }

  // // Uso de Favoritos
  // useEffect(() => {
  //   borrarDatoPorClave()
  // }, [])

  return (
    <>
      <MapsStops setModalVisible={setModalVisible} onPressFunction={onPressFunction} />
      <FavoriteBusStops onPressFunction={onPressFunction} setFavoritos={setFavoritos} favoritos={favoritos} />
      <SearchBusStop onPressFunction={onPressFunction} />
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
          dataReset()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <BusStop data={data} favoritos={favoritos} setFavoritos={setFavoritos} />
          </View>
        </View>
      </Modal>
      <StatusBar style='auto' />
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    margin: 22
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  map: {
    width: '100%',
    height: '100%'
  }
})

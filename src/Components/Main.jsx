import React, { useState } from 'react'
import { Modal, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { BusStop } from './BusStop'
import { useBusStopData } from '../hooks/useBusStopData'
import { FavoriteBusStops } from './FavoriteBusStops'
import { SearchBusStop } from './SearchBusStop'

export const Main = () => {
  const [modalVisible, setModalVisible] = useState(false)

  // Custom hook que obtiene los datos de la API
  const { data, obtenerDatos } = useBusStopData()

  // Funcion que se ejecuta al presionar un item de la lista o al presionar el boton de consultar
  const onPressFunction = (id) => {
    console.log('Presionado', id)
    obtenerDatos(id)
    data && setModalVisible(true)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FavoriteBusStops onPressFunction={onPressFunction} />
        <SearchBusStop onPressFunction={onPressFunction} />
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <BusStop data={data} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <StatusBar style='auto' />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
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
  }
})

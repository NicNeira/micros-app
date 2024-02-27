import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export const SearchBusStop = ({ onPressFunction }) => {
  const [text, onChangeText] = React.useState('')

  return (
    <>
      <View style={styles.contenedorPadre}>
        <View style={styles.contenedorHijo}>
          <Text style={styles.title}>
            Consulta otro paradero
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder='Ingrese el código de paradero'
          />
          <Button title='Consultar' onPress={() => onPressFunction(text)} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  contenedorPadre: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contenedorHijo: {
    backgroundColor: 'white',
    padding: 10,
    width: '90%',
    borderRadius: 5,
    margin: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10
  }
})

import React from 'react'
import { Button, StyleSheet, Text, TextInput } from 'react-native'

export const SearchBusStop = ({ onPressFunction }) => {
  const [text, onChangeText] = React.useState('')

  return (
    <>
      <Text>
        Consulta otro paradero
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='Ingrese el código de paradero'
      />
      <Button title='Consultar' onPress={() => onPressFunction(text)} />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

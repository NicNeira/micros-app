import { useState } from 'react'

export const useBusStopData = () => {
  const [data, setData] = useState([])

  const obtenerDatos = async (busStop) => {
    try {
      // Define la URL y las opciones de la petición fetch
      const url = `https://www.red.cl/predictor/prediccion?t=${process.env.EXPO_PUBLIC_RED_API_TOKEN}&codsimt=${busStop}&codser=`
      const opciones = {
        headers: {
          accept: '*/*',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7',
          'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin'
        },
        referrer: 'https://www.red.cl/planifica-tu-viaje/cuando-llega/?codsimt=PA100',
        referrerPolicy: 'no-referrer-when-downgrade',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include' // Ten en cuenta que este parámetro podría no funcionar en todos los contextos debido a políticas CORS.
      }

      // Realiza la petición fetch con la URL y las opciones
      const respuesta = await fetch(url, opciones)
      const json = await respuesta.json()

      // setDatos para actualizar el estado con los datos obtenidos
      setData(json)
    } catch (error) {
      console.error(error)
    }
  }

  return { data, obtenerDatos }
}

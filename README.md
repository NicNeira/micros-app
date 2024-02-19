***
# Micros-APP

Este proyecto consiste en una aplicación móvil desarrollada con React Native y Expo, diseñada para evitar la publicidad y no darme tantas vueltas con las aplicaciones actuales que ofrecen este servicio de transporte público a los usuarios. La aplicación permite consultar en tiempo real la información de los paraderos y las micros que se aproximan, utilizando la API de RED. Al ingresar el código de un paradero específico, los usuarios pueden ver los tiempos estimados de llegada y las distancias de los buses cercanos, ayudándoles a planificar sus viajes con mayor eficiencia y precisión. 

***
## Instrucciones para levantar en desarrollo

Es importante obtener el token para la API desde la pagina de RED, segun pruebas que se realizaron, esta no cambia ni varia dentro del tiempo ( Actualmente 1 semana de pruebas )


- **Start whit**

`npm install`

- **Add**

`package.json`

```jsx
"eslintConfig": {
  "parser": "@babel/eslint-parser",
  "extends": [
    "standard",
    "standard-jsx",
    "standard-react"
  ]
}
```

- **Add on `settings.json` if auto format not work**

```jsx
"editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.validate": [
        "javascript",
        "javascriptreact",
        // otros lenguajes que quieras validar (por ejemplo, "typescript", "typescriptreact")
      ]
```

- **Run Proyect**

`npx expo start`

***

- Si deseas generar el APK de la aplicacion te recomiendo seguir este video

- **Generate APK**

[Creando un APK de Android con React Native Expo | Tutorial 2023](https://www.youtube.com/watch?v=FBv4PrW5wqY&ab_channel=CodewithBetoenEspañol)

- **install eas-cli**

`npm install -g eas-cli`

- **logearse con cuenta expo**

`eas login`

- **configuracion del eas**

`eas build:configure` —> `all`

`eas.json`

```jsx
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development"
    },
    "preview": {
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

- **ejecutar el build del apk**

`eas build -p android --profile preview`

***

## Funcionamiento del mapa
La propiedad `onRegionChangeComplete` del componente `MapView` de `react-native-maps` es un manejador de eventos que se invoca automáticamente por el componente `MapView` cuando la región visible del mapa cambia. Esto puede suceder por varias acciones del usuario, como hacer zoom, arrastrar el mapa a una nueva ubicación, o cambiar programáticamente la región del mapa mediante código.

Cuando el usuario termina de cambiar la región del mapa (después de hacer zoom, por ejemplo), `MapView` llama a la función proporcionada a `onRegionChangeComplete` y le pasa como argumento un objeto que contiene la nueva región del mapa. Esta nueva región incluye las nuevas coordenadas centrales (`latitude` y `longitude`) y los valores de `latitudeDelta` y `longitudeDelta`, que indican el rango de latitudes y longitudes visibles desde el centro del mapa.

La función `onRegionChangeComplete` que defines y asignas a esta propiedad recibe automáticamente este objeto de región como su parámetro. Aquí es cómo funciona:

```javascript
const onRegionChangeComplete = (newRegion) => {
  setRegion(newRegion);
  // Aquí podrías filtrar los paraderos basados en la nueva región
};
```

En este fragmento de código:

- `newRegion` es el objeto que `MapView` pasa a tu función `onRegionChangeComplete` cuando se invoca. Este objeto contiene la nueva región visible del mapa después de que el usuario haya hecho cambios.
- `setRegion(newRegion)` es donde actualizas el estado de tu componente con esta nueva región. Al hacer esto, estás "guardando" la nueva región visible del mapa en el estado de tu componente para cualquier propósito futuro, como filtrar los paraderos que caen dentro de esta nueva región.

Es importante notar que este proceso es manejado internamente por `react-native-maps`. No necesitas hacer nada especial para "leer" las nuevas coordenadas; simplemente proporcionas la función que quieres que se ejecute cuando la región cambie, y `react-native-maps` se encarga del resto, pasando la nueva región como argumento a tu función automáticamente.

La función `getParaderosInRegion` es un ejemplo de cómo podrías filtrar un conjunto de datos para incluir solo aquellos elementos que se encuentran dentro de una región geográfica específica, en este caso, la región visible en un mapa. Aquí te explico cada parte de la función con detalle:

### Propósito de la Función

Esta función toma dos argumentos:
- `paraderos`: Un arreglo de objetos donde cada objeto representa un paradero. Cada paradero tiene, al menos, dos propiedades: `stop_lat` (latitud) y `stop_lon` (longitud).
- `region`: Un objeto que representa la región visible actual en el mapa. Este objeto contiene las propiedades `latitude`, `longitude`, `latitudeDelta`, y `longitudeDelta`.

### Proceso de Filtrado

La función devuelve un nuevo arreglo que contiene solo aquellos paraderos que están dentro de la región visible en el mapa. Esto se logra mediante el método `.filter()` de JavaScript, que crea un nuevo arreglo con todos los elementos que pasan la prueba implementada por la función proporcionada.

### Destructuración y Comparación

Dentro de la función `.filter()`, se usa la destructuración para extraer `stop_lat` y `stop_lon` de cada `paradero`, renombrándolos a `stopLat` y `stopLon` para seguir las convenciones de camelCase en JavaScript.

Luego, se realiza una serie de comparaciones para determinar si el paradero actual está dentro de la región visible:
- `stopLat >= region.latitude - region.latitudeDelta / 2` verifica si la latitud del paradero está por encima del límite sur de la región visible.
- `stopLat <= region.latitude + region.latitudeDelta / 2` verifica si la latitud del paradero está por debajo del límite norte de la región visible.
- `stopLon >= region.longitude - region.longitudeDelta / 2` verifica si la longitud del paradero está a la derecha del límite oeste de la región visible.
- `stopLon <= region.longitude + region.longitudeDelta / 2` verifica si la longitud del paradero está a la izquierda del límite este de la región visible.

Si todas estas condiciones son verdaderas, significa que el paradero se encuentra dentro de la región visible del mapa y, por lo tanto, se incluye en el arreglo resultante.

### Ejemplo de Uso

Esta función es útil para optimizar el rendimiento de las aplicaciones de mapas que manejan grandes conjuntos de datos. Al filtrar y mostrar solo los paraderos visibles en la región actual, se puede evitar el sobrecargo de renderizar elementos innecesarios que el usuario no puede ver, mejorando así la eficiencia y la experiencia del usuario.


***

## Todo DO 📌
- **Ajustar el modal, eliminar datos de el al volver a la pantalla principal y agregar elementos de carga mientras se realiza la consulta** - ❌
- **Guardar cordenadas del mapa en el AsyncStorage para luego consumir de estos al momento de ingresar a la app** - ❌
- **Ajustar Diseño, colores y estructura** - ❌

`Cuando se tenga un app en completo funcionamiento y testeada se liberara la version 1.0`
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